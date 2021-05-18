# Python API Reference Example

This document shows the experience of a python API reference document in terms of:

- Navigation
- Content
- Concepts

This README file can be generated from a jsii assembly independently from the construct hub, and provides the building block for displaying documentation pages. Users can place this file in their own repository.

In the construct hub, this README will be processed by a UI component which will rended a navigation pane and a content pane. 

# API Reference

* [Constructs](#constructs)
  * [Cluster](#cluster)
    * [Initializer](#initializer)
      * [`version`](#version)
      * [`default_capacity`](#default_capacity)
      * [`default_capacity_instance`](#default_capacity_instance)
      * [`default_capacity_type`](#default_capacity_type)
      * [`secrets_encryption_key`](#secrets_encryption_key)
      * [`cluster_handler_environment`](#cluster_handler_environment)
      * [`core_dns_compute_type`](#core_dns_compute_type)
      * [`endpoint_access`](#endpoint_access)
    * [Methods](#methods)
      * [`add_manifest`](#add_manifest)
      * [`add_auto_scaling_group_capacity`](#add_auto_scaling_group_capacity)
      * [`connect_auto_scaling_group_capacity`](#connect_auto_scaling_group_capacity)
    * [Properties](#properties)
      * [`connections`](#connections)
      * [`cluster_security_group`](#cluster_security_group)
      * [`default_capacity`](#default_capacity-1)
      * [`aws_auth`](#aws_auth)
      * [`kubectl_security_group`](#kubectl_security_group)
    * [Static Members](#static-members)
      * [`from_cluster_attributes`](#from_cluster_attributes)

## Constructs

### Cluster

A Cluster represents a managed Kubernetes Service (EKS).

This is a fully managed cluster of API Servers (control-plane). The user is still required to create the worker nodes.

#### Initializer

```python
from aws_cdk import aws_eks as eks

eks.Cluster(scope: constructs.Construct, id: builtins.str, **kwargs)
```

**kwargs**

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

##### `endpoint_access`

*Type: [EndpointAccess](link)* | ***Optional*** | *Default: EndpointAccess.PUBLIC_AND_PRIVATE*

Configure access to the Kubernetes API server endpoint.. 

> See https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html

---

#### Methods

##### `add_auto_scaling_group_capacity`

Add nodes to this EKS cluster.

The nodes will automatically be configured with the right VPC and AMI for the instance type and Kubernetes version.
Note that if you specify `updateType: RollingUpdate` or `updateType: ReplacingUpdate`, your nodes might be replaced at deploy time without notice in case the recommended AMI for your machine image type has been updated by AWS. The default behavior for `updateType` is `None`, which means only new instances will be launched using the new AMI.

Spot instances will be labeled `lifecycle=Ec2Spot` and tainted with `PreferNoSchedule`. In addition, the [spot interrupt handler](https://github.com/awslabs/ec2-spot-labs/tree/master/ec2-spot-eks-solution/spot-termination-handler) daemon will be installed on all spot instances to handle [EC2 Spot Instance Termination Notices](https://aws.amazon.com/blogs/aws/new-ec2-spot-instance-termination-notices/).

```python
cluster.add_auto_scaling_group_capacity(id: builtins.str, **kwargs)
```

- *Returns: [aws_cdk.aws_autoscaling.AutoScalingGroup](link)*

**kwargs**

---

###### `instance_type`

- *Type: [aws_cdk.aws_ec2.InstanceType](link)* | ***Required***

Instance type of the instances to start

---

###### `bootstrap_enabled`

- *Type: builtins.bool* | ***Optional*** | Default: 2

Configures the EC2 user-data script for instances in this autoscaling group to bootstrap the node (invoke `/etc/eks/bootstrap.sh`) and associate it with the EKS cluster

> If you wish to provide a custom user data script, set this to `false` and manually invoke `autoscalingGroup.addUserData()`

---

###### `bootstrap_options`

- *Type: [BootstrapOptions](link)* | ***Optional*** | Default: - none

EKS node bootstrapping options.

---

###### `machine_image_type`

- *Type: [MachineImageType](link)* | ***Optional*** | Default: MachineImageType.AMAZON_LINUX_2

Machine image type

---

###### `map_role`

- *Type: builtins.bool* | ***Optional*** | Default: - true if the cluster has kubectl enabled (which is the default).

Will automatically update the aws-auth ConfigMap to map the IAM instance role to RBAC.

> This cannot be explicitly set to `true` if the cluster has kubectl disabled.

---

###### ~~`rolling_update_configuration`~~

- *Depracated: Use `updatePolicy` instead*
- *Type: [aws_cdk.aws_autoscaling.RollingUpdateConfiguration](link)* | ***Optional*** | Default: - RollingUpdateConfiguration with defaults.

Configuration for rolling updates

> Only used if updateType == UpdateType.RollingUpdate.

---

##### `add_manifest` 

Defines a Kubernetes resource in this cluster.

The manifest will be applied/deleted using kubectl as needed.

```python
cluster.add_manifest(id: builtins.str, *manifest: typing.Mapping[builtins.str, typing.Any])
```

- *Returns: [KubernetesManifest](link)*

##### `connect_auto_scaling_group_capacity`

Connect capacity in the form of an existing AutoScalingGroup to the EKS cluster.

The AutoScalingGroup must be running an EKS-optimized AMI containing the /etc/eks/bootstrap.sh script. This method will configure Security Groups,add the right policies to the instance role, apply the right tags, and add the required user data to the instance's launch configuration.

Spot instances will be labeled `lifecycle=Ec2Spot` and tainted with `PreferNoSchedule`. If kubectl is enabled, the [spot interrupt handler](https://github.com/awslabs/ec2-spot-labs/tree/master/ec2-spot-eks-solution/spot-termination-handler) daemon will be installed on all spot instances to handle [EC2 Spot Instance Termination Notices](https://aws.amazon.com/blogs/aws/new-ec2-spot-instance-termination-notices/).
Prefer to use `addAutoScalingGroupCapacity` if possible.

```python
cluster.connect_auto_scaling_group_capacity(auto_scaling_group: aws_cdk.aws_autoscaling.AutoScalingGroup, **kwargs)
```

- *Returns: None*

**kwargs**

---

###### `bootstrap_enabled`

- *Type: builtins.bool* | ***Optional*** | Default: true

Configures the EC2 user-data script for instances in this autoscaling group to bootstrap the node (invoke `/etc/eks/bootstrap.sh`) and associate it with the EKS cluster.

> If you wish to provide a custom user data script, set this to `false` and manually invoke `autoscalingGroup.addUserData()`.

---

###### `bootstrap_options`

- *Type: [BootstrapOptions](link)* | ***Optional*** | Default: - default options

Allows options for node bootstrapping through EC2 user data.

---

###### `machine_image_type`

- *Type: [MachineImageType](link)* | ***Optional*** | Default: MachineImageType.AMAZON_LINUX_2

Allow options to specify different machine image type

---

###### `map_role`

- *Type: builtins.bool* | ***Optional*** | Default: - true if the cluster has kubectl enabled (which is the default).

Will automatically update the aws-auth ConfigMap to map the IAM instance role to RBAC.

> This cannot be explicitly set to `true` if the cluster has kubectl disabled.

---

###### `spot_interrupt_handler`

- *Type: builtins.bool* | ***Optional*** | Default: true

Installs the AWS spot instance interrupt handler on the cluster if it's not already added. Only relevant if `spotPrice` is configured on the auto-scaling group.

---

#### Properties

##### `connections`

- *Type: [aws_cdk.aws_ec2.Connections](link)*

Manages connection rules (Security Group Rules) for the cluster

---

##### `cluster_security_group`

- *Type: [aws_cdk.aws_ec2.ISecurityGroup](link)*

The cluster security group that was created by Amazon EKS for the cluster.

---

##### `default_capacity`

- *Type: [aws_cdk.aws_autoscaling.AutoScalingGroup](link)* | ***Nullable***

The auto scaling group that hosts the default capacity for this cluster.

> This will be `undefined` if the `defaultCapacityType` is not `EC2` or `defaultCapacityType` is `EC2` but default capacity is set to 0.

---

##### `aws_auth`

- *Type: [AwsAuth](link)*

Lazily creates the AwsAuth resource, which manages AWS authentication mapping.

---

##### `kubectl_security_group`

- *Type: [aws_cdk.aws_ec2.ISecurityGroup](link)* | ***Nullable***
 
A security group to use for ``kubectl`` execution.

> If not specified, the k8s endpoint is expected to be accessible publicly.

#### Static Members

##### `from_cluster_attributes` 

Import an existing cluster

The manifest will be applied/deleted using kubectl as needed.

```python
from aws_cdk import aws_eks as eks

eks.Cluster.from_cluster_attributes(scope: constructs.Construct, id: builtins.str, **kwargs)
```

- *Returns: [ICluster](link)*

**kwargs**

---

###### `cluster_name`

- *Type: builtins.str* | ***Required***

The physical name of the Cluster

---

###### `vpc`

- *Type: aws_cdk.aws_ec2.IVpc* | ***Optional*** | Default: - if not specified `cluster.vpc` will throw an error

The VPC in which this Cluster was created

---

###### `kubectl_role_arn`

- *Type: builtins.str* | ***Optional*** | Default: - if not specified, it not be possible to issue `kubectl` commands against an imported cluster.

An IAM role with cluster administrator and "system:masters" permissions.

---
