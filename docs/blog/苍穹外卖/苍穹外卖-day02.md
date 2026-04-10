---
title: 苍穹外卖-day02
tags:
    - 项目
    - 苍穹外卖
createTime: 2026/04/07 18:00:52
permalink: /blog/9udpno2q/
cover: ./苍穹外卖.jpg
---

![苍穹外卖-day02](./苍穹外卖.jpg)

## 前后端联调

**后端的初始工程中已经实现了`登录功能`，直接进行前后端联调测试即可**

::: tip 

+ **在application-dev.yml中配置好自己的数据库密码**

![苍穹外卖-day02](./苍穹外卖-day02/img-1.jpg)

:::

实现思路： 

![苍穹外卖-day02](./苍穹外卖-day02/img-2.jpg)

> **注：可以通过`断点调试`跟踪`后端程序的执行过程`**

**1.Controller层**

+ **在sky-server模块中，com.sky.controller.admin.EmployeeController**

```java
/**
     * 登录
     *
     * @param employeeLoginDTO
     * @return
     */
    @PostMapping("/login")
    public Result<EmployeeLoginVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO) {
        log.info("员工登录：{}", employeeLoginDTO);

        Employee employee = employeeService.login(employeeLoginDTO);

        //登录成功后，生成jwt令牌
        Map<String, Object> claims = new HashMap<>();
        // 将员工id存入claims
        claims.put(JwtClaimsConstant.EMP_ID, employee.getId());
        String token = JwtUtil.createJWT(
                // 管理员的秘钥
                jwtProperties.getAdminSecretKey(),
                // 管理员的过期时间
                jwtProperties.getAdminTtl(),
                // 管理员的claims
                claims);

        // 构建返回对象
        EmployeeLoginVO employeeLoginVO = EmployeeLoginVO.builder()
                // 封装数据
                .id(employee.getId())
                .userName(employee.getUsername())
                .name(employee.getName())
                .token(token)
                .build();

        // 返回结果
        return Result.success(employeeLoginVO);
    }
```



**2.Service层**

+ **在sky-server模块中，com.sky.service.impl.EmployeeServiceImpl**

```java
package com.sky.service.impl;

import com.sky.constant.MessageConstant;
import com.sky.constant.StatusConstant;
import com.sky.dto.EmployeeLoginDTO;
import com.sky.entity.Employee;
import com.sky.exception.AccountLockedException;
import com.sky.exception.AccountNotFoundException;
import com.sky.exception.PasswordErrorException;
import com.sky.mapper.EmployeeMapper;
import com.sky.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;

    /**
     * 员工登录
     *
     * @param employeeLoginDTO
     * @return
     */
    public Employee login(EmployeeLoginDTO employeeLoginDTO) {
        // 获取登录信息
        String username = employeeLoginDTO.getUsername();
        String password = employeeLoginDTO.getPassword();

        //1、根据用户名查询数据库中的数据
        Employee employee = employeeMapper.getByUsername(username);

        //2、处理各种异常情况（用户名不存在、密码不对、账号被锁定）
        if (employee == null) {
            //账号不存在
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }

        //密码比对
        // TODO 后期需要进行md5加密，然后再进行比对
        if (!password.equals(employee.getPassword())) {
            //密码错误
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);
        }

        if (employee.getStatus() == StatusConstant.DISABLE) {
            //账号被锁定
            throw new AccountLockedException(MessageConstant.ACCOUNT_LOCKED);
        }

        //3、返回实体对象
        return employee;
    }

}
```



**3.Mapper层**

+ **在sky-server模块中，com.sky.mapper.EmployeeMapper**

```java
package com.sky.mapper;

import com.sky.entity.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EmployeeMapper {

    /**
     * 根据用户名查询员工
     * @param username
     * @return
     */
    @Select("select * from employee where username = #{username}")
    Employee getByUsername(String username);

}
```





### JWT令牌加密技术

+ **用户登录流程：**

![苍穹外卖-day02](./苍穹外卖-day02/img-3.jpg)

::: tip 

**`JWT（JSON Web Token）`是一种用于`身份验证和授权的开放标准`。它由三部分组成，分别是`头部（Header）`、`载荷（Payload）`和`签名（Signature）`。其中，`签名`是用于`验证令牌的完整性和可信任性`。**

![苍穹外卖-day02](./苍穹外卖-day02/img-7.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-6.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-8.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-4.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-5.jpg)

```java
package com.sky.test;

import io.jsonwebtoken.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.UUID;

@SpringBootTest
public class JWTTest {

    // 定义有效期(有效期为24小时)
    private static final long time = 1000 * 60 * 60 * 24;
    // 定义签名信息
    private String signature = "admin";

    // JWT加密
    @Test
    public void jwt() {
        // 创建JwtBuilder对象
        JwtBuilder jwtBuilder = Jwts.builder();
        // 组装JWT
        String jwtToken = jwtBuilder
                // header头部
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS256")
                // payload负载
                .claim("username", "xingji") // 设置加密的用户名
                .claim("rale", "admin") // 设置加密的角色
                .setSubject("admin-test") // 设置加密的主题
                .setIssuedAt(new Date(System.currentTimeMillis() + time)) // 设置加密有效期
                .setId(UUID.randomUUID().toString()) // 设置加密的id
                // signature签名
                .signWith(SignatureAlgorithm.HS256, signature) // 设置签名算法和签名信息
                .compact(); // 组装JWT(拼接header.payload.signature)
        // 打印经过加密的JWT信息
        System.out.println(jwtToken);
    }


    // JWT解密
    @Test
    public void parse() {
        // header头部 + payload负载 + signature签名 = 拼接的JWT信息
        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InhpbmdqaSIsInJhbGUiOiJhZG1pbiIsInN1YiI6ImFkbWluLXRlc3QiLCJpYXQiOjE3NzU5MTA0MTYsImp0aSI6ImZmNWY3OTA4LTcxZWEtNDRhZS05MWM1LTZiYzQwN2ZkNzVlYyJ9.GYCyJz4SQZhK7k4ZX-kEPRD4OPWfRi1Ft_kGtnXl_BY";

        // 解密流程
        // 创建JwtParser对象
        JwtParser  jwtParser = Jwts.parser();
        // 解析JWT信息
        Jws<Claims> claimsJws = jwtParser.setSigningKey(signature).parseClaimsJws(token);
        // 获取解析后的JWT信息
        Claims claims = claimsJws.getBody();
        // 打印解析后的JWT信息
        System.out.println(claims.get("username"));
        System.out.println(claims.get("rale"));
        System.out.println(claims.getSubject());
        System.out.println(claims.getExpiration());
        System.out.println(claims.getId());
    }
}
```

![苍穹外卖-day02](./苍穹外卖-day02/img-12.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-13.jpg)

+ **JWT的优势:**

> 1. **`授权信息完全存储在`客户端**
> 2. **服务端`不需要存储任何信息`，`不需要部署分布式存储系统`**

+ **JWT的劣势:**

> 1. **想撤回JWT很难**
> 2. **过期时间尽可能设短，比如从一天改为1小时**
>
> + **Payload里不宜存放敏感信息**
>
> ![苍穹外卖-day02](./苍穹外卖-day02/img-10.jpg)
>
> ![苍穹外卖-day02](./苍穹外卖-day02/img-11.jpg)

:::

![苍穹外卖-day02](./苍穹外卖-day02/img-9.jpg)

+ **验证登录的代码界面**

![苍穹外卖-day02](./苍穹外卖-day02/img-14.jpg)

+ **JwtUtil工具类**

**jwt加密：**

![苍穹外卖-day02](./苍穹外卖-day02/img-15.jpg)

**jwt解密： **

![苍穹外卖-day02](./苍穹外卖-day02/img-16.jpg)





### Nginx负载均衡和反向代理

![苍穹外卖-day02](./苍穹外卖-day02/img-23.jpg)

::: warning 

![苍穹外卖-day02](./苍穹外卖-day02/img-17.jpg)

> **nginx反向代理，就是将`前端发送的动态请求`由`nginx`转发到`后端服务器`**

![苍穹外卖-day02](./苍穹外卖-day02/img-18.jpg)

> **所谓负载均衡,就是把`大量的请求`按照我们`指定的方式`均衡的`分配给集群中的每台服务器`**

![苍穹外卖-day02](./苍穹外卖-day02/img-19.jpg)

:::

+ **反向代理：**

**有反向代理就有正向代理，而二者的区别很明显：`反向代理`隐藏`服务器`，`正向代理`隐藏`客户端`**

> **`正向代理`是`客户端发送请求`后通过`代理服务器`访问`目标服务器`，代理服务器代表客户端发送请求并将响应返回给客户端。`正向代理隐藏了客户端的真实身份和位置信息`，为客户端提供代理访问互联网的功能。**
>
> ![苍穹外卖-day02](./苍穹外卖-day02/img-24.jpg)
>
> **`反向代理`是位于`目标服务器和客户端`之间的`代理服务器`，它代表服务器接收客户端的请求并将请求转发到真正的目标服务器上，并将得到的响应返回给客户端。`反向代理隐藏了服务器的真实身份和位置信息`，客户端只知道与反向代理进行通信，而不知道真正的服务器。**
>
> ![苍穹外卖-day02](./苍穹外卖-day02/img-25.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-20.jpg)

```nginx
 # 反向代理,处理管理端发送的请求
location /api/ {
		proxy_pass   http://localhost:8080/admin/;
     #proxy_pass   http://webservers/admin/;
}
		
# 反向代理,处理用户端发送的请求
location /user/ {
         proxy_pass   http://webservers/user/;
}
```

> **反向代理`可以缓存后端响应`，使得相同的请求`不需要再次发送到服务器`，有效降低了`服务器的访问压力`。**



+ **负载均衡：**

**Nginx 的负载均衡功能`允许将请求分发给多个应用服务器`，以均衡负载和提高系统的`可扩展性和可靠性`。下面是一些常用的 Nginx 负载均衡配置方法：**

> **`轮询（Round Robin）`：这是`默认的负载均衡策略`。Nginx将请求`依次分发给每个后端服务器`，确保每个服务器都能获得`相同的请求数量`。**
>
> **`IP 哈希（IP Hash）`：Nginx 使用`客户端 IP 地址的哈希值`来决定将请求发送给`哪个后端服务器`。这种方式可以确保同一客户端的请求始终发送到同一个后端服务器，适用于`某些需要会话保持的场景`。**
>
> **`加权轮询（Weighted Round Robin）`：可以为每个后端服务器`设置权重`，`高权重的服务器`将获得`更多的请求`。这种方式可以根据`服务器的性能和处理能力`来分配负载。**
>
> **`最少连接（Least Connections）`：Nginx 根据当前连接数来`选择最空闲的后端服务器`，将请求发送给它。这样可以`确保负载更均衡`，`避免某些服务器过载`。**
>
> ![苍穹外卖-day02](./苍穹外卖-day02/img-22.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-21.jpg)

```nginx
upstream webservers{
	  server 127.0.0.1:8080 weight=90 ; # weight权重越大就首先分配服务器资源
	  #server 127.0.0.1:8088 weight=10 ;
}
```

> **通过这个Nginx就可以把请求`分发给指定的多台服务器`，并且我们也`设置了权重`。不过因为本次演示的是单机项目，我们只有一台电脑，因此我们把第二个地址注释了起来。**





### MD5加密登录

::: warning 

> **为了防止数据库泄露带来的`用户账号密码安全性问题`，我们即使是在`数据库`中也不会进行`明文存储密码`，而是存储`MD5加密`方法加密后的`一串字符串`。**

![苍穹外卖-day02](./苍穹外卖-day02/img-26.jpg)

![苍穹外卖-day02](./苍穹外卖-day02/img-27.jpg)

> **1.将密码加密后存储，提高安全性**
>
> **2.使用MD5加密方式对明文密码加密**

:::

![苍穹外卖-day02](./苍穹外卖-day02/img-28.jpg)
