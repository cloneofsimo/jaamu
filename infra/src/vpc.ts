import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const vpc = new awsx.ec2.Vpc("vpc", {
  cidrBlock: "10.0.0.0/16",
  numberOfAvailabilityZones: 1,
  numberOfNatGateways: 0,
  tags: {
    Name: "jaamuVpc",
  },
});

const { publicSubnet, privateSubnet, internetGateway } = pulumi
  .all([vpc.publicSubnets, vpc.privateSubnets, vpc.internetGateway])
  .apply(([publicSubnets, privateSubnets, internetGateway]) => {
    if (!internetGateway) {
      throw new Error("internetGateway is undefined");
    }
    return {
      publicSubnet: publicSubnets[0],
      privateSubnet: privateSubnets[0],
      internetGateway: internetGateway,
    };
  });

const eip = new aws.ec2.Eip("eip", {
  vpc: true,
  tags: {
    Name: "jaamuEip",
  },
});

const natGateway = new aws.ec2.NatGateway(
  "natGateway",
  {
    subnetId: publicSubnet.id,
    allocationId: eip.id,
    tags: {
      Name: "jaamuNatGateway",
    },
  },
  {
    dependsOn: [internetGateway],
  }
);

const publicRouter = new aws.ec2.RouteTable(
  "publicRouter",
  {
    vpcId: vpc.id,
    routes: [
      {
        cidrBlock: "0.0.0.0/0",
        gatewayId: internetGateway.internetGateway.id,
      },
    ],
    tags: {
      Name: "jaamuPublicRouter",
    },
  },
  {
    dependsOn: [internetGateway],
  }
);

const publicRouteAssociation = new aws.ec2.RouteTableAssociation(
  "publicRouteAssociation",
  {
    subnetId: publicSubnet.id,
    routeTableId: publicRouter.id,
  }
);

const privateRouter = new aws.ec2.RouteTable(
  "privateRouter",
  {
    vpcId: vpc.id,
    routes: [
      {
        cidrBlock: "0.0.0.0/0",
        gatewayId: natGateway.id,
      },
    ],
    tags: {
      Name: "jaamuPrivateRouter",
    },
  },
  {
    dependsOn: [natGateway],
  }
);

const privateRouteAssociation = new aws.ec2.RouteTableAssociation(
  "privateRouteAssociation",
  {
    subnetId: privateSubnet.id,
    routeTableId: privateRouter.id,
  }
);

export {
  vpc,
  publicSubnet,
  privateSubnet,
  internetGateway,
  eip,
  natGateway,
  publicRouter,
  publicRouteAssociation,
  privateRouter,
  privateRouteAssociation,
};
