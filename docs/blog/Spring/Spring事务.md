---
title: Spring | Spring事务(JdbcTemplate)
tags:
    - Spring
createTime: 2026/03/07 17:37:52
permalink: /blog/aisk3b5b/
cover: ./Spring.jpg
---

![Spring事务](./Spring.jpg)

## JdbcTemplate

+ **环境：导入sql文件**

![Spring事务](./Spring事务/img-1.jpg)

::: tip 

**操作数据库：**

1、**导入包： spring-boot-starter-data-jdbc、mysql-connector-java**

![Spring事务](./Spring事务/img-2.jpg)

2、**配置数据库连接信息：在application.properties 中  spring.datasource.***

![Spring事务](./Spring事务/img-3.jpg)

3、**可以直接使用  DataSource、  JdbcTemplate**

![Spring事务](./Spring事务/img-4.jpg)

:::

+ **Account.java**

```java
package fun.xingji.spring.tx.bean;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Account {
    private Integer id;
    private String username;
    private Integer age;
    private BigDecimal balance;
}
```



+ **Book.java**

```java
package fun.xingji.spring.tx.bean;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Book {
    private Integer id;
    private String bookname;
    private BigDecimal price;
    private Integer stock;
}
```





### 实验1：按照id查询图书(JdbcTemplate)

+ **BookDao.java**

```java
package fun.xingji.spring.tx.dao;

import fun.xingji.spring.tx.bean.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class BookDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 按照id查询图书
     * @param id
     * @return
     */
    public Book getBookById(Integer id) {

        // 1.查询图书的id
        String sql = "select * from book where id = ?";

        // 2.执行查询
        Book book = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Book.class), id);

        // 3.返回结果
        return book;
    }
}
```

![Spring事务](./Spring事务/img-5.jpg)

+ **测试:**

![Spring事务](./Spring事务/img-6.jpg)







### 实验2：添加图书

+ **BookDao.java**

```java
package fun.xingji.spring.tx.dao;

import fun.xingji.spring.tx.bean.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class BookDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 添加图书
     * @param book
     */
    public void addBook(Book book) {
        String sql = "insert into book(bookname, price, stock) values (?, ?, ?)";

        int add = jdbcTemplate.update(sql, book.getBookname(), book.getPrice(), book.getStock());

        // 添加的数据
        System.out.println("添加了" + add + "条数据");
    }
}
```

![Spring事务](./Spring事务/img-7.jpg)

+ **测试:**

![Spring事务](./Spring事务/img-8.jpg)

![Spring事务](./Spring事务/img-11.jpg)





### 实验3：按照id修改图书库存

+ **BookDao.java**

```java
package fun.xingji.spring.tx.dao;

import fun.xingji.spring.tx.bean.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;


@Component
public class BookDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 按照图书id修改图书库存
     * @param bookId 图书id
     * @param num 要减几个
     */
    public void updateBookStock(Integer bookId, Integer num) {
        String sql = "update book set stock = stock - ? where id = ?";

        int update = jdbcTemplate.update(sql, num, bookId);

        System.out.println("更新了" + update + "条数据");
    }
}
```

![Spring事务](./Spring事务/img-9.jpg)

+ **测试:**

![Spring事务](./Spring事务/img-10.jpg)

![Spring事务](./Spring事务/img-12.jpg)





### 实验4：按照id删除图书

+ **BookDao.java**

```java
package fun.xingji.spring.tx.dao;

import fun.xingji.spring.tx.bean.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class BookDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 按照id删除图书
     * @param id
     */
    public void deleteBook(Integer id) {
        String sql = "delete from book where id = ?";

        int delete = jdbcTemplate.update(sql, id);

        System.out.println("删除了" + delete + "条数据");
    }
}
```

![Spring事务](./Spring事务/img-13.jpg)

+ **测试:**

![Spring事务](./Spring事务/img-14.jpg)

![Spring事务](./Spring事务/img-15.jpg)





### 实验5：按照username扣减账户余额

+ **AccountDao.java**

```java
package fun.xingji.spring.tx.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class AccountDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 按照username扣减账户余额
     * @param username 用户名
     * @param delta 扣减的金额
     */
    public void updateUsername(String username , BigDecimal delta){
        String sql="update account set balance = balance - ? where username = ?";

        // 执行SQL
        int update = jdbcTemplate.update(sql, delta, username);

        System.out.println("更新行数：" + update);
    }
}
```

+ **AccountDaoTest.java**

```java
package fun.xingji.spring.tx;

import fun.xingji.spring.tx.dao.AccountDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

@SpringBootTest
public class AccountDaoTest {

    @Autowired
    AccountDao accountDao;

    @Test
    void testUpdate() {
        accountDao.updateUsername("zhangsan", new BigDecimal("9.9"));
    }
}
```

+ **测试:**

![Spring事务](./Spring事务/img-16.jpg)





### 实验6：编写用户购买图书完整方法(结账操作)

+ **UserService.java**

```java
package fun.xingji.spring.tx.service;

public interface UserService {

    /**
     * 用户结账
     * @param username  用户名
     * @param bookId    图书id
     * @param buyNum    购买数量
     */
    void checkout(String username, Integer bookId, Integer buyNum);
}
```

+ **UserServiceImpl.java**

```java
package fun.xingji.spring.tx.service.impl;

import fun.xingji.spring.tx.bean.Book;
import fun.xingji.spring.tx.dao.AccountDao;
import fun.xingji.spring.tx.dao.BookDao;
import fun.xingji.spring.tx.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    BookDao bookDao;

    @Autowired
    AccountDao accountDao;

    @Override
    public void checkout(String username, Integer bookId, Integer buyNum) {
        // 1. 查询图书信息
        Book bookById = bookDao.getBookById(bookId);

        BigDecimal price = bookById.getPrice();
        // 2. 计算扣减额度
        BigDecimal total = new BigDecimal(buyNum).multiply(price);

        // 3. 扣减余额
        accountDao.updateBalanceByUsername(username, total);
        // 4. 扣减库存
        bookDao.updateBookStock(bookId, buyNum);
    }
}
```

+ **AccountDao.java**

```java
package fun.xingji.spring.tx.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class AccountDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    /**
     * 按照username扣减账户余额
     * @param username 用户名
     * @param delta 扣减的金额
     */
    public void updateBalanceByUsername(String username , BigDecimal delta){
        String sql="update account set balance = balance - ? where username = ?";

        // 执行SQL
        int update = jdbcTemplate.update(sql, delta, username);

        System.out.println("更新行数：" + update);
    }
}
```

+ **AccountDaoTest.java**

```java
package fun.xingji.spring.tx;

import fun.xingji.spring.tx.dao.AccountDao;
import fun.xingji.spring.tx.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

@SpringBootTest
public class AccountDaoTest {

    @Autowired
    AccountDao accountDao;

    @Autowired
    UserService userService;

    /*结账操作*/
    @Test
    void testcheckout() {
        userService.checkout("zhangsan",1,3);
    }

    @Test
    void testUpdate() {
        accountDao.updateBalanceByUsername("zhangsan", new BigDecimal("9.9"));
    }
}
```



+ **测试:**

![Spring事务](./Spring事务/img-17.jpg)

![Spring事务](./Spring事务/img-18.jpg)

![Spring事务](./Spring事务/img-19.jpg)





## 声明式事务

::: tip 

1. 声明式 vs 编程式

​	编程式：通过编写业务代码，程序员自行完成指定功能

​	声明式：通过声明业务需求，框架自动完成指定功能

2.声明式事务：

​	定义：只需要告诉框架，这个方法需要事务，框架会自动在运行方法时执行事务的流程控制逻辑。

​	Spring支持：@Transactional

3.@Transactional 属性

![Spring事务](./Spring事务/img-20.jpg)

:::































## 隔离级别





































## 传播行为

