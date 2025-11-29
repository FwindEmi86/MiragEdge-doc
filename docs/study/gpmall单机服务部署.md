---
sidebar_position: 5
slug: /docs/study/gpmall单机服务部署
title: gpmall单机服务部署
---

### 2. 实战案例——GPMALL单机服务部署

#### 2.1 基础服务配置

（1）修改系统主机为mall，命令如下所示。

```shell
[root@localhost ~]# hostnamectl set-hostname mall
[root@localhost ~]# bash
[root@mall ~]# hostnamectl
   Static hostname: mall
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 622ba110a69e24eda2dca57e4d306baa
           Boot ID: 6a11fa8faa654c86887be81f373fc48d
    Virtualization: kvm
  Operating System: CentOS Linux 7 (Core)
       CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-862.2.3.el7.x86_64
      Architecture: x86-64
```

（2）使用vi命令添加域名解析到/etc/hosts文件中，按i键进入编辑状态，按照要求修改配置文件，修改完成后按ESC键输入`:wq`，再按回车键保存退出。命令如下：

```shell
[root@mall ~]# vi /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
172.24.24.12    mall                   //注意：改为实际分配的mall节点IP地址
172.24.24.12    redis.mall
172.24.24.12    mysql.mall
172.24.24.12    zookeeper.mall
172.24.24.12    kafka.mall
```

（3）下载应用安装软件包cloud_webapp.tar.gz，并解压该软件包压缩文件到/opt目录，命令如下所示。

```shell
[root@mall~]# curl -O http://mirrors.54mc.cn/cloud/cloud_webapp.tar.gz
[root@mall~]# tar -zxvf cloud_webapp.tar.gz -C /opt/
```

（4）配置yum源文件。

```shell
[root@mall~]# mv /etc/yum.repos.d/* /media/
[root@mall~]# cat << EOF >> /etc/yum.repos.d/yum.repo 
[gpmall]
name= gpmall
baseurl=file:///opt/cloud_webapp/packages
gpgcheck=0
enabled=1
EOF     //按回车键结束
[root@wordpress ~]# yum clean all && yum repolist
Loaded plugins: fastestmirror
Cleaning repos: gpmall
Cleaning up everything
Maybe you want: rm -rf /var/cache/yum, to also free up space taken by orphaned data from disabled or removed repos
Loaded plugins: fastestmirror
Determining fastest mirrors
gpmall                                                                                                    | 2.9 kB  00:00:00     
gpmall/primary_db                                                                                         | 174 kB  00:00:00     
repo id                                                       repo name                                                    status
gpmall                                                        gpmall                                                       252
repolist: 252
```

（5）使用yum命令安装Java环境并验证，命令和结果如下所示。

```shell
[root@mall ~]# yum -y install java-1.8.0-openjdk java-1.8.0-openjdk-devel 
...
Dependency Updated:
  freetype.x86_64 0:2.8-14.el7_9.1                                 glib2.x86_64 0:2.56.1-9.el7_9                                

Complete! 
[root@mall ~]# java -version
openjdk version "1.8.0_292"
OpenJDK Runtime Environment (build 1.8.0_292-b10)
OpenJDK 64-Bit Server VM (build 25.292-b10, mixed mode)
```

（6）使用yum命令安装Redis服务

```shell
[root@mall ~]# yum install redis -y
...
Installed:
  redis.x86_64 0:3.2.12-2.el7                                                                                                    
Dependency Installed:
  jemalloc.x86_64 0:3.6.0-1.el7                                                                                                  
Complete!
```

修改Redis配置文件，编辑/etc/redis.conf文件。将bind 127.0.0.1这一行改为 bind 0.0.0.0；将protected-mode yes 改为如下：

```shell
[root@mall ~]# vi /etc/redis.conf
bind 0.0.0.0
protected-mode no     //修改完成按esc键,输入:wq回车
[root@mall ~]# systemctl start redis && systemctl enable redis
Created symlink from /etc/systemd/system/multi-user.target.wants/redis.service to /usr/lib/systemd/system/redis.service.
```

#### 2.2 数据库服务安装配置

启动数据库并配置，修改数据库配置文件并启动MariaDB数据库，设置root用户密码为123456，并创建gpmall数据库，将提供的单节点的商城部署文件gpmall-single/中的gpmall.sql导入。

（1）使用yum命令安装MariaDB数据库服务，修改数据库配置文件并启动MariaDB数据库服务。命令如下所示。

```shell
[root@mall ~]# yum install mariadb mariadb-server -y
...
Installed:
  MariaDB-client.x86_64 0:10.3.30-1.el7.centos                    MariaDB-compat.x86_64 0:10.3.30-1.el7.centos                   
  MariaDB-server.x86_64 0:10.3.30-1.el7.centos                   

...                         

Replaced:
  mariadb-libs.x86_64 1:5.5.56-2.el7                                                                                             

Complete!
```

（2）启动MariaDB数据库服务。命令如下所示。

```shell
[root@mall ~]# systemctl start mariadb && systemctl enable mariadb
Created symlink from /etc/systemd/system/mysql.service to /usr/lib/systemd/system/mariadb.service.
Created symlink from /etc/systemd/system/mysqld.service to /usr/lib/systemd/system/mariadb.service.
Created symlink from /etc/systemd/system/multi-user.target.wants/mariadb.service to /usr/lib/systemd/system/mariadb.service.
```

（3）初始化设置数据库root用户密码为123456。命令如下所示。

```shell
[root@mall ~]# mysqladmin -u root password "123456"
```

（4）登录数据库设置root用户访问数据库权限，并创建gpmall数据库，再将位于/opt/cloud_webapp/gpmall-single/目录下提供的单节点商城应用数据库脚本gpmall.sql导入到gpmall数据库。命令如下所示。

```shell
[root@mall ~]# mysql -uroot -p123456
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 9
Server version: 10.3.30-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [gpmall]> grant all privileges on *.* to root@"mall" identified by '123456';         
Query OK, 0 rows affected (0.01 sec)

MariaDB [(none)]> create database gpmall;
Query OK, 1 row affected (0.01 sec)

MariaDB [(none)]> use gpmall;
Database changed
MariaDB [gpmall]> source /opt/cloud_webapp/gpmall-single/gpmall.sql
...
MariaDB [gpmall]> exit
Bye
```

------

#### 2.3 Zookeeper服务配置

（1）将cloud_webapp中提供的zookeeper-3.4.14.tar.gz软件包解压，根据zookeeper的模板配置文件zoo_sample.cfg生成正式的服务配置文件zoo.cfg，命令和结果如下所示。

```shell
[root@mall ~]# tar -zxvf /opt/cloud_webapp/zookeeper-3.4.14.tar.gz
[root@mall ~]# cd /root/zookeeper-3.4.14/conf/
[root@mall conf]# cp zoo_sample.cfg zoo.cfg
```

（2）进入到zookeeper-3.4.14/bin目录下，启动ZooKeeper服务，并使用命令验证其状态信息为standalone即为正常，命令和结果如下所示。

```shell
[root@mall conf]# cd /root/zookeeper-3.4.14/bin 
[root@mall bin]# ./zkServer.sh start
ZooKeeper JMX enabled by default
Using config: /root/zookeeper-3.4.14/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
[root@mall bin]# ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /root/zookeeper-3.4.14/bin/../conf/zoo.cfg
Mode: standalone
```

------

#### 2.4 Kafka服务配置

（1）将cloud_webapp中提供的kafka_2.11-1.1.1.tgz软件包解压，修改Kafka配置文件，命令和结果如下所示。

```shell
[root@mall bin]# cd
[root@mall ~]# tar -zxvf /opt/cloud_webapp/kafka_2.11-1.1.1.tgz
[root@mall ~]# cd /root/kafka_2.11-1.1.1/config/
[root@mall config]# vi server.properties
broker.id=1
listeners=PLAINTEXT://172.24.24.12:9092      //注意：此行需要去掉注释，输入实际分配的mall节点IP地址
```

修改完成后按ESC键，输入 `:wq`，再按回车键保存退出。

（2）进入到kafka_2.11-1.1.1/bin目录下启动Kafka服务，使用jps命令查看Kafka是否成功启动，命令和结果如下所示。

```shell
[root@mall config]# cd /root/kafka_2.11-1.1.1/bin/
[root@mall bin]# ./kafka-server-start.sh -daemon ../config/server.properties
[root@mall bin]# jps
6039 Kafka
1722 QuorumPeerMain
6126 Jps
```

------

#### 2.5 Nginx服务配置

（1）使用yum命令安装nginx服务，安装完成后开启服务并设置开机自启。命令如下所示。

```shell
[root@mall bin]# cd
[root@mall ~]# yum install nginx -y
...
Installed:
  nginx.x86_64 1:1.20.1-2.el7                                                                                                    

Dependency Installed:
  centos-indexhtml.noarch 0:7-9.el7.centos   centos-logos.noarch 0:70.0.6-3.el7.centos   gperftools-libs.x86_64 0:2.6.1-1.el7  
  nginx-filesystem.noarch 1:1.20.1-2.el7     openssl11-libs.x86_64 1:1.1.1g-3.el7       

Complete!
[root@mall ~]# systemctl start nginx && systemctl enable nginx
Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /usr/lib/systemd/system/nginx.service.
```

（2）编辑nginx的配置文件信息，配置nginx访问本地环境的8081和8082端口，其中8081端口指向shopping商城服务，8082端口指向user用户服务。命令和文件内容如下所示。

```shell
[root@mall ~]# vi /etc/nginx/conf.d/default.conf
server {
    listen       80;
    server_name  localhost;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    location  /user {
        proxy_pass http://127.0.0.1:8082;
    }
    location  /shopping {
        proxy_pass http://127.0.0.1:8081;
    }
}
```

修改完成后按ESC键，输入 `:wq`，再按回车键保存退出。

（3）使用nginx命令检查配置文件格式有没有错误，确认格式正确后重启nginx服务，命令和结果如下所示。

```shell
[root@mall ~]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
[root@mall ~]# systemctl restart nginx
```

------

#### 2.6 部署GPMALL

（1）上传前端代码，将单节点商城服务文件夹gpmall-single/中提供的disk/目录所有文件内容复制到nginx的默认项目路径下。命令如下所示。

```shell
[root@mall ~]# mv /usr/share/nginx/html/* /home/
[root@mall ~]# cp -rfv /opt/cloud_webapp/gpmall-single/dist/*   /usr/share/nginx/html/
```

（2）将单节点商城服务文件夹gpmall-single/中的提供的4个jar包复制到/root目录下，使用jar命令启动该软件包并设置后天启动，启动命令如下。

```shell
[root@mall ~]# cp -rfv /opt/cloud_webapp/gpmall-single/*.jar /root/
[root@mall ~]# nohup java -jar shopping-provider-0.0.1-SNAPSHOT.jar &
[1] 15811
[root@mall ~]# nohup java -jar user-provider-0.0.1-SNAPSHOT.jar &    
[2] 15855
[root@mall ~]# nohup java -jar gpmall-shopping-0.0.1-SNAPSHOT.jar &
[3] 15885
[root@mall ~]# nohup java -jar gpmall-user-0.0.1-SNAPSHOT.jar &    
[4] 15917
```

（3）分别使用jps和netstat命令查询商城服务是否正常启动。jps命令和结果如下所示。netstat结果如图2-1所示。

```shell
[root@mall ~]# jps
15251 QuorumPeerMain
15811 jar
16026 Jps
15885 jar
15917 jar
15566 Kafka
15855 jar
[root@mall ~]# netstat -ntpl
```

![图21.png](http://172.30.26.10:31003/dxw-resources-release/resource_13-1000-20240907005110122-ES6Jp/wKggBmHvqEiAd5bWAADPtffkvdo697.png?response-content-type=application/octet-stream&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIDiMsDMRoq479/20251122/us-east-1/s3/aws4_request&X-Amz-Date=20251122T005303Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=e77cca55fee99a3ce704969b61e5f031b56a53e6cbbd5d9c437f956d96bbd046)

图2-1 端口开放进程显示

（4）切换到centos-desktop-base桌面虚拟机环境，打开浏览器，在地址栏中输入http://172.24.24.12（注意：改为实际分配的mall节点地址）访问界面，可以查看GPMALL服务已经部署完成，访问结果如图2-2所示。

![图22.png](http://172.30.26.10:31003/dxw-resources-release/resource_13-1000-20240907005110122-ES6Jp/wKggBmHvqFCAIbbJAAnWt63HUZw763.png?response-content-type=application/octet-stream&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIDiMsDMRoq479/20251122/us-east-1/s3/aws4_request&X-Amz-Date=20251122T005303Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=23108d1fb128c1156e95ece69b6a00610d85fdae7e1e38361184662aaf8f381d)

图2-2 商城访问结果