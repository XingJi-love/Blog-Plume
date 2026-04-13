---
title: 苍穹外卖-day03
tags:
    - 项目
    - 苍穹外卖
createTime: 2026/04/10 22:22:40
permalink: /blog/j2qiynjo/
cover: ./苍穹外卖.jpg
---

![苍穹外卖-day03](./苍穹外卖.jpg)

## 新增员工

::: tip

+ **将JWT令牌添加到全局参数中**

![苍穹外卖-day03](./苍穹外卖-day03/img-1.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-2.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-3.jpg)

> **注意：application.yaml中配置了`jwt的过期时间为2小时`,需要及时在全局参数设置中及时更新，不然无法使用Swagger接口文档的相关接口请求**

![苍穹外卖-day03](./苍穹外卖-day03/img-21.jpg)

:::

![苍穹外卖-day03](./苍穹外卖-day03/img-10.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-11.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-12.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-13.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-14.jpg)

### 异常处理(重点)

+ **问题1: 录入的用户名已存在，抛出异常后没有处理**

> ![苍穹外卖-day03](./苍穹外卖-day03/img-15.jpg)
>
> + **GlobalExceptionHandler.java**
>
> ```java
> /**
>      * 捕获数据库重复键值异常
>      * @param ex
>      * @return
>      */
>     @ExceptionHandler
>     public Result exceptionHandler(SQLIntegrityConstraintViolationException ex){
>         // Duplicate entry 'zhangsan' for key 'employee.idx_username' 重复键值异常
>         // 提取异常信息
>         String message = ex.getMessage();
>         if (message.contains("Duplicate entry")) {
>             // 提取异常信息中的键值
>             String[] split = message.split(" "); // 切割字符串
>             String username = split[2]; // 提取键值
>             String msg = username + MessageConstant.ALREADY_EXISTS; // 拼接错误信息 "zhangsan已存在"
>             // 返回错误信息
>             return Result.error(msg);
>         }else  {
>             // 未知错误
>             return Result.error(MessageConstant.UNKNOWN_ERROR);
>         }
>     }
> ```
>
> ![苍穹外卖-day03](./苍穹外卖-day03/img-4.jpg)



### ThreadLocal(重点)

::: tip 

+ **问题2: 新增员工时，创建人id和修改人id设置为了固定值**

> ![苍穹外卖-day03](./苍穹外卖-day03/img-5.jpg)
>
> ![苍穹外卖-day03](./苍穹外卖-day03/img-6.jpg)
>
> **注意：客户端发送的每次请求，后端的Tomcat服务器都会`分配一个单独的线程`来处理请求**

:::

+ **BaseContext.java**

```java
package com.sky.context;


// 定义一个线程局部变量，用于保存当前登录员工的id
public class BaseContext {

    public static ThreadLocal<Long> threadLocal = new ThreadLocal<>();

    // 设置当前线程的登录员工id
    public static void setCurrentId(Long id) {
        threadLocal.set(id);
    }

    // 获取当前线程的登录员工id
    public static Long getCurrentId() {
        return threadLocal.get();
    }

    // 移除当前线程的登录员工id
    public static void removeCurrentId() {
        threadLocal.remove();
    }

}
```

![苍穹外卖-day03](./苍穹外卖-day03/img-7.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-8.jpg)

+ **测试效果**

![苍穹外卖-day03](./苍穹外卖-day03/img-9.jpg)





## 员工分页查询

![苍穹外卖-day03](./苍穹外卖-day03/img-16.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-17.jpg)



### 基于PageHelper 的分页查询(重点)

::: tip 

**PageHelper是基于java的一个开源框架，用于在MyBatis等持久层框架中方便地进行`分页查询操作`。它提供了一组简单易用的API和拦截器机制，可以帮助开发者快速集成和使用分页功能。**

```mermaid
graph TD
    A[开始] --> B[调用 PageHelper.startPage];
    B --> C[将分页参数存入 ThreadLocal];
    C --> D[调用 MyBatis Mapper 方法];
    D --> E{MyBatis 拦截器链触发<br>PageInterceptor};
    E --> F[从 ThreadLocal 获取分页参数];
    F --> G[修改SQL语句];
    G --> H["计算总记录数 (Count SQL)"];
    H --> I[执行分页SQL查询];
    I --> J[将结果封装为 Page/PageInfo 对象];
    J --> K[清除 ThreadLocal 中的参数];
    K --> L[结束];
```

**PageHelper的主要功能包括：**

**分页查询支持：PageHelper提供了直接在SQL语句中添加分页相关的信息，如页码、每页记录数等，从而实现分页查询功能。**

**参数解析和设置：PageHelper可以解析传入的查询参数，并自动设置分页的相关参数，无需手动计算和设置。**

**SQL拦截器：PageHelper通过自定义的SQL拦截器拦截和处理查询SQL，自动添加分页的SQL语句，实现分页查询。**

**排序支持：PageHelper还提供了对排序的支持，可以在分页查询中指定排序字段和排序方式。**

**分页信息返回：PageHelper会将查询结果封装在一个Page对象中，包含了分页的相关信息，如总记录数、总页数等。**

**PageHelper的底层原理是拦截，拦截需要进行分页查询的SQL请求，读取用户传入参数，自主构造分页SQL语句。**

:::

![苍穹外卖-day03](./苍穹外卖-day03/img-18.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-19.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-20.jpg)



### 基于消息转换器对时间进行格式化(重点)

![苍穹外卖-day03](./苍穹外卖-day03/img-22.jpg)

::: tip

**对象映射器: 基于jackson将Java对象转为json，或者将json转为Java对象**

> **将JSON解析为Java对象的过程称为 [`从JSON反序列化Java对象`]***
>
> **从Java对象生成JSON的过程称为 [`序列化Java对象到JSON`]**

+ **方式一：在`属性上加入注解`，对日期进行格式化**

![苍穹外卖-day03](./苍穹外卖-day03/img-23.jpg)

+ **方式二：在`WebMvcConfiguration`中扩展`Spring MVC的消息转换器`，统一对日期类型进行`格式化处理`**

![苍穹外卖-day03](./苍穹外卖-day03/img-25.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-24.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-26.jpg)

:::

+ **效果图:**

![苍穹外卖-day03](./苍穹外卖-day03/img-27.jpg)





## 启用禁止员工账号

业务规则：

+ **可以对状态为`“启用” 的员工`账号`进行“禁用”操作`**

+ **可以对状态为`“禁用”的员工`账号`进行“启用”操作`**

+ **状态为`“禁用”`的员工账号`不能登录系统`**

![苍穹外卖-day03](./苍穹外卖-day03/img-28.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-29.jpg)

::: tip

+ **利用`@PathVariable`将`参数附带在路径`中**

![苍穹外卖-day03](./苍穹外卖-day03/img-30.jpg)

+ **利用动态sql拓宽该方法的范围,不局限于仅修改某一个参数**

![苍穹外卖-day03](./苍穹外卖-day03/img-31.jpg)

+ **编写动态sql**

![苍穹外卖-day03](./苍穹外卖-day03/img-32.jpg)

:::

+ **效果图:**

![苍穹外卖-day03](./苍穹外卖-day03/img-33.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-34.jpg)







## 编辑员工

![苍穹外卖-day03](./苍穹外卖-day03/img-35.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-36.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-37.jpg)

![苍穹外卖-day03](./苍穹外卖-day03/img-38.jpg)

::: tip

+ **根据员工id查询员工相关信息，并且进行数据回显**

![苍穹外卖-day03](./苍穹外卖-day03/img-39.jpg)

+ **利用DTO进行数据传输**

![苍穹外卖-day03](./苍穹外卖-day03/img-40.jpg)

+ **利用`BeanUtils工具类`进行对象间的值`拷贝`**

> **设置修改人id 利用`ThreadLocal局部变量` (解析jwt令牌时 设置该变量)**

![苍穹外卖-day03](./苍穹外卖-day03/img-41.jpg)

:::

+ **效果图**

![苍穹外卖-day03](./苍穹外卖-day03/img-42.jpg)





### 导入分类模块功能代码

业务规则：

+ 分类名称必须是**唯一**的

+ 分类按照类型可以分为**菜品分类**和**套餐分类**

+ 新添加的分类状态默认为**“禁用”**

![苍穹外卖-day03](./苍穹外卖-day03/img-43.jpg)
