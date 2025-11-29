---
sidebar_position: 3
slug: /docs/study/redis
title: redis容器技术
---

**题目1:** 使用提供的OpenStack私有云平台，申请三台CentOS7.9系统的云主机，使用提供的http源，在三个节点自行安装Redis服务并启动，配置Redis的访问需要密码，密码设置为123456。然后将这三个Redis节点配置为Redis的一主二从三哨兵架构，即一个Redis主节点，两个从节点，三个节点均为哨兵节点
#### 1. Redis哨兵模式服务介绍

（1）哨兵模式概述

在说哨兵之前，先说下主从复制，Redis的主从复制模式，一旦主节点出现故障无法提供服务，需要人工介入手工将从节点调整为主节点，同时应用端还需要修改新的主节点地址。这种故障转移的方式对于很多应用场景是不能容忍的。正式由于这个问题，Redis提供了Sentinel（哨兵）架构来解决这个问题。

Redis Sentinel是一个分布式的架构，它本身也是一个独立的Redis节点，但是它不存储数据，只支持部分命令，它能够自动完成故障发现和故障转移，并通知应用方，从而实现高可用。

Redis Sentinel 包含若干个Sentinel节点和Redis数据节点，每个Sentinel节点会对数据节点和其他Sentinel节点进行监控。当发现节点异常时，会对节点做下线标识，如果被标识的是主节点，此时会与其他Sentinel节点进行协商，当大多数Sentinel节点都认为主节点不可达时候，会发起选举，选出一个 Sentinel 节点来完成自动故障转移的工作，同时会将这个变化通知给Redis的应用方。这个过程是完全自动化的，无需人工干预。

（2）哨兵模式主要功能

Sentinel 主要提供以下几个功能：

- 监控：定期检测Redis数据节点、其他Sentinel节点是否可达。
- 通知：将故障转移的结果通知给应用方。
- 主节点故障转移：实现从节点晋升为主节点，并维护后续正确的主从关系。
- 配置提供者：客户端在初始化的时候连接Sentinel节点集合，从中获取主节点信息。

多个Sentinel节点来共同判断故障，可以有效防止误判，同时如果个别Sentinel节点不可用，整个Sentinel节点集合依然是高可用的。

（3）哨兵模式工作流程

Sentinel是Redis的高可用性解决方案：

由一个或多个Sentinel实例组成的Sentinel系统可以监视任意多个主服务器，以及所有从服务器，并在被监视的主服务器进入下线状态时，自动将下线主服务器属下的某个从服务器升级为新的主服务器，然后由新的主服务器代替已下线的主服务器继续处理命令请求。

Sentinel负责监控集群中的所有主、从Redis，当发现主故障时，Sentinel会在所有的从中选一个成为新的主。并且会把其余的从变为新主的从。同时那台有问题的旧主也会变为新主的从，即当旧的主即使恢复时，并不会恢复原来的主身份，而是作为新主的一个从。

在Redis高可用架构中，Sentinel往往不是只有一个，而是有三个或者以上。目的是为了让其更加可靠，毕竟主和从切换角色这个过程还是蛮复杂的。

 

#### 2. Redis哨兵模式服务案例实现

（1）一主二从Redis集群部署

使用SSH工具连接三个虚拟机节点修改主机名。命令如下所示：

redis1主节点：

```shell
[root@localhost ~]# hostnamectl set-hostname redis1
```

redis2从节点：

```shell
[root@localhost ~]# hostnamectl set-hostname redis2
```

redis3从节点：

```shell
[root@localhost ~]# hostnamectl set-hostname redis3
```

修改主机名完成后，需要重新连接主机。

将提供的Redis安装文件下载redis-3.2.12.tar.gz到三台虚拟机中，解压到/opt目录中，并配置yum源使用本地目录，命令如下（三台虚拟机操作一致，以redis1主机为例）：

```shell
[root@redis1 ~]# curl -O http://mirrors.54mc.cn/competition/redis-3.2.12.tar.gz
[root@redis1 ~]# tar -xf redis-3.2.12.tar.gz -C /opt/
[root@redis1 ~]# mv /etc/yum.repos.d/* /media/
[root@redis1 ~]# cat << EOF >> /etc/yum.repos.d/redis.repo
[redis]
name=redis
baseurl=file:///opt/redis
gpgcheck=0
enabled=1
EOF
[root@redis1 ~]# yum clean all && yum repolist
```

在三个节点使用yum命令安装Redis服务并启动。命令如下（三台虚拟机操作一致，以redis1主机为例）：

```shell
[root@redis1 ~]# yum install -y redis 
… …
Complete!
[root@redis1 ~]# systemctl start redis
[root@redis1 ~]# systemctl enable redis
```

按照主从Redis配置，将redis2节点和redis3节点作为redis1节点的从节点。配置完成后的一主二从Redis集群将作为哨兵模式的基础。命令如下：

redis1节点：

修改redis1节点的配置文件/etc/redis.conf如下：

```shell
[root@redis1 ~]# vi /etc/redis.conf
#第一处修改
bind 0.0.0.0                    //找到bind 127.0.0.1这行并修改为0.0.0.0
#第二处修改
protected-mode no                //将yes修改为no，外部网络可以访问
#第三处修改
daemonize yes                       //将no修改为yes，开启守护进程
#第四处修改
requirepass "123456"                   //添加设置访问密码
#第五处修改，设定主库密码与当前库密码同步，保证从库能够提升为主库
masterauth "123456"
#第六处修改，将no修改为yes，打开AOF持久化支持
appendonly yes
```

至此，redis1主节点配置完毕，重启服务，命令如下：

```shell
[root@redis1 ~]# systemctl restart redis
```

redis2节点：

修改redis2节点的配置文件/etc/redis.conf如下：

```shell
[root@redis2 ~]# vi /etc/redis.conf
#第一处修改
bind 0.0.0.0                    //找到bind 127.0.0.1这行并修改为0.0.0.0
#第二处修改
protected-mode no                    //将yes修改为no，外部网络可以访问
#第三处修改
daemonize yes                       //将no修改为yes，开启守护进程
#第四处修改
# requirepass foobared                 //找到该行
requirepass "123456"                   //在下方添加设置访问密码
#第五处修改
# slaveof <masterip> <masterport>       //找到该行
slaveof 192.168.200.21 6379          //在下方添加访问的主节点IP与端口
#第六处修改
# masterauth <master-password>        //找到该行
masterauth "123456"                   //在下方添加访问主节点密码
#第七处修改，将no修改为yes，打开AOF持久化支持
appendonly yes
```

至此，redis2主节点配置完毕，重启服务，命令如下：

```shell
[root@redis2 ~]# systemctl restart redis
```

配置redis3节点：

修改redis3节点的配置文件/etc/redis.conf如下：

```shell
[root@redis3 ~]# vi /etc/redis.conf
#第一处修改
bind 0.0.0.0                    //找到bind 127.0.0.1这行并修改为0.0.0.0
#第二处修改
protected-mode no                    //将yes修改为no，外部网络可以访问
#第三处修改
daemonize yes                       //将no修改为yes，开启守护进程
#第四处修改
# requirepass foobared                 //找到该行
requirepass "123456"                   //在下方添加设置访问密码
#第五处修改
# slaveof <masterip> <masterport>       //找到该行
slaveof 192.168.200.21 6379          //在下方添加访问的主节点IP与端口
#第六处修改
# masterauth <master-password>        //找到该行
masterauth "123456"                   //在下方添加访问主节点密码
#第七处修改，将no修改为yes，打开AOF持久化支持
appendonly yes
```

至此，redis3主节点配置完毕，重启服务，命令如下：

```shell
[root@redis3 ~]# systemctl restart redis
```

这样一主二从Redis集群部署就完成了，一主二从Redis集群部署完成后，现在在每个节点查询节点redis服务信息如下所示：

redis1主节点：

```shell
[root@redis1 ~]# redis-cli -h 192.168.200.21 -p 6379 -a 123456 info replication
# Replication
role:master
connected_slaves:2
slave0:ip=192.168.200.22,port=6379,state=online,offset=9383,lag=0
slave1:ip=192.168.200.23,port=6379,state=online,offset=9238,lag=1
master_repl_offset:9383
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:2
repl_backlog_histlen:9382
```

redis2从节点：

```shell
[root@redis2 ~]# redis-cli -h 192.168.200.22 -p 6379 -a 123456 info replication
# Replication
role:slave
master_host:192.168.200.21
master_port:6379
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_repl_offset:2648
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

redis3从节点：

```shell
[root@redis3 ~]# redis-cli -h 192.168.200.23 -p 6379 -a 123456 info replication
# Replication
role:slave
master_host:192.168.200.21
master_port:6379
master_link_status:up
master_last_io_seconds_ago:0
master_sync_in_progress:0
slave_repl_offset:8658
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

（2）Redis哨兵模式配置 

修改一主二从redis集群各节点的配置文件，完成redis哨兵模式的配置。

redis1节点：

修改redis1节点的/etc/redis-sentinel.conf配置文件，具体内容如下：

```shell
[root@redis1 ~]# vi /etc/redis-sentinel.conf 
# 1. 保护模式修改为否，允许远程连接
protected-mode no
# 2. 修改监控地址，为主redis库的主机ip地址
sentinel monitor mymaster 192.168.200.21 6379 2
# 3. 添加配置5秒内没有响应，就反馈服务器挂了
sentinel down-after-milliseconds mymaster 5000
# 4. 修改配置15秒内master没有活起来，就重新选举主
sentinel failover-timeout mymaster 15000
# 5. 表示如果master重新选出来后，其它slave节点能同时并行从新master同步缓存的台数有多少个，显然该值越大，所有slave节点完成同步切换的整体速度越快，但如果此时正好有人在访问这些slave，可能造成读取失败，影响面会更广。最安全的设置为1，只同一时间，只能有一台干这件事，这样其它slave还能继续服务，但是所有slave全部完成缓存更新同步的进程将变慢。这里设置为2。
sentinel parallel-syncs mymaster 2
# 6. 添加配置主数据库密码为123456
sentinel auth-pass mymaster 123456
```

修改redis2从节点和redis3从节点的/etc/redis-sentinel.conf配置文件，修改内容与redis1主节点的/etc/redis-sentinel.conf配置文件一致。

修改完配置文件后，哨兵模式配置就完毕了，接下来需要重启服务。因为Redis服务已经启动，现在只需要启动Redis哨兵服务。命令如下所示：

所有节点启动哨兵：

```shell
# systemctl restart redis-sentinel
# systemctl enable redis-sentinel
```

 

（3）哨兵模式信息查看

在redis1节点，查看哨兵模式信息，命令如下：

```shell
[root@redis1 ~]# redis-cli -h 192.168.200.21 -p 26379 INFO Sentinel
# Sentinel
sentinel_masters:1
sentinel_tilt:0
sentinel_running_scripts:0
sentinel_scripts_queue_length:0
sentinel_simulate_failure_flags:0
master0:name=mymaster,status=ok,address=192.168.200.21:6379,slaves=2,sentinels=3
```

在redis2节点，查看哨兵模式信息，命令如下：

```shell
[root@redis2 ~]# redis-cli -h 192.168.200.22 -p 26379 INFO Sentinel
# Sentinel
sentinel_masters:1
sentinel_tilt:0
sentinel_running_scripts:0
sentinel_scripts_queue_length:0
sentinel_simulate_failure_flags:0
master0:name=mymaster,status=ok,address=192.168.200.21:6379,slaves=2,sentinels=3
```

在redis3节点，查看哨兵模式信息，命令如下：

```shell
[root@redis3 ~]# redis-cli -h 192.168.200.23 -p 26379 INFO Sentinel
# Sentinel
sentinel_masters:1
sentinel_tilt:0
sentinel_running_scripts:0
sentinel_scripts_queue_length:0
sentinel_simulate_failure_flags:0
master0:name=mymaster,status=ok,address=192.168.200.21:6379,slaves=2,sentinels=3
```

可以看到目前集群中有一个Redis主节点，两个Redis从节点，三个哨兵节点。

（4）哨兵模式验证

哨兵作为对Redis实例的监控，通过选举算法保证哨兵的鲁棒性和高可用，所以哨兵至少要部署3台，符合半数原则，需要5或者7，超过一半，不包含一半存活的时候，才能够选举出leader，才能进行主从的切换功能。

哨兵高可用测试：分别连接对应的Redis服务端，手动停止主Reids服务，看主从是否切换成功。

redis1节点，手动停止服务，然后查看主节点是否切换，命令如下：

```SHELL
[root@redis1 ~]# systemctl stop redis
```

切换到redis2节点，查看Redis集群的主从信息（访问reids2节点的Redis服务），命令如下（redis主节点随机切换到从节点）：

```SHELL
[root@redis2 ~]# redis-cli -h 192.168.200.22 -p 6379 -a 123456 info replication
# Replication
role:slave
master_host:192.168.200.23
master_port:6379
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_repl_offset:6591
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

可以看到，redis2节点的master_host变成了192.168.200.23，也就是说redis3节点变成了主节点。

然后切换到redis3节点，查看Redis集群的主从信息（访问reids3节点的Redis服务），命令如下：

```shell
[root@redis3 ~]# redis-cli -h 192.168.200.23 -p 6379 -a 123456 info replication
# Replication
role:master
connected_slaves:1
slave0:ip=192.168.200.22,port=6379,state=online,offset=7461,lag=0
master_repl_offset:7461
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:2
repl_backlog_histlen:7460
```

redis3节点成功切换成了主节点。可以看到，当主节点发生了宕机，其他的从节点可以自动切换成主节点。

切换到redis1节点，启动恢复Redis服务，查看redis集群的主从信息（访问reids1节点的Redis服务），命令如下：

```shell
[root@redis1 ~]# systemctl restart redis
[root@redis1 ~]# systemctl restart redis-sentinel
[root@redis1 ~]# redis-cli -h 192.168.200.21 -p 6379 -a 123456 info replication
# Replication
role:slave
master_host:192.168.200.23
master_port:6379
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_repl_offset:103524
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

可以看见redis1节点变成了从节点。Redis哨兵模式的验证成功。

**题目2：**
Redis AOF调优
修改在Redis相关配置，避免AOF文件过大，Redis会进行AOF重写

```shell
[root@localhost ~]# hostnamectl set-hostname redis
[root@redis ~]# curl -O http://mirrors.54mc.cn/competition/redis-3.2.12.tar.gz
[root@redis ~]# tar -xf redis-3.2.12.tar.gz -C /opt/
[root@redis ~]# mv /etc/yum.repos.d/* /media/
[root@redis ~]# cat << EOF >> /etc/yum.repos.d/redis.repo
[redis]
name=redis
baseurl=file:///opt/redis
gpgcheck=0
enabled=1
EOF
[root@redis ~]# yum clean all && yum repolist
[root@redis ~]# yum install -y redis
[root@redis ~]# vi /etc/redis.conf
#第一处修改
bind 0.0.0.0                    //找到bind 127.0.0.1这行并修改为0.0.0.0
#第二处修改
protected-mode no                //将yes修改为no，外部网络可以访问
#第三处修改
daemonize yes                       //将no修改为yes，开启守护进程
#第四处修改
requirepass "123456"                   //添加设置访问密码
#第五处修改，设定主库密码与当前库密码同步，保证从库能够提升为主库
masterauth "123456"
#第六处修改，将no修改为yes，打开AOF持久化支持
appendonly yes
auto-aof-rewrite-percentage 0
```

**题目3**
使用上一题安装的Redis 服务。在 Redis 中，AOF 配置为以三种不同的方式在磁盘上执行 write 或者 fsync。假设当前 Redis 压力过大，请配置 Redis 不执行 fsync。除此之外，避免AOF 文件过大，Redis 会进行 AOF 重写，生成缩小的 AOF 文件。请修改配置，让AOF 重写时，不进行fsync操作。配置完成后提交 Redis 节点的用户名、密码和IP地址到答题框。

```bash
aof-rewrite_incremental-fsync no
no-appendfsync-on-rewrite yes
```

