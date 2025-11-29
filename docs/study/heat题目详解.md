[OpenStack的Heat组件详解 - yyuuee - 博客园](https://www.cnblogs.com/yyuuee/p/14180834.html)

```shell
#查询版本
[root@controller ~]# openstack orchestration template version  list 
+--------------------------------------+------+------------------------------+
| Version                              | Type | Aliases                      |
+--------------------------------------+------+------------------------------+
| AWSTemplateFormatVersion.2010-09-09  | cfn  |                              |
| HeatTemplateFormatVersion.2012-12-12 | cfn  |                              |
| heat_template_version.2013-05-23     | hot  |                              |
| heat_template_version.2014-10-16     | hot  |                              |
| heat_template_version.2015-04-30     | hot  |                              |
| heat_template_version.2015-10-15     | hot  |                              |
| heat_template_version.2016-04-08     | hot  |                              |
| heat_template_version.2016-10-14     | hot  | heat_template_version.newton |
| heat_template_version.2017-02-24     | hot  | heat_template_version.ocata  |
| heat_template_version.2017-09-01     | hot  | heat_template_version.pike   |
| heat_template_version.2018-03-02     | hot  | heat_template_version.queens |
| heat_template_version.2018-08-31     | hot  | heat_template_version.rocky  |
+--------------------------------------+------+------------------------------+
#heat模板基本内容
heat_template_version: 2018-08-31
resources:
  server: #<资源名>
    type: OS::Nova::Server #类型
    properties: #属性
#使用亚马逊云模板
HeatTemplateFormatVersion: '2012-12-12'
Resources:
__alarm__:
Type: OS::Aodh::Alarm
Properties:
#查找资源名称，第一种方法，使用dashboard，浪费时间。第二种方法，使用命令行来完成。
#使用命令行进行查询
[root@controller ~]# openstack orchestration resource type list | grep Container
| OS::Swift::Container                     |
#查询属性
#使用命令行进行查询
[root@controller ~]# openstack orchestration resource type show OS::Swift::Container 
...
#根据题目需求编写yaml文件
heat_template_version: 2018-08-31
resources:
  container:
    type: OS::Swift::Container
    properties:
name:"heat-swift"
#创建编排文件
[root@controller ~]# openstack stack create -t create_container.yaml test
+---------------------+--------------------------------------+
| Field               | Value                                |
+---------------------+--------------------------------------+
| id                  | bd085ff1-0595-4a15-84be-e4c7782e5c5c |
| stack_name          | test                                 |
| description         | No description                       |
| creation_time       | 2025-01-22T01:38:22Z                 |
| updated_time        | None                                 |
| stack_status        | CREATE_IN_PROGRESS                   |
| stack_status_reason | Stack CREATE started                 |
+---------------------+--------------------------------------+
#检查是否创建成功
[root@controller ~]# openstack stack list 
+--------------------------------------+------------+----------------------------------+-----------------+----------
------------+--------------+
| ID                                   | Stack Name | Project                          | Stack Status    | Creation 
Time        | Updated Time |
+--------------------------------------+------------+----------------------------------+-----------------+----------
------------+--------------+
| bd085ff1-0595-4a15-84be-e4c7782e5c5c | test       | 4a4adc84b02745dab568a134e40b2f08 | CREATE_COMPLETE | 2025-01-2
2T01:38:22Z | None         |
+--------------------------------------+------------+----------------------------------+-----------------+----------
------------+--------------+
#如果创建不成功，删除
[root@controller ~]# openstack stack delete test
Are you sure you want to delete this stack(s) [y/N]? y

```



## OpenStack Heat运维：创建容器

在自行搭建的OpenStack私有云平台上 ， 在/root目录下编写Heat模板create_container.yaml，要求执行yaml文件可以创建名为heat-swift的容器。

```yaml
heat_template_version: 2018-08-31
resources:
  container:
    type: OS::Swift::Container
    properties:
name:"heat-swift"
```

## OpenStack Heat运维：创建硬盘

在自行搭建的OpenStack私有云平台上，在/root目录下编写Heat模板heat_cinder.yaml，要求执行yaml文件可以创建名为heat-cinder，大小为2G的云硬盘。

```yaml
heat_template_version: 2018-08-31
resources:
  cinder:
    type: OS::Cinder::Volume
    properties:
      name: "heat-cinder"
      size: 2
```

## OpenStack Heat运维：创建网络

在自行搭建的OpenStack私有云平台上，在/root目录下编写Heat模板create_network.yaml，创建名为Heat-Network网络，选择不共享；创建子网名为Heat-Subnet，子网网段设置为10.20.2.0/24，开启DHCP服务，地址池为10.20.2.20-10.20.2.100，编写完成之后不要创建堆栈。

```yaml
heat_template_version: 2018-08-31
resources:
  net:
    type: OS::Neutron::Net
    properties:
name: "Heat-Network"
shared: False
  subnet:
    type: OS::Neutron::Subnet
    properties:
name: "Heat-Subnet"
allocation_pools:
- start: 10.20.2.20
end: 10.20.2.100
cidr: 10.20.2.0/24
enable_dhcp: True
gateway_ip: 10.20.2.1
ip_version: 4
network_id: { get_resource: net }
```

## OpenStack Heat运维：创建用户

编写 Heat 模板 create_user.yaml，创建名为 heat-user 的用户。

使用自己搭建的OpenStack私有云平台， 使用heat编写摸板(heat_template_version: 2016-04-08)创建名为”chinaskills”的 domain，在此 domain 下创建名为 beijing_group 的 租 户（project） ， 在 此 租 户 下 创 建 名 为 cloud 的 用 户 ， 将 此 文 件 命 名 及 保 存 在 /root/user_create.yml，完成后提交 controller 点的用户名、密码和 IP 地址到答题框。

```yaml
heat_template_version: 2016-04-08
resources:
  domain:
    type: OS::Keystone::Domain
    properties:
name: "chinaskills"
  project:
    type: OS::Keystone::Project
    properties:
name: "beijing_group"
domain: { get_resource: domain }
  user:
    type: OS::Keystone::User
    properties:
name: "cloud"
domain: { get_resource: domain }
default_project: { get_resource: project }
```

## OpenStack Heat运维：创建用户

在自行搭建的 OpenStack 私有云平台或赛项提供的 all-in-one 平台上，在/root 目录下编写 Heat 模板 create user.yaml，创建名为 heat-user 的用户，属于 admin 项目（project），并赋予 heat-user用户 admin 的权限（role），配置用户密码为 123456（password）。完成后提交控制节点的用户名、密码和IP 地址到答题框。 (在提交信息前请准备好 yaml 模板执行的环境)

```yaml
heat_template_version: 2018-08-31
resources:
  user:
    type: OS::Keystone::User
    properties:
name: "heat-user"
password: "123456"
roles: [{"role":"admin","project":"admin"}]
```

