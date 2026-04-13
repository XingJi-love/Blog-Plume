---
title: 苍穹外卖-day01
tags:
    - 项目
    - 苍穹外卖
createTime: 2026/04/06 14:55:11
permalink: /blog/g2sm6bya/
cover: ./苍穹外卖.jpg
---

![苍穹外卖-day01](./苍穹外卖.jpg)

**项目整体效果展示：**

![苍穹外卖-day01](./苍穹外卖-day01/img-1.jpg)																		        **管理端-外卖商家使用**

![苍穹外卖-day01](./苍穹外卖-day01/img-2.jpg)

**用户端-点餐用户使用**



## 软件开发整体介绍

### 软件开发流程

![苍穹外卖-day01](./苍穹外卖-day01/img-3.jpg)



### 角色分工

![苍穹外卖-day01](./苍穹外卖-day01/img-4.jpg)

| 岗位/角色      | 对应阶段 | 职责/分工                                  |
| :------------- | -------- | :----------------------------------------- |
| 项目经理       | 全阶段   | 对整个项目负责，任务分配、把控进度         |
| 产品经理       | 需求分析 | 进行需求调研，输出需求调研文档、产品原型等 |
| UI设计师       | 设计     | 根据产品原型输出界面效果图                 |
| 架构师         | 设计     | 项目整体架构设计、技术选型等               |
| **开发工程师** | **编码** | **功能代码实现**                           |
| 测试工程师     | 测试     | 编写测试用例，输出测试报告                 |
| 运维工程师     | 上线运维 | 软件环境搭建、项目上线                     |



### 软件环境

![苍穹外卖-day01](./苍穹外卖-day01/img-5.jpg)





## 苍穹外卖项目介绍

### 项目介绍

![苍穹外卖-day01](./苍穹外卖-day01/img-6.jpg)

> **功能架构: `体现项目中的业务功能模块`**

![苍穹外卖-day01](./苍穹外卖-day01/img-7.jpg)



### 产品原型

> **产品原型： `用于展示项目的业务功能，一般由产品经理进行设计`**

![苍穹外卖-day01](./苍穹外卖-day01/img-8.jpg)

**1). 管理端**

餐饮企业内部员工使用。 主要功能有: 

| 模块      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| 登录/退出 | 内部员工必须登录后,才可以访问系统管理后台                    |
| 员工管理  | 管理员可以在系统后台对员工信息进行管理，包含查询、新增、编辑、禁用等功能 |
| 分类管理  | 主要对当前餐厅经营的 菜品分类 或 套餐分类 进行管理维护， 包含查询、新增、修改、删除等功能 |
| 菜品管理  | 主要维护各个分类下的菜品信息，包含查询、新增、修改、删除、启售、停售等功能 |
| 套餐管理  | 主要维护当前餐厅中的套餐信息，包含查询、新增、修改、删除、启售、停售等功能 |
| 订单管理  | 主要维护用户在移动端下的订单信息，包含查询、取消、派送、完成，以及订单报表下载等功能 |
| 数据统计  | 主要完成对餐厅的各类数据统计，如营业额、用户数量、订单等     |



![苍穹外卖-day01](./苍穹外卖-day01/img-9.jpg)

**2). 用户端**

移动端应用主要提供给消费者使用。主要功能有:

| 模块        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| 登录/退出   | 用户需要通过微信授权后登录使用小程序进行点餐                 |
| 点餐-菜单   | 在点餐界面需要展示出菜品分类/套餐分类, 并根据当前选择的分类加载其中的菜品信息, 供用户查询选择 |
| 点餐-购物车 | 用户选中的菜品就会加入用户的购物车, 主要包含 查询购物车、加入购物车、删除购物车、清空购物车等功能 |
| 订单支付    | 用户选完菜品/套餐后, 可以对购物车菜品进行结算支付, 这时就需要进行订单的支付 |
| 个人信息    | 在个人中心页面中会展示当前用户的基本信息, 用户可以管理收货地址, 也可以查询历史订单数据 |





### 技术选型

> **技术选型: `展示项目中使用到的技术框架和中间件等`**

![苍穹外卖-day01](./苍穹外卖-day01/img-10.jpg)

用户层

> **商家端：**
>
> ​	简单的网页，使用了前端三件套，以及ElementUI，apache echarts 等技术
>
> **用户端：**
>
> ​	基于微信小程序进行开发



网关层：

> **Nginx：**
>
> ​	使用Nginx来部署前端。是一款高性能Web开源服务器，在大型项目中，我们可以使用Nginx的负载均衡来合理请求到多台服务器，减小后端服务器压力



应用层： 

> **Spring boot：**
>
> ​	基于Spring的开源框架，简化各项配置，使得开发人员专注于业务功能的实现
>
> **Spring MVC：**
>        基于 MVC（Model-View-Controller）模式的 Web 应用程序开发框架。它提供了一种结构清晰、模块化的方式来构建可扩展的 Web 应用程序
>
> **Spring Task：**
> 	定时任务依赖，完成相关配置，后端可以定时完成任务
>
> **Httpclient：**
>
> ​	HTTP开源的通信库，使得后端可以发送和处理后端请求，常用于后端请求各种接口时用到
>
> **Spring Cache:**
>
> ​	缓存依赖，把数据存储到缓存中，如果前端再次请求相同数据，使得后端可以从缓存中拿数据，减少了对数据库的IO操作，降低了后端服务器的压力。
>
> **JWT：**
>
> ​	令牌技术，校验用户身份。
>
> **阿里云OSS：**
>
> ​	第三方云存储技术，后端调用阿里云OSS来存储菜品等图片。
>
> **Swagger：**
>
> 开源框架，实现设计、构建和测试RESTful API的开源框架，但在本项目中，我们使用的是Swagger的优化版本Knife4j，它基于注解的方式注解在启动类上，在后端启动之后，在网页输入localhost 8080/doc.html就可以打开相关接口管理界面。
>
> **POI：**
>
> ​	读取和写入Microsoft Office格式文件，如Word文档、Excel电子表格和PowerPoint演示文稿。
>
> **WebSocket：**
>
> ​	一种通信协议，允许客户端与服务器进行持久化连接，并且区别于请求-响应模式，WebSocket协议实现了客户端与服务器的双向通信。



数据层：

> **MySQL：**
>
> ​	关系型存储系统，基于表的形式对数据进行存储，直接存储数据到磁盘当中
>
> **Redis：**
>
> ​	键值型存储系统，基于键值对的形式对数据进行存储，数据会被存储到缓存当中
>
> **Mybatis：**
>
> ​	开源的持久层框架，简化了java与关系型数据的之间的操作
>
> **pagehelper：**
> 	分页框架，以注解的形式使用，简化分页查询中的分页查询操作
>
> **spring data redis：**
>
> ​	spring框架提供的与Redis数据库进行交互的模块，简化在java中使用Redis的操作步骤。 

 

工具：

> **Git：**
>
> ​	分布式文件管理工具，追踪管理文件变化，适用于多人开发
>
> **maven：**
>
> ​	开源的项目管理工具，用于构建和管理Java项目。它提供了一种标准化的项目结构和构建过程，使得开发人员可以更容易地管理项目依赖、构建项目、运行测试和部署应用程序
>
> **Junit:**
>
> ​	Java开源单元测试框架，可以对指定方法进行单元测试，简化开发人员测试流程
>
> **postman：**
>
> ​	接口测试工具，可以便捷的代替前端对后端发送各种请求，测试接口运行效果。





## 开发环境搭建

![苍穹外卖-day01](./苍穹外卖-day01/img-11.jpg)

> 开发环境搭建主要包含**前端环境**和**后端环境**两部分



### 前端环境搭建

**1). 前端工程基于 nginx** 

从资料中找到前端运行环境的nginx，移动到**非中文目录**下。

![苍穹外卖-day01](./苍穹外卖-day01/img-12.jpg)

**sky**目录中存放了管理端的前端资源，具体如下：

![苍穹外卖-day01](./苍穹外卖-day01/img-13.jpg)

![苍穹外卖-day01](./苍穹外卖-day01/img-14.jpg)



**2). 启动nginx，访问测试** 

双击 nginx.exe 即可启动 nginx 服务，访问端口号为 80

http://localhost:80

![苍穹外卖-day01](./苍穹外卖-day01/img-15.jpg)





### 后端环境搭建



#### 熟悉项目结构

> **后端工程基于`maven`进行项目构建，并且进行分模块开发**

![苍穹外卖-day01](./苍穹外卖-day01/img-16.jpg)

::: tip 

+ **修改项目的JDK版本为`jdk17`**

![苍穹外卖-day01](./苍穹外卖-day01/img-23.jpg)

![苍穹外卖-day01](./苍穹外卖-day01/img-17.jpg)

+ **运行mvn idea:module，导入每个模块的Maven依赖**

![苍穹外卖-day01](./苍穹外卖-day01/img-22.jpg)

:::



**项目的整体结构:**

![苍穹外卖-day01](./苍穹外卖-day01/img-18.jpg)

对工程的每个模块作用说明：

| **序号** | **名称**     | **说明**                                                     |
| -------- | ------------ | ------------------------------------------------------------ |
| 1        | sky-take-out | maven父工程，统一管理依赖版本，聚合其他子模块                |
| 2        | sky-common   | 子模块，存放公共类，例如：工具类、常量类、异常类等           |
| 3        | sky-pojo     | 子模块，存放实体类、VO、DTO等                                |
| 4        | sky-server   | 子模块，后端服务，存放配置文件、Controller、Service、Mapper等 |



**分析上述的每个子模块:**

- **sky-common:** 模块中存放的是一些公共类，可以供其他模块使用

  ![苍穹外卖-day01](./苍穹外卖-day01/img-19.jpg)

  

  分析sky-common模块的每个包的作用：

  | 名称        | 说明                           |
  | ----------- | ------------------------------ |
  | constant    | 存放相关常量类                 |
  | context     | 存放上下文类                   |
  | enumeration | 项目的枚举类存储               |
  | exception   | 存放自定义异常类               |
  | json        | 处理json转换的类               |
  | properties  | 存放SpringBoot相关的配置属性类 |
  | result      | 返回结果类的封装               |
  | utils       | 常用工具类                     |




- **sky-pojo:** 模块中存放的是一些 entity、DTO、VO

  ![苍穹外卖-day01](./苍穹外卖-day01/img-20.jpg)

  **分析sky-pojo模块的每个包的作用：**

  | **名称** | **说明**                                     |
  | -------- | -------------------------------------------- |
  | Entity   | 实体，通常和数据库中的表对应                 |
  | DTO      | 数据传输对象，通常用于程序中各层之间传递数据 |
  | VO       | 视图对象，为前端展示数据提供的对象           |
  | POJO     | 普通Java对象，只有属性和对应的getter和setter |




- **sky-server:** 模块中存放的是 配置文件、配置类、拦截器、controller、service、mapper、启动类等

  ![苍穹外卖-day01](./苍穹外卖-day01/img-21.jpg)

  **分析sky-server模块的每个包的作用：**

  | 名称           | 说明             |
  | -------------- | ---------------- |
  | config         | 存放配置类       |
  | controller     | 存放controller类 |
  | interceptor    | 存放拦截器类     |
  | mapper         | 存放mapper接口   |
  | service        | 存放service类    |
  | SkyApplication | 启动类           |





#### Git版本控制

> **使用Git进行项目代码的版本控制，具体操作：**

+ **编写.gitignore文件(不想要提交到远程仓库的文件)**

```java
**/target/
.idea
*.iml
*.class
*Test.java
**/test/
```

![苍穹外卖-day01](./苍穹外卖-day01/img-24.jpg)

**1). 创建Git本地仓库**

![苍穹外卖-day01](./苍穹外卖-day01/img-25.jpg)

**2). 创建Git远程仓库**

访问https://github.com/，新建仓库

![苍穹外卖-day01](./苍穹外卖-day01/img-26.jpg)

![苍穹外卖-day01](./苍穹外卖-day01/img-27.jpg)

+ **在IDEA中配置github的远程仓库地址**

![苍穹外卖-day01](./苍穹外卖-day01/img-28.jpg)

**3). 将本地文件推送到Git远程仓库**

+ **提交到本地仓库**

![苍穹外卖-day01](./苍穹外卖-day01/img-29.jpg)

+ **提交到github远程仓库**

![苍穹外卖-day01](./苍穹外卖-day01/img-30.jpg)

+ **成功推送至github远程仓库**

![苍穹外卖-day01](./苍穹外卖-day01/img-31.jpg)





#### 数据库环境搭建

![苍穹外卖-day01](./苍穹外卖-day01/img-32.jpg)

![苍穹外卖-day01](./苍穹外卖-day01/img-33.jpg)

**每张表的说明：**

| **序号** | **表名**      | **中文名**     |
| -------- | ------------- | -------------- |
| 1        | employee      | 员工表         |
| 2        | category      | 分类表         |
| 3        | dish          | 菜品表         |
| 4        | dish_flavor   | 菜品口味表     |
| 5        | setmeal       | 套餐表         |
| 6        | setmeal_dish  | 套餐菜品关系表 |
| 7        | user          | 用户表         |
| 8        | address_book  | 地址表         |
| 9        | shopping_cart | 购物车表       |
| 10       | orders        | 订单表         |
| 11       | order_detail  | 订单明细表     |





## 导入接口文档



### 前后端分离开发流程

![苍穹外卖-day01](./苍穹外卖-day01/img-36.jpg)

> **第一步：定义接口，确定接口的路径、请求方式、传入参数、返回参数。**
>
> **第二步：前端开发人员和后端开发人员并行开发，同时，也可自测。**
>
> **第三步：前后端人员进行连调测试。**
>
> **第四步：提交给测试人员进行最终测试。**



### 操作步骤

+ **导入到`Apipost`软件中**

![苍穹外卖-day01](./苍穹外卖-day01/img-37.jpg)

+ **导入成功**

![苍穹外卖-day01](./苍穹外卖-day01/img-38.jpg)

![苍穹外卖-day01](./苍穹外卖-day01/img-39.jpg)

::: tip 

+ **配置服务前置URL**

![苍穹外卖-day01](./苍穹外卖-day01/img-40.jpg)

:::





## Swagger

### 介绍

![苍穹外卖-day01](./苍穹外卖-day01/img-41.jpg)

### 使用步骤

1. 导入 knife4j 的maven坐标

   + **在pom.xml中添加依赖**

   ```xml
   <dependency>
      <groupId>com.github.xiaoymin</groupId>
      <artifactId>knife4j-spring-boot-starter</artifactId>
   </dependency>
   ```

2. 在配置类中加入knife4j相关配置

   + **WebMvcConfiguration.java**

   ```java
   /**
        * 通过knife4j生成接口文档
        * @return
   */
       @Bean
       public Docket docket() {
           ApiInfo apiInfo = new ApiInfoBuilder()
                   .title("苍穹外卖项目接口文档")
                   .version("2.0")
                   .description("苍穹外卖项目接口文档")
                   .build();
           Docket docket = new Docket(DocumentationType.SWAGGER_2)
                   .apiInfo(apiInfo)
                   .select()
                   .apis(RequestHandlerSelectors.basePackage("com.sky.controller"))
                   .paths(PathSelectors.any())
                   .build();
           return docket;
       }
   ```

   

3. 设置静态资源映射，否则接口文档页面无法访问

   + **WebMvcConfiguration.java**

   ```java
   /**
        * 设置静态资源映射
        * @param registry
   */
   protected void addResourceHandlers(ResourceHandlerRegistry registry) {
           registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
           registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
   }
   ```

4. 访问测试

   接口文档访问路径为 http://ip:port/doc.html ---> http://localhost:8080/doc.html

![苍穹外卖-day01](./苍穹外卖-day01/img-42.jpg)

+ **接口测试:测试登录功能**

![苍穹外卖-day01](./苍穹外卖-day01/img-43.jpg)





### 常用注解

**通过注解可以控制生成的接口文档，使接口文档拥有更好的可读性，常用注解如下：**

| **注解**          | **说明**                                               |
| ----------------- | ------------------------------------------------------ |
| @Api              | 用在类上，例如Controller，表示对类的说明               |
| @ApiModel         | 用在类上，例如entity、DTO、VO                          |
| @ApiModelProperty | 用在属性上，描述属性信息                               |
| @ApiOperation     | 用在方法上，例如Controller的方法，说明方法的用途、作用 |

接下来，使用上述注解，生成可读性更好的接口文档

> **在`sky-pojo模块`中**

+ **EmployeeLoginDTO.java**

```java
package com.sky.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(description = "员工登录时传递的数据模型")
public class EmployeeLoginDTO implements Serializable {

    @ApiModelProperty("用户名")
    private String username;

    @ApiModelProperty("密码")
    private String password;

}

```

+ **EmployeeLoginVo.java**

```java
package com.sky.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "员工登录返回的数据格式")
public class EmployeeLoginVO implements Serializable {

    @ApiModelProperty("主键值")
    private Long id;

    @ApiModelProperty("用户名")
    private String userName;

    @ApiModelProperty("姓名")
    private String name;

    @ApiModelProperty("jwt令牌")
    private String token;

}
```

> **在`sky-server模块`中**

+ **EmployeeController.java**

```java
package com.sky.controller.admin;

import com.sky.constant.JwtClaimsConstant;
import com.sky.dto.EmployeeLoginDTO;
import com.sky.entity.Employee;
import com.sky.properties.JwtProperties;
import com.sky.result.Result;
import com.sky.service.EmployeeService;
import com.sky.utils.JwtUtil;
import com.sky.vo.EmployeeLoginVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 员工管理
 */
@RestController
@RequestMapping("/admin/employee")
@Slf4j
@Api(tags = "员工相关接口")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private JwtProperties jwtProperties;

    /**
     * 登录
     *
     * @param employeeLoginDTO
     * @return
     */
    @PostMapping("/login")
    @ApiOperation(value = "员工登录")
    public Result<EmployeeLoginVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO) 	{
        //..............

        
    }

    /**
     * 退出
     *
     * @return
     */
    @PostMapping("/logout")
    @ApiOperation("员工退出")
    public Result<String> logout() {
        return Result.success();
    }

}

```

启动服务：访问http://localhost:8080/doc.html

![苍穹外卖-day01](./苍穹外卖-day01/img-44.jpg)
