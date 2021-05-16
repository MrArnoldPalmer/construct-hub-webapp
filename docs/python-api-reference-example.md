# Python API Reference Example

This document shows how we'd like to present package API reference in python.

# API Reference

## Constructs

### Cluster

```python
from aws_cdk import aws_eks as eks

eks.Cluster(scope, id, **kwargs)
```

#### Keyword Arguments

##### default_capacity <sup>[jsii.Number](adsa)</sup>

Number of instances to allocate as an initial capacity for this cluster.

> Optional <> Default: 2

> Instance type can be configured through `defaultCapacityInstanceType`, which defaults to `m5.large`.
> Use `cluster.addAutoScalingGroupCapacity` to add additional customized capacity. Set this to `0` is you wish to avoid the initial capacity allocation.

----

##### default_capacity_instance <sup>[aws_cdk.aws_ec2.InstanceType](link)</sup>

The instance type to use for the default capacity.

> Optional <> Default: m5.large

> This will only be taken into account if `defaultCapacity` is > 0.

----

##### default_capacity_type <sup>[DefaultCapacityType](link)</sup>

The default capacity type for the cluster.

> Optional <> Default: NODEGROUP

---

##### secrets_encryption_key <sup>[aws_cdk.aws_kms.IKey](link)</sup>

KMS secret for envelope encryption for Kubernetes secrets.

> Optional. Default: - By default, Kubernetes stores all secret object data within etcd and all etcd volumes used by Amazon EKS are encrypted at the disk-level using AWS-Managed encryption keys.

---

##### cluster_handler_environment <sup>typing.Mapping[builtins.str, builtins.str]</sup>

Custom environment variables when interacting with the EKS endpoint to manage the cluster lifecycle.

> Optional <> Default: - No environment variables.

---

##### core_dns_compute_type <sup>[CoreDnsComputeType](link)</sup>

Controls the "eks.amazonaws.com/compute-type" annotation in the CoreDNS configuration on your cluster to determine which compute type to use for CoreDNS.

> Optional <> Default: CoreDnsComputeType.EC2 (for `FargateCluster` the default is FARGATE)

---

##### endpoint_access <sup>[EndpointAccess](link)</sup>

Configure access to the Kubernetes API server endpoint.. 

> Optional <> Default: EndpointAccess.PUBLIC_AND_PRIVATE

> See https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html

---

#### Methods

##### add_auto_scaling_group_capacity

```python
cluster.add_auto_scaling_group_capacity(id, **kwargs)
```

**Keyword Arguments**

###### instance_type
###### bootstrap_enabled

**Returns**: [aws_cdk.aws_autoscaling.AutoScalingGroup](link)

##### add_manifest

##### connect_auto_scaling_group_capacity

#### Attributes

#### Static Functions

