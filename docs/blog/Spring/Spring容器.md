---
title: Spring | Spring容器(IOC)
tags:
    - Spring
createTime: 2026/02/11 15:18:53
permalink: /blog/q8wt71y8/
cover: ./Spring.jpg
---

![Spring介绍](./Spring.jpg)

## 组件和容器

**组件**

生活中的组件

![Spring容器](./Spring容器/img-1.jpg)

> 组件只能用来存储，没有更多功能。
> 程序中的组件
>
> -   数组
> -   集合：List
> -   集合：Set



**容器**
生活中的容器

![Spring容器](./Spring容器/img-2.jpg)

> 政府管理我们的一生，生老病死都和政府有关。
>
> 程序中的容器
>
> > Servlet 容器能够管理 Servlet(init,service,destroy)、Filter、Listener 这样的组件的一生，所以它是一个容器。
>
> |    名称    |                             时机                             | 次数 |
> | :--------: | :----------------------------------------------------------: | ---- |
> |  创建对象  | 默认情况：接收到第一次请求 &#xA;修改启动顺序后：Web应用启动过程中 | 一次 |
> | 初始化操作 |                         创建对象之后                         | 一次 |
> |  处理请求  |                          接收到请求                          | 多次 |
> |  销毁操作  |                       Web应用卸载之前                        | 一次 |
>
> **我们即将要学习的`SpringIoC 容器`也是一个`容器`。它们不仅要负责`创建组件的对象、存储组件的对象，还要负责调用组件的方法让它们工作`，最终在特定情况下`销毁组件`。**

**总结：Spring管理组件的容器，就是一个复杂容器，不仅存储组件，也可以管理组件之间依赖关系，并且创建和销毁组件等！**



### 一个常见的容器

![Spring容器](./Spring容器/img-3.jpg)

回顾常规的三层架构处理请求流程：

![Spring容器](./Spring容器/img-4.jpg)

整个项目就是由各种组件搭建而成的：

![Spring容器](./Spring容器/img-5.jpg)



## IoC、DI

### IoC 容器

**Spring IoC 容器，负责`实例化`、`配置`和`组装 bean（组件）`核心容器。容器通过`读取配置元数据`来获取有关要`实例化、配置和组装组件`的`指令`**

**IoC：Inversion of Control（控制反转）**

+ **控制：资源的控制权（资源的创建、获取、销毁等）**

+ **反转：和传统的方式不一样了**

> **IoC 主要是针对对象的`创建和调用控制`而言的，也就是说，当应用程序需要使用一个对象时，`不再是应用程序直接创建该对象`，而是由 `IoC 容器来创建和管理`，即控制权由`应用程序`转移到` IoC 容器`中，也就是`“反转”了控制权`。这种方式基本上是通过`依赖查找的方式来实现的`，即 IoC 容器维护着`构成应用程序的对象`，并负责`创建这些对象`。**



**DI ：Dependency Injection（依赖注入）**

+ **依赖：组件的依赖关系，如 NewsController 依赖 NewsServices**

+ **注入：通过setter方法、构造器、等方式自动的注入（赋值）**

> **DI 是指`在组件之间传递依赖关系`的过程中，将`依赖关系`在`容器内部进行处理`，这样就`不必在`应用程序代码中`硬编码对象之间的依赖关系`，实现了`对象之间的解耦合`。在 Spring 中，DI 是通过 `XML 配置文件`或`注解的方式实现`的。它提供了三种形式的`依赖注入`：`构造函数注入`、`Setter 方法注入`和`接口注入`。**



### 演示第一个IoC案例

#### 配置脚手架相关信息

![Spring容器](./Spring容器/img-6.jpg)



#### 选择相关依赖

![Spring容器](./Spring容器/img-7.jpg)



#### 项目结构

![Spring容器](./Spring容器/img-8.jpg)



#### 运行第一个ioc容器

![Spring容器](./Spring容器/img-9.jpg)





## 注册组件

> **注册组件的各种方式**

![Spring容器](./Spring容器/img-10.jpg)



### 实验1：@Bean - 把组件放到容器

+ **Person.java**

```java
package fun.xingji.spring.ioc.bean;

import lombok.Data;

@Data
public class Person {

    private String name;

    private int age;

    private String gender;
}
```

+ **Spring01IocApplication.java**

```java
package fun.xingji.spring.ioc;

import fun.xingji.spring.ioc.bean.Person;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

/**
 * 这个是主入口类，称为主程序类
 */
@SpringBootApplication
public class Spring01IocApplication {

    public static void main(String[] args) {
        // 1.跑起来一个Spring的应用 ApplicationContext：Spring应用上下文对象； IoC容器
        ConfigurableApplicationContext ioc = SpringApplication.run(Spring01IocApplication.class, args);
        System.out.println("ioc = " + ioc);

        System.out.println("=============================");
        // 2.获取到容器中所有组件的名字；容器中装了哪些组件； Spring启动会有很多默认组件
        String[] names = ioc.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println("name = " + name);
        }
    }

    // 3.给容器中注册一个自己的组件；容器中的每个组件都有自己的名字，方法名就是组件的名字
    @Bean("hahaha")
    public Person zhangsan(){
        Person person = new Person();
        person.setName("张三");
        person.setAge(20);
        person.setGender("男");

        return person;
    }
}
```

![Spring容器](./Spring容器/img-11.jpg)





### 实验2：从容器中获取组件(按照名字、类型)

:::tip

> **获取容器中的组件对象；精确获取某个组件**

组件的四大特性：**`(名字、类型)`、`对象`、`作用域`**

> **组件名字`全局唯一`；`组件名重复`了，一定`只会给容器中放`一个`最先声明`的哪个。**
>
> ![Spring容器](./Spring容器/img-16.jpg)

小结：
从容器中获取组件，
  1）组件不存在，抛异常：NoSuchBeanDefinitionException

  2）组件不唯一，
      按照类型只要一个，抛异常：NoUniqueBeanDefinitionException
      按照名字只要一个：精确获取到指定对象
      按照类型获取多个：返回所有组件的集合（Map）

  3）组件唯一存在，正确返回。

:::

#### 组件不存在，抛异常：NoSuchBeanDefinitionException(组件不存在)

![Spring容器](./Spring容器/img-12.jpg)



#### 组件不唯一

+ **按照类型只要一个，抛异常：NoUniqueBeanDefinitionException(组件不唯一)**

![Spring容器](./Spring容器/img-13.jpg)

![Spring容器](./Spring容器/img-14.jpg)

+ **按照名字只要一个：精确获取到指定对象**

![Spring容器](./Spring容器/img-17.jpg)



+ **按照类型获取多个：返回所有组件的集合（Map）**

![Spring容器](./Spring容器/img-15.jpg)





### 实验2.1：组件创建时机和单例特性

+ **Dog.java**

```java
package fun.xingji.spring.ioc.bean;

public class Dog {

    public Dog(){
        System.out.println("Dog构造器...");
    }
}
```

+ **Spring01IocApplication.java**

```java
	/**
     * 创建时机：容器启动过程中就会创建组件对象
     * 单实例特性：所有组件默认是单例的，每次获取直接从容器中拿。容器提前会创建组件
     * @param args
     */
    public static void main(String[] args) {
        // 1.跑起来一个Spring的应用 ApplicationContext：Spring应用上下文对象； IoC容器
        ConfigurableApplicationContext ioc = SpringApplication.run(Spring01IocApplication.class, args);

        System.out.println("=================ioc容器创建完成===================");

        // 2.获取组件
        Dog bean = ioc.getBean(Dog.class);
        System.out.println("bean = " + bean);

        Dog bean1 = ioc.getBean(Dog.class);
        System.out.println("bean1 = " + bean1);

        Dog bean2 = ioc.getBean(Dog.class);
        System.out.println("bean2 = " + bean2);
    }
```

:::tip

+ **创建时机：容器`启动过程中`就会`创建组件对象`**

![Spring容器](./Spring容器/img-18.jpg)

+ **单实例特性：所有组件默认是`单例的`，每次获取`直接从容器中拿`。容器`提前会创建组件`**

![Spring容器](./Spring容器/img-19.jpg)

:::



### 实验3：@Configuration - 配置类

+ **PersonConfig.java**

```java
package fun.xingji.spring.ioc.config;

import fun.xingji.spring.ioc.bean.Person;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration //告诉Spring容器，这是一个配置类
public class PersonConfig {

    @Bean("zhangsan")
    public Person haha(){
        Person person = new Person();
        person.setName("张三2");
        person.setAge(20);
        person.setGender("男");

        return person;
    }

    // 给容器中注册一个自己的组件；容器中的每个组件都有自己的名字，方法名就是组件的名字
    @Bean("zhangsan1")
    public Person zhangsan(){
        Person person = new Person();
        person.setName("张三1");
        person.setAge(20);
        person.setGender("男");

        return person;
    }

    @Bean("lisi")
    public Person lisi(){
        Person person = new Person();
        person.setName("李四");
        person.setAge(20);
        person.setGender("男");

        return person;
    }
}
```

+ **DogConfig.java**

```java
package fun.xingji.spring.ioc.config;

import fun.xingji.spring.ioc.bean.Dog;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DogConfig {

    @Bean
    public Dog dog(){
        return new Dog();
    }
}
```

+ **Spring01IocApplication.java**

```java
/**
 * 组件：框架的底层配置；
 *   配置文件：指定配置
 *   配置类：分类管理组件的配置，配置类也是容器中的一种组件。
 *
 * 创建时机：容器启动过程中就会创建组件对象
 * 单实例特性：所有组件默认是单例的，每次获取直接从容器中拿。容器提前会创建组件
 * @param args
 */
public static void main(String[] args) {
    // 1.跑起来一个Spring的应用 ApplicationContext：Spring应用上下文对象； IoC容器
    ConfigurableApplicationContext ioc = SpringApplication.run(Spring01IocApplication.class, args);

    System.out.println("=================ioc容器创建完成===================");

    // 2.获取组件
    Dog bean = ioc.getBean(Dog.class);
    System.out.println("bean = " + bean);

    Dog bean1 = ioc.getBean(Dog.class);
    System.out.println("bean1 = " + bean1);

    Dog bean2 = ioc.getBean(Dog.class);
    System.out.println("bean2 = " + bean2);
    

    Person zhangsan = (Person) ioc.getBean("zhangsan");
    System.out.println("对象 = " + zhangsan);

    System.out.println("=============================");

    for(String definitionName : ioc.getBeanDefinitionNames()) {
        System.out.println("definitionName = " + definitionName);
    }
}
```

![Spring容器](./Spring容器/img-20.jpg)

![Spring容器](./Spring容器/img-21.jpg)



### 实验4-7：@Controller、@Service、@Respository、@Component - MVC分层注解









### 实验8：@ComponentScan - 批量扫描

















## 注入组件



## 组件生命周期
