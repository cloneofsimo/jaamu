import * as aws from "@pulumi/aws";
import { allowLambda } from "./security-groups";
import { taskRole } from "./roles";
import { privateSubnet } from "./vpc";
import { accessPoint, mountTarget } from "./efs";
import { config } from "dotenv";

config();

if (
  !process.env.ECR_IMAGE_URI ||
  !process.env.DEBUG ||
  !process.env.JAAMU_HOME ||
  !process.env.MOUNT_DIR ||
  !process.env.S3_BLOG_BUCKET ||
  !process.env.S3_CACHE_BUCKET ||
  !process.env.S3_THUMBNAIL_BUCKET
) {
  throw new Error("Please set the environment variables properly.");
}

const bucket = aws.s3.Bucket.get("corca-blog-cache", "corca-blog-cache");

const lambda = new aws.lambda.Function(
  "jaamuBuild",
  {
    role: taskRole.arn,
    timeout: 600,
    memorySize: 2500,
    packageType: "Image",
    imageUri: process.env.ECR_IMAGE_URI,
    environment: {
      variables: {
        DEBUG: process.env.DEBUG,
        HOME: process.env.JAAMU_HOME,
        MOUNT_DIR: process.env.MOUNT_DIR,
        S3_BLOG_BUCKET: process.env.S3_BLOG_BUCKET,
        S3_CACHE_BUCKET: process.env.S3_CACHE_BUCKET,
        S3_THUMBNAIL_BUCKET: process.env.S3_THUMBNAIL_BUCKET,
      },
    },
    fileSystemConfig: {
      arn: accessPoint.arn,
      localMountPath: "/mnt/efs",
    },
    vpcConfig: {
      securityGroupIds: [allowLambda.id],
      subnetIds: [privateSubnet.id],
    },
  },
  {
    dependsOn: [mountTarget],
  }
);

export { lambda };

bucket.onObjectCreated("cacheHandler", lambda);
