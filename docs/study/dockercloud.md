# 2023国赛第九套试卷
## 【任务4】Kubernetes容器云平台搭建[5.0分]
### 【适用平台】私有云
### 【题目1】2.1.1 部署容器云平台[5.0分]
使用OpenStack私有云平台创建两台云主机，分别作为Kubernetes集群的master节点和node节点，然后完成Kubernetes集群的部署，并完成Istio服务网格、KubeVirt虚拟化和Harbor镜像仓库的部署。完成后提交master节点的用户名、密码和IP到答题框。

```shell
[root@xzy-master ~]# curl -O http://172.29.20.222/2023/competition/chinaskills_cloud_paas_v2.1.iso

[root@xzy-master ~]# mount -o loop chinaskills_cloud_paas_v2.1.iso /mnt/
mount: /dev/loop0 is write-protected, mounting read-only

[root@xzy-master ~]# cp -rvf /mnt/* /opt/

[root@xzy-master ~]# umount /mnt/

[root@xzy-master ~]# cp -rvf /opt/kubeeasy-v2.0 /usr/local/bin/

[root@xzy-master ~]# kubeeasy-v2.0 install dependencies \
> --host 172.29.20.207,172.29.20.236 --user root \
> --password 000000 \
> --offline-file /opt/dependencies/packages.tar.gz 

[root@xzy-master ~]# kubeeasy-v2.0 install kubernetes \
> --master 172.29.20.207 --worker 172.29.20.236 --user root \
> --password 000000 \
> --version 1.25.2 \
> --offline-file /opt/kubeeasy.tar.gz

[root@xzy-master ~]# kubeeasy-v2.0 create ssh-keygen \
> --master 172.29.20.207 --worker 172.29.20.236 --user root \
> --password 000000

[root@k8s-master-node1 ~]# vi /etc/docker/daemon.json
{
  "insecure-registries": ["0.0.0.0/0"]
}

[root@k8s-master-node1 ~]# systemctl daemon-reload 

[root@k8s-master-node1 ~]# systemctl restart docker

[root@k8s-master-node1 ~]# docker login -uadmin -pHarbor12345 172.29.20.207
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

### 检测：
```shell
[root@k8s-master-node1 ~]# kubectl cluster-info
Kubernetes control plane is running at https://apiserver.cluster.local:6443
CoreDNS is running at https://apiserver.cluster.local:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.

[root@k8s-master-node1 ~]# kubectl -n istio-system get all
Warning: kubevirt.io/v1 VirtualMachineInstancePresets is now deprecated and will be removed in v2.
NAME                                        READY   STATUS    RESTARTS   AGE
pod/grafana-56bdf8bf85-gv5lv                1/1     Running   0          82m
pod/istio-egressgateway-fffc799cf-r49f9     1/1     Running   0          82m
pod/istio-ingressgateway-7d68764b55-pdfb2   1/1     Running   0          82m
pod/istiod-5456fd558d-tmk5h                 1/1     Running   0          82m
pod/jaeger-c4fdf6674-h68tp                  1/1     Running   0          82m
pod/kiali-8f955f859-wx9xz                   1/1     Running   0          82m
pod/prometheus-85949fddb-m4gk5              2/2     Running   0          82m

NAME                           TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                         AGE
service/grafana                NodePort       10.96.250.173   <none>        3000:33000/TCP                  82m
service/istio-egressgateway    ClusterIP      10.96.170.36    <none>        80/TCP,443/TCP                  82m
service/istio-ingressgateway   LoadBalancer   10.96.180.24    <pending>     15021:60350/TCP,80:21669/TCP,443:2758/TCP,31400:860/TCP,15443:36161/TCP   82m
service/istiod                 ClusterIP      10.96.201.73    <none>        15010/TCP,15012/TCP,443/TCP,15014/TCP                                     82m
service/jaeger-collector       ClusterIP      10.96.189.191   <none>        14268/TCP,14250/TCP,9411/TCP   82m
service/kiali                  NodePort       10.96.106.156   <none>        20001:30001/TCP,9090:39091/TCP 82m
service/prometheus             NodePort       10.96.103.86    <none>        9090:39090/TCP                  82m
service/tracing                NodePort       10.96.228.55    <none>        80:36686/TCP,16685:36685/TCP   82m
service/zipkin                 NodePort       10.96.4.187     <none>        9411:39411/TCP                  82m

NAME                                   READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/grafana                1/1     1            1           82m
deployment.apps/istio-egressgateway    1/1     1            1           82m
deployment.apps/istio-ingressgateway   1/1     1            1           82m
deployment.apps/istiod                 1/1     1            1           82m
deployment.apps/jaeger                 1/1     1            1           82m
deployment.apps/kiali                  1/1     1            1           82m
deployment.apps/prometheus             1/1     1            1           82m

NAME                                              DESIRED   CURRENT   READY   AGE
replicaset.apps/grafana-56bdf8bf85                1         1         1       82m
replicaset.apps/istio-egressgateway-fffc799cf     1         1         1       82m
replicaset.apps/istio-ingressgateway-7d68764b55   1         1         1       82m
replicaset.apps/istiod-5456fd558d                 1         1         1       82m
replicaset.apps/jaeger-c4fdf6674                  1         1         1       82m
replicaset.apps/kiali-8f955f859                   1         1         1       82m
replicaset.apps/prometheus-85949fddb              1         1         1       82m

[root@k8s-master-node1 ~]# kubectl -n kubevirt get deployment
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
virt-api          2/2     2            2           84m
virt-controller   2/2     2            2           83m
virt-operator     2/2     2            2           84m

[root@k8s-master-node1 ~]# docker login -u admin -p Harbor12345 $(hostname -i)
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

## 【任务5】Kubernetes容器云服务运维[10.0分]
### 【适用平台】私有云
### 【题目1】2.2.1 容器化部署MariaDB [0.5分]
编写Dockerfile文件构建mysql镜像，要求基于centos完成MariaDB数据库的安装和配置，并设置服务开机自启。完成后构建镜像，并提交master节点的IP地址、用户名和密码到答题框。

```shell
[root@k8s-master-node1 ~]# curl -O http://172.29.20.222/2023/competition/ERP.tar.gz

[root@k8s-master-node1 ~]# tar -xzvf ERP.tar.gz
……

[root@k8s-master-node1 ~]# cd ERP/

[root@k8s-master-node1 ERP]# docker load -i CentOS_7.9.2009.tar 

[root@k8s-master-node1 ERP]# vi local.repo
[yum]
name=yum
baseurl=file:///root/yum
enabled=1
gpgcheck=0

[root@k8s-master-node1 ERP]# vi Dockerfile-mysql
FROM centos:centos7.9.2009
MAINTAINER Chinaskills
RUN rm -rf /etc/yum.repos.d/*
COPY local.repo /etc/yum.repos.d/
COPY yum /root/yum
ENV LC_ALL en_US.UTF-8
RUN yum install -y mariadb-server
COPY jsh_erp.sql /root/
COPY mysql_init.sh /root/
RUN sh /root/mysql_init.sh
EXPOSE 3306
CMD ["mysqld_safe","--user=root"]

[root@k8s-master-node1 ERP]# vi mysql_init.sh 
#!/bin/bash
mysql_install_db --user=root
mysqld_safe --user=root & sleep 8
mysqladmin -uroot password 'tshoperp'
mysql -uroot -ptshoperp -e "grant all on *.* to root@'%' identified by 'tshoperp';create database jsh_erp;use jsh_erp;source /root/jsh_erp.sql;"

[root@k8s-master-node1 ERP]# docker build -t erp-mysql:v1.0 -f Dockerfile-mysql .
```

### 检测：
```shell
[root@k8s-master-node1 ERP]# docker run -d --name mariadb-exam-jiance erp-mysql:v1.0 && sleep 15 && docker exec mariadb-exam-jiance mysql -uroot -ptshoperp -e "show databases" && docker rm -f mariadb-exam-jiance   
7bfb08605ac1dcf083ef3da985ea0fd09aad2c6ffe96c431da4f4c1c69f74ae6
Database
information_schema
jsh_erp
mysql
performance_schema
test
mariadb-exam-jiance
```

### 检测点：
```shell
jsh_erp
```

### 【题目2】2.2.2 容器化部署Redis [0.5分]
编写Dockerfile文件构建redis镜像，要求基于centos完成Redis服务的安装和配置，并设置服务开机自启。完成后构建镜像，并提交master节点的IP地址、用户名和密码到答题框。

```shell
[root@k8s-master-node1 ERP]# vim Dockerfile-redis
FROM centos:centos7.9.2009
MAINTAINER Chinaskills
RUN rm -rf /etc/yum.repos.d/*
COPY local.repo /etc/yum.repos.d/
COPY yum /root/yum
RUN yum -y install redis
RUN sed -i '/bind/s/127.0.0.1/0.0.0.0/;/-mode/s/yes/no/' /etc/redis.conf
EXPOSE 6379
CMD ["redis-server","/etc/redis.conf"]

[root@k8s-master-node1 ERP]# docker build -t erp-redis:v1.0 -f Dockerfile-redis .
```

### 检测：
```shell
[root@k8s-master-node1 ERP]# docker run -d --name redis-exam-jiance erp-redis:v1.0 && sleep 10 && docker exec redis-exam-jiance redis-cli -p 6379 info && docker rm -f redis-exam-jiance
431846511da147fdc3c6cfb3397025d6232ca25719b70ea8f577bddf3720288c
# Server
redis_version:3.2.12
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:7897e7d0e13773f
redis_mode:standalone
os:Linux 3.10.0-1160.el7.x86_64 x86_64
arch_bits:64
multiplexing_api:epoll
gcc_version:4.8.5
process_id:1
run_id:9229aeae81e85c7df857fb861491e98627ec0e83
tcp_port:6379
uptime_in_seconds:10
uptime_in_days:0
hz:10
lru_clock:10912960
executable:/redis-server
config_file:/etc/redis.conf
……
```

### 检测点：
```shell
redis_version:3.2.12 && redis_mode:standalone
```

### 【题目3】2.2.3 容器化部署Nginx [0.5分]
编写Dockerfile文件构建nginx镜像，要求基于centos完成Nginx服务的安装和配置，并设置服务开机自启。完成后构建镜像，并提交master节点的IP地址、用户名和密码到答题框。

```shell
[root@k8s-master-node1 ERP]# vim Dockerfile-nginx
FROM centos:centos7.9.2009
MAINTAINER Chinaskills
RUN rm -rf /etc/yum.repos.d/*
COPY local.repo /etc/yum.repos.d/
COPY yum /root/yum
RUN yum -y install nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/app.tar.gz /
RUN tar -zxvf app.tar.gz -C /
RUN /bin/bash -c "echo init ok"
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

[root@k8s-master-node1 ERP]# docker build -t erp-nginx:v1.0 -f Dockerfile-nginx .
```

### 检测：
```shell
[root@k8s-master-node1 ERP]# docker rm -f nginx-exam-jiance > /dev/null 2>&1 && docker run -d --name=nginx-exam-jiance --restart=always erp-nginx:v1.0 && sleep 5s && docker logs nginx-exam-jiance && docker rm -f nginx-exam-jiance
7d9340ce7b12c24a41da16cb25057a19d62252b59c4430efdd1df1dffa582be3
nginx: [emerg] host not found in upstream "erp-server" in /etc/nginx/nginx.conf:24
nginx: [emerg] host not found in upstream "erp-server" in /etc/nginx/nginx.conf:24
nginx: [emerg] host not found in upstream "erp-server" in /etc/nginx/nginx.conf:24
nginx: [emerg] host not found in upstream "erp-server" in /etc/nginx/nginx.conf:24
nginx: [emerg] host not found in upstream "erp-server" in /etc/nginx/nginx.conf:24
nginx: [emerg] host not found in upstream "erp-server" in /etc/nginx/nginx.conf:24
nginx-exam-jiance
```

### 检测点：
```shell
erp-server
```

### 【题目4】2.2.4 容器化部署ERP [0.5分]
编写Dockerfile文件构建erp镜像，要求基于centos完成JDK环境和ERP服务的安装与配置，并设置服务开机自启。完成后构建镜像，并提交master节点的IP地址、用户名和密码到答题框。

```shell
[root@k8s-master-node1 ERP]# vim Dockerfile-erp
FROM centos:centos7.9.2009
MAINTAINER Chinaskills
RUN rm -rf /etc/yum.repos.d/*
COPY local.repo /etc/yum.repos.d/
COPY yum /root/yum
RUN yum -y install java-1.8.0-openjdk java-1.8.0-openjdk-devel
COPY app.jar /root/
EXPOSE 9999
CMD java -jar /root/app.jar

[root@k8s-master-node1 ERP]# docker build -t erp-service:v1.0 -f Dockerfile-erp .
```

### 检测：
```shell
[root@k8s-master-node1 ERP]# docker run -d --name erp-exam-jiance --restart=always erp-server:v1.0 && docker exec erp-exam-jiance java -version && docker exec erp-exam-jiance ps -aux && docker rm -f erp-exam-jiance
370e4a6d516f732e0a42664c1bdd944517673ef5ece5cbc41ce68b41cd159efb
openjdk version "1.8.0_312"
OpenJDK Runtime Environment (build 1.8.0_312-b07)
OpenJDK 64-Bit Server VM (build 25.312-b07, mixed mode)
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.2 6526132 43240 ?       Ssl  13:56   0:00 java -jar /root/app.jar
root        41  0.0  0.0  51732  1696 ?        Rs   13:56   0:00 ps -aux
erp-exam-jiance
```

### 检测点：
```shell
1.8.0_312 && app.jar
```

### 【题目5】2.2.5 编排部署ERP管理系统[1.0分]
编写docker-compose.yaml文件，要求使用镜像mysql、redis、nginx和erp完成ERP管理系统的编排部署。完成后编排部署ERP管理系统，然后提交master节点的IP地址、用户名和密码到答题框。

```shell
[root@k8s-master-node1 ERP]# vim docker-compose.yaml
version: '3'
services:
  erp-mysql:
    image: erp-mysql:v1.0
    container_name: erp-mysql
    ports:
    - 3306:3306
    environment:
    - MYSQL_DATABASE=jsh_erp
    restart: always
  erp-redis:
    image: erp-redis:v1.0
    container_name: erp-redis
    ports:
    - 6379:6379
    restart: always
    command: redis-server --port 6379 --requirepass tshoperp --appendonly yes
  erp-server:
    image: erp-service:v1.0
    container_name: erp-server
    ports:
    - 9999:9999
    restart: always
  erp-web-ui:
    image: erp-nginx:v1.0
    container_name: erp-nginx
    ports:
    - 8888:80
    restart: always

[root@k8s-master-node1 ERP]# docker-compose up -d
```

### 检测：
```shell
[root@k8s-master-node1 ERP]# curl -L $(hostname -i):8888
……
    /* 滚动条优化 end */</style><script>function getPlatform(type) {
      let res = '';
      let ajax = new XMLHttpRequest();
      let url = window._CONFIG['domianURL'] + '/platformConfig/getPlatform/' + type
      ajax.onreadystatechange = function () {
        if (ajax.readyState===4 &&ajax.status===200) {
          res = ajax.responseText;
        } else {
          res = 'ERP系统';
        }
      }
      ajax.open('get', url, false);
      ajax.send(null);
      return res;
    }
    window._CONFIG = {};
    window._CONFIG['domianURL'] = '/jshERP-boot';
    // window._CONFIG['domianURL'] = 'https://sdyq-erp-t-api.debug-online.cn/jshERP-boot';
    let statisticsCode = '1cd9bcbaae133f03a6eb19da6579aaba'
    window.SYS_TITLE = getPlatform("name");
    window.SYS_URL = getPlatform("url");
    window._statistics = 'https://hm.baidu.com/hm.js?' + statisticsCode
    document.title = window.SYS_TITLE;
    //statistics
    var _hmt = _hmt || [];
    (function() {
……
```

### 检测点：
```shell
ERP系统
```

### 【题目6】2.2.6 部署GitLab [1.0分]
在Kubernetes集群中新建命名空间gitlab-ci，将GitLab部署到该命名空间下，Deployment和Service名称均为gitlab，以NodePort方式将80端口对外暴露为30880，设置GitLab服务root用户的密码为admin@123，将项目包demo-2048.tar.gz导入到GitLab中并命名为demo-2048。完成后提交master节点的用户名、密码和IP地址到答题框。（需要用到的软件包：CICD-Runner.tar.gz）

```shell
[root@k8s-master-node1 ~]# curl -O http://172.29.20.222/2023/competition/Gitlab-CI.tar.gz

[root@k8s-master-node1 ~]# tar -xzvf Gitlab-CI.tar.gz

[root@k8s-master-node1 ~]# scp gitlab-ci/images/images.tar k8s-worker-node1:/root/

[root@k8s-master-node1 ~]# ctr -n k8s.io image import gitlab-ci/images/images.tar  

[root@k8s-worker-node1 ~]# ctr -n k8s.io image import images.tar

[root@k8s-master-node1 ~]# kubectl create ns gitlab-ci

[root@k8s-master-node1 ~]# cd gitlab-ci/   

[root@k8s-master-node1 gitlab-ci]# vi gitlab-deploy.yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    name: gitlab
  name: gitlab
  namespace: gitlab-ci
spec:
  selector:
    matchLabels:
      name: gitlab
  template:
    metadata:
      name: gitlab
      labels:
        name: gitlab
    spec:
      containers:
      - image: docker.io/gitlab/gitlab-ce:latest
        name: gitlab
        imagePullPolicy: IfNotPresent
        env:
        - name: GITLAB_ROOT_PASSWORD
          value: Abc@1234
        - name: GITLAB_ROOT_EMAIL
          value: 123456@qq.com
        ports:
        - name: http
          containerPort: 80
        volumeMounts:
        - name: gitlab-config
          mountPath: /etc/gitlab
        - name: gitlab-logs
          mountPath: /var/log/gitlab
        - name: gitlab-data
          mountPath: /var/opt/gitlab
      volumes:
      - name: gitlab-config
        hostPath:
          path: /home/gitlab/conf
      - name: gitlab-logs
        hostPath:
          path: /home/gitlab/logs
      - name: gitlab-data
        hostPath:
          path: /home/gitlab/data
---
apiVersion: v1
kind: Service
metadata:
  labels:
    name: gitlab
  name: gitlab
  namespace: gitlab-ci
spec:
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: http
    nodePort: 30880
  selector:
    name: gitlab

[root@k8s-master-node1 gitlab-ci]# kubectl apply -f gitlab-deploy.yaml

[root@k8s-master-node1 ~]# kubectl -n gitlab-ci get all -owide
Warning: kubevirt.io/v1 VirtualMachineInstancePresets is now deprecated and will be removed in v2.
NAME                          READY   STATUS    RESTARTS   AGE   IP            NODE               NOMINATED NODE   READINESS GATES
pod/gitlab-5945f868c9-5gpsn   1/1     Running   0          4s    10.244.1.21   k8s-worker-node1   <none>           <none>

NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE   SELECTOR
service/gitlab   NodePort   10.96.100.235   <none>        80:30880/TCP   4s    name=gitlab

NAME                     READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES                              SELECTOR
deployment.apps/gitlab   1/1     1            1           4s    gitlab       docker.io/gitlab/gitlab-ce:latest   name=gitlab

NAME                                DESIRED   CURRENT   READY   AGE   CONTAINERS   IMAGES                              SELECTOR
replicaset.apps/gitlab-5945f868c9   1         1         1       4s    gitlab       docker.io/gitlab/gitlab-ce:latest   name=gitlab,pod-template-hash=5945f868c9

[root@k8s-master-node1 gitlab-ci]# kubectl -n kube-system edit configmaps coredns 
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        #添加
        hosts {
            10.244.0.14 gitlab-5945f868c9-d5dff
            fallthrough
        }
        prometheus :9153
        forward . /etc/resolv.conf {
           max_concurrent 1000
```

### 访问Gitlab：
root/Abc@1234

![img](http://miragedge.top/assets/images/md/1)  
![img](http://miragedge.top/assets/images/md/2)  

#如出现以下页面点击这里即可
![img](http://miragedge.top/assets/images/md/3)  
![img](http://miragedge.top/assets/images/md/4)  
![img](http://miragedge.top/assets/images/md/5)  

### 创建项目：
```shell
[root@k8s-master-node1 ~]# cd gitlab-ci/demo-2048/

[root@k8s-master-node1 demo-2048]# vi template/demo-2048.yaml
    spec:
      containers:
        - name: demo-2048
          image: 172.29.20.207/demo/demo:latest   #这里改为本机IP
          ports:
            - containerPort: 8080
              name: demo

[root@k8s-master-node1 demo-2048]# vi Dockerfiles/Dockerfile
FROM 172.29.20.207/library/tomcat:8.5.64-jdk8  #这里改为本机IP
RUN rm -rf /usr/local/tomcat/webapps/ROOT/
ADD 2048 /usr/local/tomcat/webapps/ROOT/

[root@k8s-master-node1 demo-2048]# git config --global user.name "administrator"

[root@k8s-master-node1 demo-2048]# git config --global user.email "admin@example.com"

[root@k8s-master-node1 demo-2048]# git remote remove origin

[root@k8s-master-node1 demo-2048]# git remote add origin http://172.29.20.207:30880/root/demo-2048.git

[root@k8s-master-node1 demo-2048]# git add .

[root@k8s-master-node1 demo-2048]# git commit -m "test"

[root@k8s-master-node1 demo-2048]# git push -u origin drone
Username for 'http://172.29.20.207:30880': root    #gitlab账户
Password for 'http://root@172.29.20.207:30880': #密码  Abc@1234
Counting objects: 366, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (182/182), done.
Writing objects: 100% (366/366), 122.76 KiB | 0 bytes/s, done.
Total 366 (delta 162), reused 352 (delta 153)
remote: Resolving deltas: 100% (162/162), done.
remote: 
remote: To create a merge request for drone, visit:
remote:   http://gitlab-5945f868c9-5gpsn/root/demo-2048/-/merge_requests/new?merge_request%5Bsource_branch%5D=drone
remote: 
To http://172.29.20.207:30880/root/demo-2048.git
 * [new branch]      drone -> drone
Branch drone set up to track remote branch drone from origin.
```

### 检查：
```shell
kubectl -n gitlab-ci exec deploy/gitlab -- gitlab-ctl service-list
```

### 检查点：
```shell
prometheus* || gitlab-workhorse* || postgresql* || redis*
```

### 检查：
```shell
curl -L http://$(hostname -i):30880/admin
```

### 检查点：
```shell
GitLab is a single application for the entire software development lifecycle
```

### 【题目7】2.2.7 部署GitLab Runner [1.0分]
将GitLab Runner部署到gitlab-ci命名空间下，Release名称为gitlab-runner，为GitLab Runner创建持久化构建缓存目录/home/gitlab-runner/ci-build-cache以加速构建速度，并将其注册到GitLab中。完成后提交master节点的用户名、密码和IP地址到答题框。（需要用到的软件包：CICD-Runner.tar.gz）

```shell
[root@k8s-master-node1 demo-2048]# cd ..

[root@k8s-master-node1 gitlab-ci]# kubectl -n gitlab-ci create sa gitlab-ci

[root@k8s-master-node1 gitlab-ci]# kubectl -n gitlab-ci create role --resource="*" --verb="*" gitlab-ci

[root@k8s-master-node1 gitlab-ci]# kubectl -n gitlab-ci create rolebinding --role=gitlab-ci --serviceaccount=gitlab-ci:gitlab-ci gitlab-ci

[root@k8s-master-node1 gitlab-ci]# kubectl create clusterrolebinding --clusterrole=cluster-admin --serviceaccount=gitlab-ci:default default
```

![img](http://miragedge.top/assets/images/md/6)  
![img](http://miragedge.top/assets/images/md/7)  

#这里可以看到注册令牌 复制等会需要用到


![img](http://miragedge.top/assets/images/md/8)  

```shell
[root@k8s-master-node1 gitlab-ci]# tar -xzvf gitlab-runner-0.43.0.tgz

#修改values.yaml文件
[root@master gitlab-ci]# vi gitlab-runner/values.yaml
...
  ## Use the following Kubernetes Service Account name if RBAC is disabled in this Helm chart (see rbac.create)
  ##
  # serviceAccountName: default
  serviceAccountName: gitlab-ci   #添加，注意缩进格式
... 

## The GitLab Server URL (with protocol) that want to register the runner against
## ref: https://docs.gitlab.com/runner/commands/index.html#gitlab-runner-register
##
# gitlabUrl: http://gitlab.your-domain.com/
gitlabUrl: http://10.24.2.14:30880/      #添加，缩进顶格
...
## The Registration Token for adding new Runners to the GitLab Server. This must
## be retrieved from your GitLab Instance.
## ref: https://docs.gitlab.com/ce/ci/runners/index.html
##
# runnerRegistrationToken: "" 
runnerRegistrationToken: "riU8c4D2SNkKAv8GS9q_"  #这里使用的是上面复制的token
...
  config: |
    [[runners]]
      [runners.kubernetes]
        namespace = "{{.Release.Namespace}}"
        image = "ubuntu:16.04"
        privileged = true     #添加，注意缩进格式

#创建一个PVC用于挂载到Pod中使用：
[root@k8s-master-node1 gitlab-ci]# vi gitlab-runner/templates/pvc.yaml 
apiVersion: v1
kind: PersistentVolume
metadata:
  labels:
    type: local
  name: ci-build-cache-pv
  namespace: gitlab-ci
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 10Gi
  hostPath:
    path: "/opt/ci-build-cache"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ci-build-cache-pvc
  namespace: gitlab-ci
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi

#编辑values.yaml文件，在最后一行后添加构建缓存信息配置：
[root@master gitlab-ci]# vi gitlab-runner/values.yaml
## configure build cache
cibuild:
  cache:
    pvcName: ci-build-cache-pvc
    mountPath: /home/gitlab-runner/ci-build-cache

[root@master gitlab-ci]# vi gitlab-runner/templates/configmap.yaml
    cat >>/home/gitlab-runner/.gitlab-runner/config.toml <<EOF
      [[runners.kubernetes.volumes.pvc]]
      name = "{{.Values.cibuild.cache.pvcName}}"
      mount_path = "{{.Values.cibuild.cache.mountPath}}"
    EOF

    # Start the runner   #在这一行上面添加
    exec /entrypoint run --user=gitlab-runner \
      --working-directory=/home/gitlab-runner

[root@k8s-master-node1 gitlab-ci]# helm -n gitlab-ci install gitlab-runner gitlab-runner
NAME: gitlab-runner
LAST DEPLOYED: Wed Jan 10 16:46:30 2024
NAMESPACE: gitlab-ci
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Your GitLab Runner should now be registered against the GitLab instance reachable at: "http://172.29.20.207:30880/"

Runner namespace "gitlab-ci" was found in runners.config template.
```

#可以看到Runner状态为online，表明已经注册成功。


![img](http://miragedge.top/assets/images/md/9)  

### 【题目8】2.2.8 部署GitLab Agent [1.0分]
将Kubernetes集群添加到demo-2048项目中，并命名为kubernetes-agent，项目命名空间选择gitlab-ci。完成后提交master节点的用户名、密码和IP地址到答题框。（需要用到的软件包：CICD-Runner.tar.gz）

![img](http://miragedge.top/assets/images/md/10)  
![img](http://miragedge.top/assets/images/md/11)  
![img](http://miragedge.top/assets/images/md/12)  
![img](http://miragedge.top/assets/images/md/13)  
![img](http://miragedge.top/assets/images/md/14)  

#添加 .gitlab/agents/kubernetes-agent/config.yaml (main 添加)
#文件格式如下：
```yaml
gitops:
  manifest_projects:
  - id: root/demo-2048
    default_namespace: gitlab-ci
    paths:
    - glob: '/**/*.{yaml,yml,json}'
```

![img](http://miragedge.top/assets/images/md/15)  
![img](http://miragedge.top/assets/images/md/16)  

#创建完到下面这个页面 复制框选的地方 更改完进行执行

![img](http://miragedge.top/assets/images/md/17)  

```shell
[root@k8s-master-node1 gitlab-ci]# helm upgrade --install kubernetes-agent gitlab-agent-1.1.0.tgz --namespace gitlab-ci  --create-namespace --set image.tag=v16.2.0 --set config.token=PNYDa-ZWshXX1stKHJbu285mprTZiY79spshsbkQ_udGs1HPSA --set config.kasAddress=ws://gitlab-5945f868c9-5gpsn/-/kubernetes-agent/
Release "kubernetes-agent" does not exist. Installing it now.
NAME: kube4rnetes-agent
LAST DEPLOYED: Wed Jan 10 16:54:54 2024
NAMESPACE: gitlab-ci
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

![img](http://miragedge.top/assets/images/md/18)  

### 【题目9】2.2.9 构建CI/CD [2.0分]
编写流水线脚本.gitlab-ci.yml触发自动构建，具体要求如下：（1）基于镜像maven:3.6-jdk-8构建项目的drone分支；（2）构建镜像的名称：demo:latest；（3）将镜像推送到Harbor仓库demo项目中；（4）将demo-2048应用自动发布到Kubernetes集群gitlab-ci命名空间下。完成后提交master节点的用户名、密码和IP地址到答题框。（需要用到的软件包：CICD-Runner.tar.gz）

#登录Harbor仓库新建一个公开项目demo

![img](http://miragedge.top/assets/images/md/19)  

```shell
[root@k8s-master-node1 gitlab-ci]# ctr -n k8s.io images tag docker.io/library/tomcat:8.5.64-jdk8 172.29.20.107/library/tomcat:8.5.64-jdk8

[root@k8s-master-node1 gitlab-ci]# ctr -n k8s.io images push 172.29.20.107/library/tomcat:8.5.64-jdk8 --plain-http=true --user admin:Harbor12345

#修改containerd配置文件：worker节点也需修改
[root@k8s-master-node1 gitlab-ci]# vi /etc/containerd/config.toml 

      [plugins."io.containerd.grpc.v1.cri".registry.mirrors]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."172.29.20.107"]
          endpoint = ["http://172.29.20.107"]

[root@k8s-master-node1 gitlab-ci]# systemctl daemon-reload 

[root@k8s-master-node1 gitlab-ci]# systemctl restart containerd
```

#切换项目

![img](http://miragedge.top/assets/images/md/20)  
![img](http://miragedge.top/assets/images/md/21)  
![img](http://miragedge.top/assets/images/md/22)  

#.gitlab-ci.yml
```yaml
stages:
  - build
  - release
  - review

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=/opt/cache/.m2/repository"

maven_build:
  image: maven:3.6-jdk-8
  stage: build
  only:
    - drone
  script:
    - cp -r /opt/repository /opt/cache/.m2/
    - mvn clean install -DskipTests=true
    - cd target && jar -xf 2048.war
    - cp -rfv 2048 /home/gitlab-runner/ci-build-cache

image_build:
  image: docker:18.09.7
  stage: release
  variables:
    DOCKER_DRIVER: overlay
    DOCKER_HOST: tcp://localhost:2375
    #CI_DEBUG_TRACE: "true"
  services:
    - name: docker:18.09.7-dind
      command: ["--insecure-registry=0.0.0.0/0"]
  script:
    - cp -rfv /home/gitlab-runner/ci-build-cache/2048 .
    - docker build -t demo:latest -f ./Dockerfiles/Dockerfile .
    - docker tag demo:latest 172.29.20.103/demo/demo:latest   #IP更换为本机IP
    - docker login -u admin -p Harbor12345 172.29.20.103
    - docker push 172.29.20.103/demo/demo:latest
 
deploy_review:
  image: kubectl:1.22
  stage: review
  only:
    - drone
  script:
    - kubectl apply -f template/
```

![img](http://miragedge.top/assets/images/md/23)  

