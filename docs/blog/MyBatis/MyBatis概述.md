---
title: MyBatis概述
tags:
    - MyBatis
createTime: 2026/01/04 15:40:34
permalink: /blog/ehbjvsro/
cover: ./MyBatis.jpg
---

![MyBatis概述](./MyBatis.jpg)

## MyBatis概述

### 1.1 框架

- 在文献中看到的framework被翻译为框架
- Java常用框架：
   - SSM三大框架：Spring + SpringMVC + MyBatis
   - SpringBoot
   - SpringCloud
   - 等。。
- 框架其实就是对通用代码的封装，提前写好了一堆接口和类，我们可以在做项目的时候直接引入这些接口和类（引入框架），基于这些现有的接口和类进行开发，可以大大提高开发效率。
- 框架一般都以jar包的形式存在。(jar包中有class文件以及各种配置文件等。)
- SSM三大框架的学习顺序：MyBatis、Spring、SpringMVC（仅仅是建议）



### 1.2 三层架构

![MyBatis概述](./MyBatis概述/img-1.jpg)

- 表现层（UI）：直接跟前端打交互（一是接收前端ajax请求，二是返回json数据给前端）
- 业务逻辑层（BLL）：一是处理表现层转发过来的前端请求（也就是具体业务），二是将从持久层获取的数据返回到表现层。
- 数据访问层（DAL）：直接操作数据库完成CRUD，并将获得的数据返回到上一层（也就是业务逻辑层）。
- Java持久层框架：
   - MyBatis
   - Hibernate（实现了JPA规范）
   - jOOQ
   - Guzz
   - Spring Data（实现了JPA规范）
   - ActiveJDBC
   - ......





### 1.3 JDBC不足

- 示例代码1：
```java
// ......
// sql语句写死在java程序中
String sql = "insert into t_user(id,idCard,username,password,birth,gender,email,city,street,zipcode,phone,grade) values(?,?,?,?,?,?,?,?,?,?,?,?)";
PreparedStatement ps = conn.prepareStatement(sql);
// 繁琐的赋值：思考一下，这种有规律的代码能不能通过反射机制来做自动化。
ps.setString(1, "1");
ps.setString(2, "123456789");
ps.setString(3, "zhangsan");
ps.setString(4, "123456");
ps.setString(5, "1980-10-11");
ps.setString(6, "男");
ps.setString(7, "zhangsan@126.com");
ps.setString(8, "北京");
ps.setString(9, "大兴区凉水河二街");
ps.setString(10, "1000000");
ps.setString(11, "16398574152");
ps.setString(12, "A");
// 执行SQL
int count = ps.executeUpdate();
// ......
```

- 示例代码2：
```java
// ......
// sql语句写死在java程序中
String sql = "select id,idCard,username,password,birth,gender,email,city,street,zipcode,phone,grade from t_user";
PreparedStatement ps = conn.prepareStatement(sql);
ResultSet rs = ps.executeQuery();
List<User> userList = new ArrayList<>();
// 思考以下循环中的所有代码是否可以使用反射进行自动化封装。
while(rs.next()){
    // 获取数据
    String id = rs.getString("id");
    String idCard = rs.getString("idCard");
    String username = rs.getString("username");
    String password = rs.getString("password");
    String birth = rs.getString("birth");
    String gender = rs.getString("gender");
    String email = rs.getString("email");
    String city = rs.getString("city");
    String street = rs.getString("street");
    String zipcode = rs.getString("zipcode");
    String phone = rs.getString("phone");
    String grade = rs.getString("grade");
    // 创建对象
    User user = new User();
    // 给对象属性赋值
    user.setId(id);
    user.setIdCard(idCard);
    user.setUsername(username);
    user.setPassword(password);
    user.setBirth(birth);
    user.setGender(gender);
    user.setEmail(email);
    user.setCity(city);
    user.setStreet(street);
    user.setZipcode(zipcode);
    user.setPhone(phone);
    user.setGrade(grade);
    // 添加到集合
    userList.add(user);
}
// ......
```

- JDBC不足：
   - SQL语句写死在Java程序中，不灵活。改SQL的话就要改Java代码。违背开闭原则OCP。
   - 给?传值是繁琐的。能不能自动化？？？
   - 将结果集封装成Java对象是繁琐的。能不能自动化？？？





### 1.4 了解MyBatis

- MyBatis本质上就是对JDBC的封装，通过MyBatis完成CRUD。
- MyBatis在三层架构中负责持久层的，属于持久层框架。
- MyBatis的发展历程：【引用百度百科】
   - MyBatis本是apache的一个开源项目iBatis，2010年这个项目由apache software foundation迁移到了google code，并且改名为MyBatis。2013年11月迁移到Github。
   - iBATIS一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。iBATIS提供的持久层框架包括SQL Maps和Data Access Objects（DAOs）。
- 打开mybatis代码可以看到它的包结构中包含：ibatis
   - ![](./MyBatis概述/img-2.jpg)
- ORM：对象关系映射
   - O（Object）：Java虚拟机中的Java对象
   - R（Relational）：关系型数据库
   - M（Mapping）：将Java虚拟机中的Java对象映射到数据库表中一行记录，或是将数据库表中一行记录映射成Java虚拟机中的一个Java对象。
   - ORM图示
      - ![](./MyBatis概述/img-3.jpg)
      - ![](./MyBatis概述/img-4.jpg)
   - MyBatis属于半自动化ORM框架。
   - Hibernate属于全自动化的ORM框架。
- MyBatis框架特点：
   - 支持定制化 SQL、存储过程、基本映射以及高级映射
   - 避免了几乎所有的 JDBC 代码中手动设置参数以及获取结果集
   - 支持XML开发，也支持注解式开发。【为了保证sql语句的灵活，所以mybatis大部分是采用XML方式开发。】
   - 将接口和 Java 的 POJOs(Plain Ordinary Java Object，简单普通的Java对象)映射成数据库中的记录
   - 体积小好学：两个jar包，两个XML配置文件。
   - 完全做到sql解耦合。
   - 提供了基本映射标签。
   - 提供了高级映射标签。
   - 提供了XML标签，支持动态SQL的编写。
   - ......





## MyBatis入门程序

只要你会JDBC，MyBatis就可以学。

### 2.1 版本

#### 软件版本：

- IntelliJ IDEA：2022.1.4
- Navicat for MySQL：16.0.14
- MySQL数据库：8.0.30

#### 组件版本：

- MySQL驱动：8.0.30
- MyBatis：3.5.10
- JDK：Java17
- JUnit：4.13.2
- Logback：1.2.11





### 2.2 MyBatis下载

- 从github上下载，地址：[https://github.com/mybatis/mybatis-3](https://github.com/mybatis/mybatis-3)
   - ![](./MyBatis概述/img-5.jpg)
   - ![](./MyBatis概述/img-6.jpg)
- 将框架以及框架的源码都下载下来，下载框架后解压，打开mybatis目录
   - ![](./MyBatis概述/img-7.jpg)
   - 通过以上解压可以看到，框架一般都是以jar包的形式存在。我们的mybatis课程使用maven，所以这个jar我们不需要。
   - 官方手册需要。





### 2.3 MyBatis入门程序开发步骤

- 写代码前准备：
   - 准备数据库表：汽车表t_car，字段包括：
      - id：主键（自增）【bigint】
      - car_num：汽车编号【varchar】
      - brand：品牌【varchar】
      - guide_price：厂家指导价【decimal类型，专门为财务数据准备的类型】
      - produce_time：生产时间【char，年月日即可，10个长度，'2022-10-11'】
      - car_type：汽车类型（燃油车、电车、氢能源）【varchar】
   - 使用navicat for mysql工具建表
      - ![](./MyBatis概述/img-8.jpg)
   - 使用navicat for mysql工具向t_car表中插入两条数据，如下：
      - ![](./MyBatis概述/img-9.jpg)
   - 创建Project：建议创建Empty Project，设置Java版本以及编译版本等。
      - ![](./MyBatis概述/img-10.jpg)
      - ![](./MyBatis概述/img-11.jpg)
   - 设置IDEA的maven
      - ![](./MyBatis概述/img-12.jpg)
   - 创建Module：普通的Maven Java模块
      - ![](./MyBatis概述/img-13.jpg)


:::: steps

1. **步骤1：打包方式：jar（不需要war，因为mybatis封装的是jdbc。）**

```xml
<groupId>com.powernode</groupId>
<artifactId>mybatis-001-introduction</artifactId>
<version>1.0-SNAPSHOT</version>
<!--打包方式jar-->
<packaging>jar</packaging>
```



2. **步骤2：引入依赖（mybatis依赖 + mysql驱动依赖）**

```xml
 <!--mybatis依赖-->
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>3.5.19</version>
</dependency>
<!--mysql驱动依赖-->
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>8.0.30</version>
</dependency>
```



3. **步骤3：在resources根目录下新建mybatis-config.xml配置文件（可以参考mybatis手册拷贝）**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="1225"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!--sql映射文件创建好之后，需要将该文件路径配置到这里-->
        <mapper resource=""/>
    </mappers>
</configuration>
```
::: tip 

+ 注意1：`mybatis核心配置文件`的`文件名`不一定是`mybatis-config.xml`，可以是`其它名字`。

+ 注意2：`mybatis核心配置文件`存放的位置`也可以随意`。这里`选择放在resources根下`，相当于放到了`类的根路径下`。

:::



4. **步骤4：在resources根目录下新建CarMapper.xml配置文件（可以参考mybatis手册拷贝）**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--namespace先随意写一个-->
<mapper namespace="car">
    <!--insert sql：保存一个汽车信息-->
    <insert id="insertCar">
        insert into t_car(id,car_num,brand,guide_price,produce_time,car_type)
        values(null,'1003','丰田霸道',30.0,'2000-10-11','燃油车')
    </insert>
</mapper>
```
::: tip 

+ 注意1：**sql语句最后结尾`可以不写“;”`**

+ 注意2：CarMapper.xml文件的名字`不是固定的`。可以`使用其它名字`。

+ 注意3：CarMapper.xml文件的位置`也是随意的`。这里`选择放在resources根下`，相当于放到了`类的根路径下`。

+ 注意4：将`CarMapper.xml文件路径`配置到`mybatis-config.xml`：

```xml
<mapper resource="CarMapper.xml"/>
```

:::



5. **步骤5：编写MyBatisIntroductionTest代码**

```java
package fun.xingji.mybatis.test;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class MyBatisIntroductionTest {
    public static void main(String[] args) throws IOException {
        // 1. 创建SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        
        // 2. 创建SqlSessionFactory对象
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml"); // Resources.getResourceAsStream默认就是从类的根路径下开始查找资源。
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is); // 一般情况下都是一个数据库对应一个SqlSessionFactory对象
        
        // 3. 创建SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        
        // 4. 执行sql
        int count = sqlSession.insert("insertCar"); // 这个"insertCar"必须是sql的id
        
        System.out.println("插入几条数据：" + count);
        // 5. 提交（mybatis默认采用的事务管理器是JDBC，默认是不提交的，需要手动提交。）
        sqlSession.commit();
        
        // 6. 关闭资源（只关闭是不会提交的）
        sqlSession.close();
    }
}
```
::: tip 

+ 注意1：默认采用的`事务管理器`是：`JDBC`。JDBC事务`默认是不提交的`，需要`手动提交`。

:::



6. **步骤6：运行程序，查看运行结果，以及数据库表中的数据**
   
   ![](./MyBatis概述/img-14.jpg)
   
   ![](./MyBatis概述/img-15.jpg)

::::



### 2.4 关于MyBatis核心配置文件的名字和路径详解

- 核心配置文件的名字是随意的，因为以下的代码：

```java
// 文件名是出现在程序中的，文件名如果修改了，对应这里的java程序也改一下就行了。
InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("mybatis-config.xml");
```

- 核心配置文件必须放到resources下吗？放到D盘根目录下，可以吗？测试一下：

> **将mybatis-config.xml文件拷贝一份放到D盘根下，然后编写以下程序：**

```java
package fun.xingji.mybatis;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.FileInputStream;
import java.io.InputStream;

/**
 * 测试mybatis核心配置文件路径问题
 * @author XINGJI
 * @since 1.0
 * @version 1.0
 */
public class MyBatisConfigFilePath {
    public static void main(String[] args) throws Exception{
        // 1. 创建SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        // 2. 创建SqlSessionFactory对象
        // 这只是一个输入流，可以自己new。
        InputStream is = new FileInputStream("D:/mybatis-config.xml"); 
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        // 3. 创建SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 4. 执行sql
        int count = sqlSession.insert("insertCar");
        System.out.println("插入几条数据：" + count);
        // 5. 提交（mybatis默认采用的事务管理器是JDBC，默认是不提交的，需要手动提交。）
        sqlSession.commit();
        // 6. 关闭资源（只关闭是不会提交的）
        sqlSession.close();
    }
}
```
> 以上程序运行后，看到数据库表t_car中又新增一条数据，如下（成功了）：
> ![](./MyBatis概述/img-16.jpg)

::: tip

```java
// 获取SqlSessionFactory对象
InputStream is = Resources.getResourceAsStream("mybatis-config.xml"); 
// Resources.getResourceAsStream默认就是从类的根路径下开始查找资源。

//InputStream is = new FileInputStream("d:\\mybatis-config.xml");

//InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("mybatis-config.xml");
```

+ 经过测试说明mybatis核心配置文件的名字是随意的，`存放路径`也是`随意的`。

  

+ 虽然mybatis核心配置文件的名字不是固定的，但通常该文件的名字叫做：mybatis-config.xml

  

+ 虽然mybatis核心配置文件的路径不是固定的，但通常该文件会存放到**类路径**当中，这样让项目的移植更加健壮。

:::



- 在mybatis中提供了一个类：Resources【org.apache.ibatis.io.Resources】，该类可以从类路径当中获取资源，我们通常使用它来获取输入流InputStream，代码如下

```java
// 这种方式只能从类路径当中获取资源，也就是说mybatis-config.xml文件需要在类路径下。
InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
```

::: tip

```java
InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("mybatis-config.xml");
        ClassLoader.getSystemClassLoader() 获取系统的类加载器。
        系统类加载器有一个方法叫做：getResourceAsStream
        它就是从类路径当中加载资源的。
        通过源代码分析发现：
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            底层的源代码其实就是：
            InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("mybatis-config.xml");
```

:::



::: tip

+ CarMapper.xml文件的名字是固定的吗？CarMapper.xml文件的路径是固定的吗？

  >  都不是固定的。

  + <mapper resource="CarMapper.xml"/> resource属性：这种方式是从类路径当中加载资源。

    

  +  <mapper url="file:///d:/CarMapper.xml"/> url属性：这种方式是从绝对路径当中加载资源。

:::





### 2.5关于mybatis的事务管理机制。（深度剖析）

:::: steps

1. 在mybatis-config.xml文件中，可以通过以下的配置进行mybatis的事务管理

   ```java
   <transactionManager type="JDBC"/>
   ```

2. type属性的值包括两个：

   + JDBC(jdbc)
   + MANAGED(managed)
   + type后面的值，只有以上两个值可选，不区分大小写。

   

3. 在mybatis中提供了两种事务管理机制：

   + 第一种：JDBC事务管理器

   + 第二种：MANAGED事务管理器



4. DBC事务管理器

+ mybatis框架自己管理事务，自己采用原生的JDBC代码去管理事务：

  ```java
  conn.setAutoCommit(false); 开启事务。
  ....业务处理...
  conn.commit(); 手动提交事务
  ```

+ 使用JDBC事务管理器的话，底层创建的事务管理器对象：JdbcTransaction对象。

+ 如果你编写的代码是下面的代码：

  ```java
  SqlSession sqlSession = sqlSessionFactory.openSession(true);
  
  1.表示没有开启事务。因为这种方式压根不会执行：conn.setAutoCommit(false);
  
  2.在JDBC事务中，没有执行conn.setAutoCommit(false);那么autoCommit就是true。
  
  3.如果autoCommit是true，就表示没有开启事务。只要执行任意一条DML语句就提交一次。
  ```



5. MANAGED事务管理器

```java
mybatis不再负责事务的管理了。事务管理交给其它容器来负责。例如：spring。
	我不管事务了，你来负责吧。

	对于我们当前的单纯的只有mybatis的情况下，如果配置为：MANAGED
	那么事务这块是没人管的。没有人管理事务表示事务压根没有开启。

	没有人管理事务就是没有事务。
```



6. JDBC中的事务

```java
JDBC中的事务：
	如果你没有在JDBC代码中执行：conn.setAutoCommit(false);的话，默认的autoCommit是true。

重点：
	以后注意了，只要你的autoCommit是true，就表示没有开启事务。
	只有你的autoCommit是false的时候，就表示开启了事务。
```

::::






### 2.6MyBatis第一个比较完整的代码写法

```java
package fun.xingji.mybatis.test;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * 采用正规的方式，写一个完整的mybatis程序
 */
public class MyBatisCompleteTest {
    public static void main(String[] args) {
        SqlSession sqlSession = null;
        try {
            // 1.创建SqlSessionFactoryBuilder对象
            SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
            // 2.创建SqlSessionFactory对象
            SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatis-config.xml"));

            // 3.创建sqlSession开启会话（底层会开启事务）
            sqlSession = sqlSessionFactory.openSession();

            // 4.执行SQL语句，处理相关业务
            int count = sqlSession.insert("insertCar");
            System.out.println("插入了几条记录：" + count);

            // 执行到这里，没有发生任何异常，提交事务。终止事务。
            sqlSession.commit();
        } catch (Exception e) {
            // 最好回滚事务
            if (sqlSession != null) {
                sqlSession.rollback();
            }
            e.printStackTrace();
        } finally {
            // 关闭会话，释放资源
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
```
运行后数据库表的变化：
![](./MyBatis概述/img-17.jpg)





### 2.67引入JUnit

- JUnit是专门做单元测试的组件。
   - 在实际开发中，单元测试一般是由我们Java程序员来完成的。
   - 我们要对我们自己写的每一个业务方法负责任，要保证每个业务方法在进行测试的时候都能通过。
   - 测试的过程中涉及到两个概念：
      - 期望值
      
      ```java
      // 期望值
      int expected = 3;
      ```
      
      - 实际值
      
      ```java
      // 获取实际值
      int actual = mathService.sum(1, 2);
      ```
   - 期望值和实际值相同表示测试通过，期望值和实际值不同则单元测试执行时会报错。
   
   ```java
   // 加断言进行测试
   Assert.assertEquals(expected, actual);
   ```
   
   
   
- 这里引入JUnit是为了代替main方法。

   

   > **使用JUnit步骤：**

:::: steps

1. 第一步：引入依赖

```xml
<!-- junit依赖 -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```



2. 第二步：编写单元测试类【测试用例】，测试用例中每一个测试方法上使用@Test注解进行标注。

    ::: note

    - 测试用例的名字以及每个测试方法的定义都是有规范的：
        - 测试用例的名字：XxxTest
        - 测试方法声明格式：public void test业务方法名(){}

    :::

```java
// 测试用例
public class CarMapperTest{
    
    // 测试方法
    @Test
    public void testInsert(){}
    
}
```



3. 第三步：可以在类上执行，也可以在方法上执行

    ::: note

    - **`在类上执行`时，该类中`所有的测试方法`都会执行。**
    - **`在方法上执行`时，只执行`当前的测试方法`。**

    :::

    

4. 编写一个测试用例，来测试insertCar业务

```java
package fun.ximngji.mybatis.test;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

public class CarMapperTest {

    @Test
    public void testtestInsertCar() {
        // 编写mybatis方法
        SqlSession sqlSession = null;
        try {
            // 1.创建SqlSessionFactoryBuilder对象
            SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
            // 2.创建SqlSessionFactory对象
            SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatis-config.xml"));

            // 3.创建sqlSession开启会话（底层会开启事务）
            sqlSession = sqlSessionFactory.openSession();

            // 4.执行SQL语句，处理相关业务
            int count = sqlSession.insert("insertCar");
            System.out.println("插入了几条记录：" + count);

            // 执行到这里，没有发生任何异常，提交事务。终止事务。
            sqlSession.commit();
        } catch (Exception e) {
            // 最好回滚事务
            if (sqlSession != null) {
                sqlSession.rollback();
            }
            e.printStackTrace();
        } finally {
            // 关闭会话，释放资源
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
```
执行单元测试，查看数据库表的变化：
![](./MyBatis概述/img-18.jpg)

::::





### 2.8 引入日志框架logback

::: note

- **引入日志框架的目的是为了`看清楚mybatis执行的具体sql`。**
- **启用`标准日志组件`，只需要在`mybatis-config.xml`文件中添加以下配置：【可参考mybatis手册】**
```xml
<settings>
  <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```
标准日志也可以用，但是配置不够灵活，可以集成其他的日志组件，例如：log4j，logback等。

- logback是目前日志框架中性能较好的，较流行的，所以我们选它。

  :::

  >  **引入logback的步骤：**


:::: steps

1. 第一步：引入logback相关依赖

```xml
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.2.11</version>
  <scope>test</scope>
</dependency>
```



2. 第二步：引入logback相关配置文件（文件名叫做logback.xml或logback-test.xml，放到类路径当中）

```xml
<?xml version="1.0" encoding="UTF-8"?>

<configuration debug="false">
    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>[%thread] %-5level %logger{50} - %msg%n</pattern>
        </encoder>
    </appender>

    <!--mybatis log configure-->
    <logger name="com.apache.ibatis" level="TRACE"/>
    <logger name="java.sql.Connection" level="DEBUG"/>
    <logger name="java.sql.Statement" level="DEBUG"/>
    <logger name="java.sql.PreparedStatement" level="DEBUG"/>

    <!-- 日志输出级别,logback日志级别包括五个：TRACE < DEBUG < INFO < WARN < ERROR -->
    <root level="DEBUG">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </root>

</configuration>
```



3. 再次执行单元测试方法testInsertCar，查看控制台是否有sql语句输出
    ![](./MyBatis概述/img-19.jpg)

::::





### 2.9 MyBatis工具类SqlSessionUtil的封装

- 每一次获取SqlSession对象代码太繁琐，封装一个工具类
```java
package fun.xingji.mybatis.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;

/**
 * mybatis工具类
 */
public class SqlSessionUtil {

    // 工具类的构造方法一般都是私有化的。
    // 工具类中所有的方法都是静态的，直接采用类名即可调用。不需要new对象。
    // 为了防止new对象，构造方法私有化。
    private SqlSessionUtil(){}

    private static SqlSessionFactory sqlSessionFactory;

    // 类加载时执行
    // SqlSessionUtil工具类在进行第一次加载的时候，解析mybatis-config.xml文件。创建SqlSessionFactory对象。
    static {
        try {
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

   /* public static SqlSession openSession(){
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        // SqlSessionFactory对象：一个SqlSessionFactory对应一个environment，一个environment通常是一个数据库。
        SqlSessionFactory  sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = sqlSessionFactory.openSession();
        return sqlSession;
    }*/

    /**
     * 获取会话对象。
     * @return 会话对象
     */
    public static SqlSession openSession(){
        return sqlSessionFactory.openSession();
    }
}
```

- 测试工具类，将testInsertCar()改造
```java
@Test
public void testInsertCarByUtil(){
      SqlSession sqlSession = SqlSessionUtil.openSession();
      // 执行SQL
      int count = sqlSession.insert("insertCar");
      System.out.println("插入了几条记录:" + count);
      sqlSession.commit();
      sqlSession.close();
}
```

![](./MyBatis概述/img-21.jpg)

![](./MyBatis概述/img-20.jpg)



















