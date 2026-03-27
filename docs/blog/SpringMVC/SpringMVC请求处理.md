---
title: SpringMVC | SpringMVC请求处理
tags:
    - SpringMVC
createTime: 2026/03/25 16:13:53
permalink: /blog/sxkbdx6d/
cover: ./SpringMVC.jpg
---

![SpringMVC请求处理](./SpringMVC.jpg)

## SpringMVC 简介

::: tip 

**官网：https://docs.spring.io/spring-framework/reference/web/webmvc.html**

**SpringMVC 是`Spring 的 web 模块`，用来`开发Web应用`**

**SprinMVC 应用最终作为`B/S(浏览器)、C/S(客户端)模式下的 Server 端`**

**Web应用的核心就是`处理HTTP请求响应`**

:::

![SpringMVC请求处理](./SpringMVC请求处理/img-1.jpg)



### 两种开发模式

::: tip 

+ **开发模式**
  + **前后分离开发**
  + **前后不分离开发**

![SpringMVC请求处理](./SpringMVC请求处理/img-2.jpg)

+ **前后分离开发**
  + **@ResponseBody**
  + **@RestController**

+ **服务端渲染**
  + **转发**
  + **重定向**

![SpringMVC请求处理](./SpringMVC请求处理/img-3.jpg)

**MVC 设计模式是一种经典的软件架构模式，包含三个部分：**

- **Model（模型）**：处理具体的业务逻辑与数据；
- **View（视图）**：负责展示数据；
- **Controller（控制器）**：接收用户请求、协调 Model 和 View。

:::



### Hello World

> **场景：浏览器发送 /hello 请求，服务端响应 “Hello,Spring MVC! 你好!~~~”**

+ **HelloController.java**

```java
package fun.xingji.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // 告诉Spring这是一个控制器（处理请求的组件）
public class HelloController {

    @ResponseBody // 把返回值放到响应体中； 每次请求进来执行目标方法
    @RequestMapping("/hello")
    public String hello() {
        return "Hello,Spring MVC! 你好!~~~";
    }
}
```

+ **Springmvc01HelloworldApplication.java**

```java
package fun.xingji.springmvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 效果：其实是 SpringBoot 做的。
 * 1、tomcat不用整合
 * 2、servlet开发变得简单，不用实现任何接口
 * 3、自动解决了乱码等问题
 */
@SpringBootApplication
public class Springmvc01HelloworldApplication {

    public static void main(String[] args) {
        SpringApplication.run(Springmvc01HelloworldApplication.class, args);
    }

}
```







## 路径映射 - @RequestMapping



### 路径映射

::: tip

**路径规则：https://docs.spring.io/spring-framework/docs/6.1.11/javadoc-api/org/springframework/web/util/pattern/PathPattern.html**

::: note 

**精确路径必须`全局唯一`**
**路径位置通配符： 多个都能匹配上，那就`精确优先`**

```java
*: 匹配任意多个字符（0~N）； 不能匹配多个路径
    
**： 匹配任意多层路径
    
?: 匹配任意单个字符（1）
```

> **精确程度：`完全匹配 > ? > * > **`**

:::

**路径变量：@PathVariable**

:::

+ **HelloController.java**

```java
package fun.xingji.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // 告诉Spring这是一个控制器（处理请求的组件）
public class HelloController {

    /**
     *
     * 精确路径必须全局唯一
     * 路径位置通配符： 多个都能匹配上，那就精确优先
     *      *: 匹配任意多个字符（0~N）； 不能匹配多个路径
     *      **： 匹配任意多层路径
     *      ?: 匹配任意单个字符（1）
     *   精确程度： 完全匹配 > ? > * > **
     *
     * @return
     */
    @ResponseBody // 把返回值放到响应体中； 每次请求进来执行目标方法
    @RequestMapping("/hello")
    public String hello() {
        System.out.println("hello方法执行了!");
        return "Hello,Spring MVC! 你好!~~~";
    }

    // ? 表示任意单个字符
    @ResponseBody // 把返回值放到响应体中； 每次请求进来执行目标方法
    @RequestMapping("/hell?")
    public String hello01() {
        System.out.println("hello01方法执行了!");
        return "hello01";
    }

    // * 表示任意多个字符，但不能匹配多个路径
    @ResponseBody
    @RequestMapping("/hell*")
    public String hello02() {
        System.out.println("hello02方法执行了!");
        return "hello02";
    }

    // ** 表示任意多层路径
    @ResponseBody
    @RequestMapping("/he/**")
    public String hello03() {
        System.out.println("hello03方法执行了!");
        return "hello03";
    }
}
```

+ **测试:**

![SpringMVC请求处理](./SpringMVC请求处理/img-4.jpg)

![SpringMVC请求处理](./SpringMVC请求处理/img-5.jpg)

![SpringMVC请求处理](./SpringMVC请求处理/img-6.jpg)

![SpringMVC请求处理](./SpringMVC请求处理/img-7.jpg)





### 请求限定

::: tip

```java
package org.springframework.web.bind.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.aot.hint.annotation.Reflective;
import org.springframework.core.annotation.AliasFor;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
@Reflective({ControllerMappingReflectiveProcessor.class})
public @interface RequestMapping {
    String name() default "";

    @AliasFor("path")
    String[] value() default {};

    @AliasFor("value")
    String[] path() default {};

    RequestMethod[] method() default {};

    String[] params() default {};

    String[] headers() default {};

    String[] consumes() default {};

    String[] produces() default {};
}
```

**请求方式：method**

**请求参数：params**

**请求头：headers**

**请求内容类型：consumes**

**响应内容类型：produces**

:::





























## HTTP&JSON































## 参数处理

























