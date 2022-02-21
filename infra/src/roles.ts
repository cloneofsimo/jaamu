import * as aws from "@pulumi/aws";

const taskRole = new aws.iam.Role("corca-jaamu-task-role", {
  assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Action: "sts:AssumeRole",
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
      },
    ],
  }),
  inlinePolicies: [
    {
      name: "invoke",
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: "lambda:InvokeFunction",
            Resource:
              "arn:aws:lambda:ap-northeast-2:854407906105:function:jaamuBuild*",
          },
        ],
      }),
    },
    {
      name: "remediation_permission",
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: ["s3:GetObject"],
            Resource: "arn:aws:s3:::*",
          },
        ],
      }),
    },
    {
      name: "s3",
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: ["s3:PutObject", "s3:GetObject", "s3:ListBucket"],
            Resource: "arn:aws:s3:::corca-blog*",
          },
        ],
      }),
    },
    {
      name: "logs",
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: "logs:CreateLogGroup",
            Resource: "arn:aws:logs:ap-northeast-2:854407906105:*",
          },
          {
            Effect: "Allow",
            Action: ["logs:CreateLogStream", "logs:PutLogEvents"],
            Resource: [
              "arn:aws:logs:ap-northeast-2:854407906105:log-group:/aws/lambda/jaamu*",
            ],
          },
        ],
      }),
    },
  ],
  managedPolicyArns: [
    "arn:aws:iam::aws:policy/AmazonVPCCrossAccountNetworkInterfaceOperations",
    "arn:aws:iam::aws:policy/AmazonElasticFileSystemFullAccess",
  ],
});

export { taskRole };
