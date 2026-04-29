---
title: Redis | Redis集群
tags:
    - Redis
createTime: 2026/04/29
permalink: /blog/redis-cluster/
cover: ./Redis.jpg
---

![Redis集群](./Redis.jpg)

## 1. 集群概述

### 1.1 为什么需要集群

::: tip

> 单台 Redis 服务器存在以下问题：<br><br>
> 1. **容量瓶颈**：内存有限，无法存储海量数据<br>
> 2. **性能瓶颈**：单节点处理能力有限<br>
> 3. **可用性**：单机故障导致服务不可用

:::

### 1.2 Redis 集群模式

| 模式 | 特点 | 适用场景 |
| ---- | ---- | -------- |
| **主从复制** | 主节点写，从节点读 | 读写分离 |
| **哨兵模式** | 自动故障转移 | 高可用 |
| **_cluster 集群** | 数据分片 | 海量数据 |

## 2. 主从复制

### 2.1 什么是主从复制

主从复制是指将主节点的数据同步到从节点，实现数据的备份和读写分离。

### 2.2 配置主从关系

#### （1）方式一：配置文件配置

在从节点配置文件中添加：

```bash
# 配置主节点
replicaof 192.168.1.100 6379

# 如果主节点需要密码
masterauth <password>
```

#### （2）方式二：命令配置

```bash
# 在从节点执行
REPLICAOF 192.168.1.100 6379

# 取消从节点配置
REPLICAOF NO ONE
```

#### （3）方式三：启动参数

```bash
redis-server --replicaof 192.168.1.100 6379
```

### 2.3 主从复制原理

::: tip

**复制流程：**

1. **连接阶段**：从节点连接主节点，建立 socket 连接
2. **同步阶段**：主节点执行 BGSAVE 生成 RDB 文件，发送给从节点
3. **命令传播**：主节点将后续写命令同步给从节点

:::

### 2.4 常见问题

| 问题 | 原因 | 解决方案 |
| ---- | ---- | -------- |
| 从节点读取数据慢 | 网络延迟 | 优化网络 |
| 数据不同步 |复制积压缓冲区不足 | 调大 `client-output-buffer-limit` |
| 从节点过多 | 主节点压力大 | 链式复制或增加层级 |

## 3. 哨兵模式

### 3.1 什么是哨兵

Redis 哨兵（Sentinel）是 Redis 的**高可用解决方案**，可以监控主从节点，自动进行故障转移。

### 3.2 哨兵功能

::: tip

> 1. **监控**：监控主节点和从节点是否正常运行<br>
> 2. **通知**：当故障发生时通知管理员<br>
> 3. **自动故障转移**：主节点故障时，自动选举从节点升级为主节点<br>
> 4. **配置提供者**：提供当前主节点地址

:::

### 3.3 哨兵集群配置

#### （1）创建哨兵配置文件

创建 `sentinel.conf`：

```bash
# 端口
port 26379

# 绑定地址
bind 0.0.0.0

# 守护进程模式
daemonize yes

# 日志文件
logfile "sentinel.log"

# 工作目录
dir /tmp

# 监控主节点
# sentinel monitor <主节点名> <ip> <端口> <票数>
sentinel monitor mymaster 192.168.1.100 6379 2

# 主节点密码（如有）
sentinel auth-pass mymaster <password>

# 故障转移超时时间
sentinel down-after-milliseconds mymaster 30000

# 同时进行故障转移的从节点数
parallel-syncs 1

# 故障转移超时时间
failover-timeout 180000
```

#### （2）启动哨兵

```bash
redis-sentinel /path/to/sentinel.conf
# 或者
redis-server /path/to/sentinel.conf --sentinel
```

#### （3）查看哨兵信息

```bash
redis-cli -p 26379 INFO
```

### 3.4 故障转移原理

::: tip

**故障转移流程：**

1. **发现故障**：哨兵发现主节点不可用（ping 超时）
2. **选举领头**：多个哨兵协商，选举一个领头哨兵
3. **选举新主**：领头哨兵从从节点中选举一个作为新主节点
4. **更新配置**：其他从节点指向新主节点
5. **��知客户端**：通知客户端新主节点地址

:::

## 4. Cluster 集群

### 4.1 什么是 Cluster

Redis Cluster 是 Redis 官方提供的**分布式集群方案**，采用数据分片（slot）来实现数据的分布存储。

### 4.2 集群原理

::: tip

> Redis Cluster 将数据划分为 **16384 个槽（slot）**，每个节点负责一部分槽的数据。<br>
> 当客户端访问时，根据 key 的 hash 值计算槽编号，找到对应的节点。<br>
> 节点之间通过 Gossip 协议进行通信。

:::

### 4.3 槽分配示例

```
集群节点：
- 192.168.1.101:6379 → 槽 0-5460
- 192.168.1.102:6379 → 槽 5461-10922
- 192.168.1.103:6379 → 槽 10923-16383
```

### 4.4 创建集群

#### （1）启动节点

分别启动多个 Redis 实例：

```bash
redis-server --port 6379 --cluster-enabled yes --cluster-config-file nodes-6379.conf
```

#### （2）创建集群

```bash
redis-cli --cluster create 192.168.1.101:6379 192.168.1.102:6379 192.168.1.103:6379 --cluster-replicas 0
```

参数说明：

- `--cluster-replicas 1`：每个主节点配置一个从节点

#### （3）查看集群状态

```bash
redis-cli -c -p 6379 CLUSTER NODES
```

### 4.5 集群操作

```bash
# 查看槽信息
redis-cli -c -p 6379 CLUSTER SLOTS

# 手动分配槽
redis-cli -c -p 6379 CLUSTER ADDSLOTS 0 1 2 3

# 查看集群节点
redis-cli -c -p 6379 CLUSTER NODES

# 修复集群
redis-cli -c --cluster fix
```

### 4.6 集群查询命令

```bash
# key 所在的槽
CLUSTER KEYSLOT <key>

# 槽所在节点
CLUSTER SLOT-STATE <slot>
```

## 5. 集群模式对比

| 特性 | 主从复制 | 哨兵模式 | Cluster 集群 |
| ---- | -------- | -------- | ------------ |
| **高可用** | 从节点备份 | 自动故障转移 | 自动故障转移 |
| **读写分离** | 支持 | 支持 | 各节点独立 |
| **水平扩展** | 需要改架构 | 需要改架构 | 支持 |
| **数据分片** | 不支持 | 不支持 | 支持 |
| **复杂度** | 低 | 中 | 高 |
| **节点数** | 2+N | 3+N | 6+ |

### 5.1 如何选择

::: tip

**选择建议：**

1. **小规模应用**：主从复制 + 哨兵模式
2. **大规模应用**：Cluster 集群
3. **关键业务**：多级架构（Cluster + 哨兵）

:::