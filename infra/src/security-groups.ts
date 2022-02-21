import * as aws from "@pulumi/aws";
import { vpc } from "./vpc";

const allowLambda = new aws.ec2.SecurityGroup("allowLambda", {
  vpcId: vpc.id,
  description: "Allow Lambda connection inbound traffic",
  ingress: [
    {
      description: "Lambda connection",
      fromPort: 1,
      toPort: 65535,
      protocol: "tcp",
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
    },
  ],
  egress: [
    {
      fromPort: 0,
      toPort: 0,
      protocol: "-1",
      cidrBlocks: ["0.0.0.0/0"],
      ipv6CidrBlocks: ["::/0"],
    },
  ],
});

export { allowLambda };
