import os
import subprocess
import boto3
import mimetypes
from dotenv import load_dotenv

load_dotenv()

mount_dir = os.getenv("MOUNT_DIR")

NOTEBOOK_DIR = f"{mount_dir}/src/notebooks/"
STATIC_DIR = f"{mount_dir}/static/"
PUBLIC_DIR = f"{mount_dir}/public/"

s3 = boto3.resource("s3", region_name="ap-northeast-2")


def download_bucket(bucket, target_dir):
    bucket = s3.Bucket(bucket)
    for obj in bucket.objects.all():
        target = os.path.join(target_dir, obj.key)
        if not os.path.exists(os.path.dirname(target)):
            os.makedirs(os.path.dirname(target))
        bucket.download_file(obj.key, target)


def upload_bucket(bucket, source_dir):
    bucket = s3.Bucket(bucket)

    for subdir, dirs, files in os.walk(source_dir):
        for file in files:
            full_path = os.path.join(subdir, file)
            mimetype, _ = mimetypes.guess_type(full_path)
            if mimetype is None:
                if file.endswith(".js.map"):
                    mimetype = "text/javascript"
                if file.endswith(".css.map"):
                    mimetype = "application/json"

            bucket.upload_file(
                Filename=full_path,
                Key=full_path[len(source_dir) + 1 :],
                ExtraArgs={"ContentType": mimetype},
            )


def handler(event, context):
    try:
        print("Copy notebook files from S3.")
        download_bucket(os.environ.get("S3_CACHE_BUCKET"), NOTEBOOK_DIR)

        print("Copy static files from S3.")
        download_bucket(os.environ.get("S3_THUMBNAIL_BUCKET"), STATIC_DIR)

        print("Build gatsby.")
        args = ("npm", "--prefix", mount_dir, "run", "build")
        subprocess.check_output(args)

        print("Copy output files to S3.")
        upload_bucket(os.environ.get("S3_BLOG_BUCKET"), PUBLIC_DIR)

        return {"status_code": 200, "message": "Success"}

    except Exception as e:
        return {"status_code": 500, "message": str(e)}
