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
  "registry-mirrors": [
    "https://docker.1panel.live",
    "https://docker.hlmirror.com",
    "https://docker.apiba.cn",
    "https://docker.1ms.run",
    "https://5pox5fr3.mirror.aliyuncs.com"
    ] 
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

![Docker快速通关](./Docker快速通关/img-6.jpg)





## Docker命令

+ **官方命令: https://docs.docker.com/reference/cli/docker/**

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
docker pull nginx:1.26.0 

#查看所有镜像
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
```

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

```shell
# 后台启动容器
docker run -d --name mynginx nginx

# 后台启动并暴露端口
docker run -d --name mynginx -p 80:80 nginx 

# 进入容器内部
docker exec -it mynginx /bin/bash
```

![Docker快速通关](./Docker快速通关/img-30.jpg)



#### 进入容器

![Docker快速通关](./Docker快速通关/img-31.jpg)

![Docker快速通关](./Docker快速通关/img-32.jpg)





### 保存镜像

```shell
# 提交容器变化打成一个新的镜像
docker commit -m "update index.html" mynginx mynginx:v1.0 

# 保存镜像为指定文件
docker save -o mynginx.tar mynginx:v1.0

# 删除多个镜像
docker rmi bde7d154a67f 94543a6c1aef e784f4560448

# 加载镜像
docker load -i mynginx.tar
```

+ **提交**

![Docker快速通关](./Docker快速通关/img-33.jpg)

+ **保存**

![Docker快速通关](./Docker快速通关/img-34.jpg)

![Docker快速通关](./Docker快速通关/img-35.jpg)

+ **加载**

![Docker快速通关](./Docker快速通关/img-36.jpg)



### 分享社区

```shell
# 登录 docker hub
docker login

# 重新给镜像打标签
docker tag mynginx:v1.0 leifengyang/mynginx:v1.0 

# 推送镜像
docker push leifengyang/mynginx:v1.0
```

+ **登录docker hub**

![Docker快速通关](./Docker快速通关/img-37.jpg)

+ **重新给镜像打标签**

![Docker快速通关](./Docker快速通关/img-38.jpg)

+ **推送镜像**

![Docker快速通关](./Docker快速通关/img-39.jpg)

+ **可以在docker hub中搜索到推送的镜像**

![Docker快速通关](./Docker快速通关/img-40.jpg)

![Docker快速通关](./Docker快速通关/img-41.jpg)

+ **迭代镜像版本(重新打标签+重新推送)**

![Docker快速通关](./Docker快速通关/img-42.jpg)

> + **添加安全组开放相关端口**
>
> ![Docker快速通关](./Docker快速通关/img-43.jpg)





## Docker存储

![Docker快速通关](./Docker快速通关/img-44.jpg)

> **原始修改页面的操作**
>
> ```shell
> ~> docker ps
> CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS         PORTS                                 NAMES
> d0b2dcc3ceff   nginx:latest   "/docker-entrypoint.…"   11 days ago   Up 2 minutes   0.0.0.0:80->80/tcp, [::]:80->80/tcp   nginx
> 
> ~> docker exec -it d0b bash
> root@d0b2dcc3ceff:/# cd /usr/share/nginx/html/
> root@d0b2dcc3ceff:/usr/share/nginx/html# ls
> 50x.html  index.html
> 
> root@d0b2dcc3ceff:/usr/share/nginx/html# echo 22222 > index.html
> ```
>
> ![Docker快速通关](./Docker快速通关/img-45.jpg)
>
> + **重新拉取一个镜像，页面又变回了默认页面，导致数据丢失**
>
> ![Docker快速通关](./Docker快速通关/img-46.jpg)

**两种方式，注意区分：**

+ **目录挂载： ﻿-v /app/nghtml:/usr/share/nginx/html**

+ **卷映射： -v ngconf:/etc/nginx**

```shell
# 目录挂载
docker run -d -p 80:80 -v /app/nghtml:/usr/share/nginx/html --name app01 nginx

# 卷映射
docker run -d -p 99:80 -v /app/nghtml:/usr/share/nginx/html -v ngconf:/etc/nginx --name app03 nginx
```





### 目录挂载

![Docker快速通关](./Docker快速通关/img-47.jpg)

```shell
# 目录挂载
docker run -d -p 80:80 -v /app/nghtml:/usr/share/nginx/html --name app01 nginx
```

![Docker快速通关](./Docker快速通关/img-48.jpg)

+ **不会删除外部的/app/nghtml**

![Docker快速通关](./Docker快速通关/img-49.jpg)

+ **内部的/usr/share/nginx/html更新外部的/app/nghtml也会更新**

![Docker快速通关](./Docker快速通关/img-50.jpg)





### 卷映射

```shell
# 卷映射
docker run -d -p 99:80 -v /app/nghtml:/usr/share/nginx/html -v ngconf:/etc/nginx --name app03 nginx
```

> + **错误写法**
>
> ![Docker快速通关](./Docker快速通关/img-51.jpg)

+ **正确写法:**

![Docker快速通关](./Docker快速通关/img-52.jpg)

+ **外部卷更新内容——>内部卷也更新**

![Docker快速通关](./Docker快速通关/img-53.jpg)

+ **查看卷命令**

```shell
# 查看所有卷
docker volume ls

# 查看所有卷
docker volume create haha(卷名)

# 查看指定卷的内容
docker volume inspect ngconf(指定卷名)
```

![Docker快速通关](./Docker快速通关/img-54.jpg)

+ **删除镜像，卷依然存在**

![Docker快速通关](./Docker快速通关/img-55.jpg)







## Docker网络

![Docker快速通关](./Docker快速通关/img-56.jpg)

```shell
# 第一个镜像
docker run -d -p 88:80 --name app1 nginx 

# 第二个镜像
docker run -d -p 99:80 --name app2 nginx 
```

![Docker快速通关](./Docker快速通关/img-57.jpg)































## Docker Compose





















## Dockerfile



