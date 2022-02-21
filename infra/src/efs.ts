import * as aws from "@pulumi/aws";
import { allowLambda } from "./security-groups";
import { privateSubnet } from "./vpc";

const efs = new aws.efs.FileSystem("efs", {
  availabilityZoneName: "ap-northeast-2a",
  tags: {
    Name: "jaamuEfs",
  },
});

const accessPoint = new aws.efs.AccessPoint("accessPoint", {
  fileSystemId: efs.id,
  rootDirectory: {
    path: "/jaamu",
    creationInfo: { ownerGid: 1000, ownerUid: 1000, permissions: "0755" },
  },
  posixUser: { uid: 1000, gid: 1000 },
  tags: {
    Name: "jaamuAccessPoint",
  },
});

const mountTarget = new aws.efs.MountTarget("mountTarget", {
  fileSystemId: efs.id,
  securityGroups: [allowLambda.id],
  subnetId: privateSubnet.id,
});

export { efs, accessPoint, mountTarget };
