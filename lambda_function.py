import os
import shutil
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


def download_bucket(bucket_name, target_dir):
    bucket = s3.Bucket(bucket_name)
    print(f"Bucket {bucket_name} connected.")
    for obj in bucket.objects.all():
        print(f"Downloading {obj.key}")
        target = os.path.join(target_dir, obj.key)
        if not os.path.exists(os.path.dirname(target)):
            os.makedirs(os.path.dirname(target))
        bucket.download_file(obj.key, target)


def upload_bucket(bucket_name, source_dir):
    bucket = s3.Bucket(bucket_name)

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
                Key=full_path[len(source_dir) :],
                ExtraArgs={"ContentType": mimetype},
            )


def clear_bucket(bucket):
    bucket = s3.Bucket(bucket)
    bucket.objects.all().delete()


def clear_directory(directory):
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        try:
            if os.path.isfile(filepath) or os.path.islink(filepath):
                os.unlink(filepath)
            elif os.path.isdir(filepath):
                shutil.rmtree(filepath)
        except Exception as e:
            print("Failed to delete %s. Reason: %s" % (filepath, e))


def create_symlink(source_dir, target_dir):
    for filename in os.listdir(source_dir):
        filepath = os.path.join(source_dir, filename)
        print(f"Symlinking {filepath} to {target_dir}")

        if (
            NOTEBOOK_DIR.replace(target_dir, source_dir).startswith(filepath)
            or STATIC_DIR.replace(target_dir, source_dir).startswith(filepath)
            or PUBLIC_DIR.replace(target_dir, source_dir).startswith(filepath)
        ):
            print("passing")
            continue

        os.symlink(
            filepath,
            os.path.join(target_dir, filename),
            os.path.isdir(filepath),
        )


def build_and_publish():
    print("Clear mounted directory.")
    clear_directory(mount_dir)

    print("Copy notebook files from S3.")
    download_bucket(os.environ.get("S3_CACHE_BUCKET"), NOTEBOOK_DIR)

    print("Copy static files from S3.")
    download_bucket(os.environ.get("S3_THUMBNAIL_BUCKET"), STATIC_DIR)

    print("Symlinking the source codes.")
    cwd = os.getcwd()
    create_symlink(cwd, mount_dir)

    src = os.path.join(cwd, "src")
    src_mount = os.path.join(mount_dir, "src")
    create_symlink(src, src_mount)

    print("Build gatsby.")
    subprocess.check_output(("npm", "--prefix", mount_dir, "run", "build"))

    print("Clear the blog bucket.")
    clear_bucket(os.environ.get("S3_BLOG_BUCKET"))

    print("Copy output files to S3.")
    upload_bucket(os.environ.get("S3_BLOG_BUCKET"), PUBLIC_DIR)

    return os.listdir(PUBLIC_DIR)


def handler(event, context):
    try:
        published = build_and_publish()
        return {
            "status_code": 200,
            "message": str(published),
        }
    except Exception as e:
        print(e)
        return {"status_code": 500, "message": str(e)}
