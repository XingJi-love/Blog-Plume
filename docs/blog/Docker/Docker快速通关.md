---
title: Docker | Docker快速通关
tags:
    - Docker
createTime: 2026/03/19 13:47:00
permalink: /blog/zxyuk39w/
cover: ./Docker.jpg
---

![Docker快速通关](./Docker.jpg)

## Docker基础

![Docker快速通关](./Docker快速通关/img-1.jpg)

### docker架构

![Docker快速通关](./Docker快速通关/img-2.jpg)





### 容器化

![Docker快速通关](./Docker快速通关/img-3.jpg)



### 安装

+ 官方文档: https://docs.docker.com/engine/install/centos/

```shell
# 移除旧版本docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \                   
                  docker-logrotate \
                  docker-engine
                  
# 配置docker yum源。
sudo yum install -y yum-utils
sudo yum-config-manager \
--add-repo \ http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装 最新 docker
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-pl ugin docker-compose-plugin

# 启动& 开机启动docker； enable + start 二合一systemctl enable docker --now
# 配置加速
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com"] }
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

![Docker快速通关](./Docker快速通关/img-6.jpg)





## Docker命令

```shell
#运行一个新容器
docker run nginx
#停止容器
docker stop keen_blackwell
#启动容器
docker start 592
#重启容器
docker restart 592
#查看容器资源占用情况
docker stats 592
#查看容器日志
docker logs 592
#删除指定容器
docker rm 592
#强制删除指定容器
docker rm -f 592
# 后台启动容器
docker run -d --name mynginx nginx
# 后台启动并暴露端口
docker run -d --name mynginx -p 80:80 nginx # 进入容器内部
docker exec -it mynginx /bin/bash
# 提交容器变化打成一个新的镜像
docker commit -m "update index.html" mynginx mynginx:v1.0 # 保存镜像为指定文件
docker save -o mynginx.tar mynginx:v1.0
# 删除多个镜像
docker rmi bde7d154a67f 94543a6c1aef e784f4560448
# 加载镜像
docker load -i mynginx.tar
# 登录 docker hub
docker login
# 重新给镜像打标签
docker tag mynginx:v1.0 leifengyang/mynginx:v1.0 # 推送镜像
docker push leifengyang/mynginx:v1.0
```

![Docker快速通关](./Docker快速通关/img-4.jpg)

### 下载镜像

```shell
#查看运行中的容器
docker ps

#查看所有容器
docker ps -a

#搜索镜像
docker search nginx

#下载镜像
docker pull nginx

#下载指定版本镜像
docker pull nginx:1.26.0 #查看所有镜像
docker images

#删除指定id的镜像
docker rmi e784f4560448
```

![Docker快速通关](./Docker快速通关/img-5.jpg)

#### 检索镜像

![Docker快速通关](./Docker快速通关/img-7.jpg)

#### 下载镜像

![Docker快速通关](./Docker快速通关/img-8.jpg)

::: tip 

+ **下载指定版本的镜像：https://hub.docker.com/**

![Docker快速通关](./Docker快速通关/img-10.jpg)

![Docker快速通关](./Docker快速通关/img-11.jpg)

![Docker快速通关](./Docker快速通关/img-12.jpg)

:::



#### 列出镜像

![Docker快速通关](./Docker快速通关/img-9.jpg) 



#### 删除镜像

![Docker快速通关](./Docker快速通关/img-13.jpg)

![Docker快速通关](./Docker快速通关/img-14.jpg)



### 启动容器

![Docker快速通关](./Docker快速通关/img-15.jpg)



#### 运行容器

![Docker快速通关](./Docker快速通关/img-16.jpg)

![Docker快速通关](./Docker快速通关/img-17.jpg)

::: tip

+ **run细节**

![Docker快速通关](./Docker快速通关/img-27.jpg)

> **成功访问nginx默认页面**

![Docker快速通关](./Docker快速通关/img-28.jpg)

![Docker快速通关](./Docker快速通关/img-29.jpg)

:::



#### 查看容器(运行中容器)

![Docker快速通关](./Docker快速通关/img-18.jpg)

::: tip

+ **查看停止运行的容器**

![Docker快速通关](./Docker快速通关/img-19.jpg)

:::



#### 启动与停止镜像

![Docker快速通关](./Docker快速通关/img-20.jpg)



#### 重启镜像

![Docker快速通关](./Docker快速通关/img-21.jpg)



#### 查看容器状态

![Docker快速通关](./Docker快速通关/img-22.jpg)

![Docker快速通关](./Docker快速通关/img-23.jpg)



#### 查看容器日志

![Docker快速通关](./Docker快速通关/img-24.jpg)



#### 删除容器

![Docker快速通关](./Docker快速通关/img-25.jpg)

![Docker快速通关](./Docker快速通关/img-26.jpg)



### 修改页面

![Docker快速通关](./Docker快速通关/img-30.jpg)



#### 进入容器

![Docker快速通关](./Docker快速通关/img-31.jpg)

![Docker快速通关](./Docker快速通关/img-32.jpg)





### 保存镜像

![Docker快速通关](./Docker快速通关/img-33.jpg)











## Docker存储





## Docker网络





## Docker Compose



## Dockerfile



