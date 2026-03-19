---
title: SpringBoot | SpringBoot快速入门
tags:
    - SpringBoot
createTime: 2026/03/17 17:03:58
permalink: /blog/z87bg2zq/
cover: ./SpringBoot.jpg
---

![SpringBoot快速入门](./SpringBoot.jpg)

## SpringBoot特性

::: tip 

**SpringBoot 帮我们简单、快速地创建一个独立的、生产级别的 Spring 应用；**

**大多数 SpringBoot 应用只需要编写少量配置即可快速整合 Spring 平台以及第三方技术**

**特性：**

+ **快速创建独立 Spring 应用**

+ **直接嵌入Tomcat、Jetty or Undertow**

+ **提供可选的 starter，简化应用整合**

+ **按需自动配置 Spring 以及 第三方库**

+ **提供生产级特性：如 监控指标、健康检查、外部化配置等**

+ **无代码生成、无xml； 都是基于自动配置技术**

**总结：**

+ **简化开发，简化配置，简化整合，简化部署，简化监控，简化运维**

:::

### 快速部署

![SpringBoot快速入门](./SpringBoot快速入门/img-1.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-2.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-3.jpg)







## 场景启动器

::: tip

**场景启动器：`导入相关的场景，拥有相关的功能`。**

**默认支持的所有场景：**

+ https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters

+ **官方提供的场景：命名为：spring-boot-starter-***

+ **第三方提供场景：命名为：*-spring-boot-starter**

```xml-dtd
SpringBoot场景启动器：
        官方写的：spring-boot-starter-*
        第三方的：*-spring-boot-starter
            把当前场景用的jar包都引入进来；
            每个场景启动器都有一个基础依赖：spring-boot-starter
                spring-boot-starter-web
                spring-boot-starter-aop
                spring-boot-starter-data-jdbc
                spring-boot-starter-test
                spring-boot-starter-tomcat
                spring-boot-starter-json
```

:::





## 依赖管理

![SpringBoot快速入门](./SpringBoot快速入门/img-4.jpg)

::: note 

```xml-dtd
依赖管理：父项目不管理的所有依赖，导入的时候都需要写版本
修改版本：
1）、写上：就近优先原则
2）、自己声明属性：mysql.version
```

**思考：**

> **为什么 不用写版本号？** 

+ **maven父子继承，父项目可以锁定版本**

![SpringBoot快速入门](./SpringBoot快速入门/img-5.jpg)

> **哪些需要写版本号？**

+ **父不管的都需要写版本**

![SpringBoot快速入门](./SpringBoot快速入门/img-7.jpg)

> **如何修改默认版本号？**

+ **version 精确声明版本**

+ **子覆盖父的属性设置**
  + **mysql.version**

![SpringBoot快速入门](./SpringBoot快速入门/img-6.jpg)

:::





## 自动配置机制(约定大于配置)

+ **初步理解**

::: note 

> **自动配置**

+ **导入场景，容器中就会自动配置好这个场景的核心组件。**

+ **如 Tomcat、SpringMVC、DataSource 等**

+ **不喜欢的组件可以自行配置进行替换**

![SpringBoot快速入门](./SpringBoot快速入门/img-8.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-9.jpg)

> **默认的包扫描规则**

+ **SpringBoot只会扫描主程序所在的包及其下面的子包**

> **配置默认值**

+ **配置文件的所有配置项 是和 某个类的对象值进行一一绑定的。**

+ **很多配置即使不写都有默认值，如：端口号，字符编码等**

+ **默认能写的所有配置项：https://docs.spring.io/spring-boot/appendix/application-properties/index.html#appendix.application-properties.actuator**

![SpringBoot快速入门](./SpringBoot快速入门/img-10.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-11.jpg)

> **按需加载自动配置**

+ **导入的场景会导入全量自动配置包，但并不是都生效**

:::





+ **完整流程**

![SpringBoot快速入门](./SpringBoot快速入门/img-12.jpg)

::: note

**核心流程总结：**

​	1: **导入 starter，就会导入autoconfigure 包。**

​	2: **autoconfigure 包里面 有一个文件`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`,里面指定的所有启动要加载的自动配置类**

![SpringBoot快速入门](./SpringBoot快速入门/img-13.jpg)

​	3: **@EnableAutoConfiguration 会自动的把上面文件里面写的所有自动配置类都导入进来。xxxAutoConfiguration 是有条件注解进行按需加载**

​	4: **xxxAutoConfiguration 给容器中导入一堆组件，组件都是从 xxxProperties 中提取属性值**

​	5: **xxxProperties 又是和配置文件进行了绑定**

**效果：导入starter、修改配置文件，就能修改底层行为。**

:::

+ **导入场景:**

![SpringBoot快速入门](./SpringBoot快速入门/img-14.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-15.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-17.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-16.jpg)

+ **自动装配：**

![SpringBoot快速入门](./SpringBoot快速入门/img-18.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-19.jpg)

![SpringBoot快速入门](./SpringBoot快速入门/img-20.jpg)
