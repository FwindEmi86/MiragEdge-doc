---
sidebar_position: 2
slug: /docs/study/Kubernetes
title: K8S容器编排(发布)技术
---

什么是Kubernetes？

简称k8s（k，8 个字符，s）或kube

<div className="image-center">
  <div className="image-card">
    <div className="image-container">
      <img 
        src="/img/study/k8s.png" 
        alt="Kubernetes" 
      />
    </div>
    <div className="image-caption">Kubernetes的图标</div>
  </div>
</div>

Kubernetes可实现的功能：

跨主机编排容器。
更充分地利用硬件资源来最大化地满足企业应用的需求。
控制与自动化应用的部署与升级。
为有状态的应用程序挂载和添加存储器。
线上扩展或裁剪容器化应用程序与它们的资源。
声明式的容器管理，保证所部署的应用按照我们部署的方式运作。
通过自动布局、自动重启、自动复制、自动伸缩实现应用的状态检查与自我修复。


但 Kubernetes 依赖其它项目来提供完整的编排服务。结合其它开源项目作为其组件，你才能充分感受到 Kubernetes 的能力。这些必要组件包括：

仓库：Atomic Registry、Docker Registry 等。
网络：OpenvSwitch 和智能边缘路由等。
监控：heapster、kibana、hawkular 和 elastic。
安全：LDAP、SELinux、 RBAC 与 支持多租户的 OAUTH。
自动化：通过 Ansible 的 playbook 进行集群的安装和生命周期管理。
服务：大量事先创建好的常用应用模板。

一些通用术语，专有名词：

Master（主节点）： 控制 Kubernetes 节点的机器，也是创建作业任务的地方。
Node（节点）： 这些机器在 Kubernetes 主节点的控制下执行被分配的任务。
Pod： 由一个或多个容器构成的集合，作为一个整体被部署到一个单一节点。同一个 pod 中的容器共享 IP 地址、进程间通讯（IPC）、主机名以及其它资源。Pod 将底层容器的网络和存储抽象出来，使得集群内的容器迁移更为便捷。
Replication controller（复制控制器）： 控制一个 pod 在集群上运行的实例数量。
Service（服务）： 将服务内容与具体的 pod 分离。Kubernetes 服务代理负责自动将服务请求分发到正确的 pod 处，不管 pod 移动到集群中的什么位置，甚至可以被替换掉。
Kubelet： 这个守护进程运行在各个工作节点上，负责获取容器列表，保证被声明的容器已经启动并且正常运行。
kubectl： 这是 Kubernetes 的命令行配置工具。

<div className="image-center">
  <div className="image-card">
    <div className="image-container">
      <img 
        src="https://pic2.zhimg.com/v2-b3f96ec449b52cd0b8e5ca141bffb623_1440w.png" 
        alt="Kubernetes如何适用于你的基础设施" 
      />
    </div>
    <div className="image-caption">Kubernetes 如何适用于你的基础设施</div>
  </div>
</div>

