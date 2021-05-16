# Python API Reference Example

This document shows how we'd like to present package API reference in python.

# API Reference

## Constructs

### Cluster

```python
from aws_cdk import aws_eks as eks

eks.Cluster(scope: constructs.Construct, id: builtins.str, **kwargs)
```

#### Properties

---

##### `version`

The Kubernetes version to run in the cluster

- *Type: [KubernetesVersion](link)* | ***Required***

---

##### `default_capacity`

- *Type: jsii.Number* | ***Optional*** | *Default: 2*

Number of instances to allocate as an initial capacity for this cluster.

> Instance type can be configured through `defaultCapacityInstanceType`, which defaults to `m5.large`.
> Use `cluster.addAutoScalingGroupCapacity` to add additional customized capacity. Set this to `0` is you wish to avoid the initial capacity allocation.

----

##### `default_capacity_instance`

- *Type: [aws_cdk.aws_ec2.InstanceType](link)* | ***Optional*** | *Default: m5.large*

The instance type to use for the default capacity.

> This will only be taken into account if `defaultCapacity` is > 0.

----

##### `default_capacity_type`

- *Type: [DefaultCapacityType](link)* | ***Optional*** | *Default: NODEGROUP*

The default capacity type for the cluster.

---

##### `secrets_encryption_key`

- *Type: [aws_cdk.aws_kms.IKey](link)* | ***Optional*** | *Default: - By default, Kubernetes stores all secret object data within etcd and all etcd volumes used by Amazon EKS are encrypted at the disk-level using AWS-Managed encryption keys.*

KMS secret for envelope encryption for Kubernetes secrets.

---

##### `cluster_handler_environment`

- *Type: typing.Mapping[builtins.str, builtins.str]* | ***Optional*** | *Default: - No environment variables.*

Custom environment variables when interacting with the EKS endpoint to manage the cluster lifecycle.

---

##### `core_dns_compute_type`

*Type: [CoreDnsComputeType](link)* | ***Optional*** | *Default: CoreDnsComputeType.EC2 (for `FargateCluster` the default is FARGATE)*

Controls the "eks.amazonaws.com/compute-type" annotation in the CoreDNS configuration on your cluster to determine which compute type to use for CoreDNS.

---

##### ~~`endpoint_access`~~

*Type: [EndpointAccess](link)* | ***Optional*** | *Default: EndpointAccess.PUBLIC_AND_PRIVATE*

Configure access to the Kubernetes API server endpoint.. 

> See https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html

---

#### Methods

##### add_auto_scaling_group_capacity <sup>[aws_cdk.aws_autoscaling.AutoScalingGroup](link)</sup>

```python
cluster.add_auto_scaling_group_capacity(id: builtins.str, **kwargs)
```

**Keyword Arguments**

###### instance_type <sup>[aws_cdk.aws_ec2.InstanceType](link)</sup>

Instance type of the instances to start

> Required.

###### bootstrap_enabled <sup>builtins.bool</sup>

Configures the EC2 user-data script for instances in this autoscaling group to bootstrap the node (invoke `/etc/eks/bootstrap.sh`) and associate it with the EKS cluster

> Optional <> Default: 2

> If you wish to provide a custom user data script, set this to `false` and manually invoke `autoscalingGroup.addUserData()`

###### bootstrap_options <sup>[BootstrapOptions](link)</sup>

EKS node bootstrapping options.

> Optional <> Default: - none

###### machine_image_type <sup>[MachineImageType](link)</sup>

Machine image type

> Optional <> Default: MachineImageType.AMAZON_LINUX_2

###### map_role <sup>builtins.bool</sup>

Will automatically update the aws-auth ConfigMap to map the IAM instance role to RBAC.

> Optional <> Default: - true if the cluster has kubectl enabled (which is the default).

> This cannot be explicitly set to `true` if the cluster has kubectl disabled.

###### rolling_update_configuration <sup>[aws_cdk.aws_autoscaling.RollingUpdateConfiguration](link)</sup>

Configuration for rolling updates

> Optional <> Default: - RollingUpdateConfiguration with defaults.
> @deprecated Use `updatePolicy` instead

> Only used if updateType == UpdateType.RollingUpdate.

##### add_manifest <sup>[KubernetesManifest](link)</sup>

```python
cluster.add_manifest(id: builtins.str, *manifest: typing.Mapping[builtins.str, typing.Any])
```

##### connect_auto_scaling_group_capacity

```python
cluster.connect_auto_scaling_group_capacity(auto_scaling_group: aws_cdk.aws_autoscaling.AutoScalingGroup, **kwargs)
```

**Keyword Arguments**

###### bootstrap_enabled

###### bootstrap_options

###### machine_image_type

###### map_role

###### spot_interrupt_handler

#### Attributes

#### Static Functions

