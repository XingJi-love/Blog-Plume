---
title: Spring | Spring面向切面编程(AOP)
tags:
    - Spring
createTime: 2026/03/03 19:14:57
permalink: /blog/jkmdptdl/
cover: ./Spring.jpg
---

![Spring介绍](./Spring.jpg)

## AOP 场景

::: tip 

**AOP：Aspect Oriented Programming（面向切面编程）**

**OOP：Object Oriented Programming（面向对象编程）**

> **场景设计:**
>
> + **设计：编写一个计算器`接口`和`实现类`，提供`加减乘除`四则运算**
>
> + **需求：在加减乘除运算的时候需要记录操作**日志**（运算前参数、运算后结果）**
>
> + **实现：**
>   + **静态代理**
>   + **动态代理**
>   + **AOP**

![Spring介绍](./Spring面向切面编程/img-1.jpg)

:::

+ **MathCalculator.java(计算器接口)**

```java
package fun.xingji.spring.aop.calculator;

public interface MathCalculator {

    //定义 四则运算
    int add(int i,int j);

    //减法
    int sub(int i,int j);

    //乘法
    int mul(int i,int j) ;

    //除法
    int div(int i,int j);
}
```



+ **MathCalculatorImpl.java(计算器实现类)**

```java
package fun.xingji.spring.aop.calculator.impl;

import fun.xingji.spring.aop.calculator.MathCalculator;
import org.springframework.stereotype.Component;

/**
 * 日志：
 * 1、硬编码： 不推荐； 耦合：（通用逻辑 + 专用逻辑）希望不要耦合； 耦合太多就是维护地狱
 * 2、静态代理：
 *      定义：定义一个代理对象，包装这个组件。以后业务的执行，从代理开始，不直接调用组件；
 *      特点：定义期间就指定好了互相代理关系
 */

@Component
public class MathCalculatorImpl implements MathCalculator {

    @Override
    public int add(int i, int j) {
        // System.out.println("【日志】add 开始：参数："+i+","+j);
        int result = i + j;
        // System.out.println("【日志】add 返回：结果："+result);
        return result;
    }

    @Override
    public int sub(int i, int j) {

        int result = i - j;

        return result;
    }

    @Override
    public int mul(int i, int j) {

        int result = i * j;

        return result;
    }

    @Override
    public int div(int i, int j) {

        int result = i / j;

        return result;
    }
}
```





### 日志 - 硬编码与静态代理

::: note 

**日志：**

1、**硬编码：` 不推荐`； `耦合`：（通用逻辑 + 专用逻辑）希望`不要耦合`； 耦合太多就是`维护地狱`**

2、**静态代理：**

 * **定义：定义一个`代理对象`，包装`这个组件`。以后业务的执行，从`代理开始`，不`直接调用组件`；**
 * **特点：定义期间就指定好了`互相代理关系`**

:::

+ **硬编码**

![Spring介绍](./Spring面向切面编程/img-2.jpg)



+ **静态代理**

::: tip  

**扩展：静态代理**

> **概念：编码时介入：`包装真实对象`，对外提供`静态代理对象`**

**实现步骤：**

**1、包装被代理对象**

> **在代理类中`定义一个成员变量`，用于`持有被代理对象的引用`，并通过`构造器传入具体的被代理对象实例`，实现`包装`。**

+ **CalculatorStaticProxy.java**

```java
public class CalculatorStaticProxy implements MathCalculator {
    private MathCalculator target; // 包装被代理对象

    public CalculatorStaticProxy(MathCalculator target) {
        this.target = target; // 通过构造器注入目标对象
    }
    // ...
}
```



**2、实现被代理对象的接口**

> **代理类必须`实现与被代理对象`相同的`接口`，以确保代理对象可以`无缝替代目标对象`，客户端`无需感知代理的存在`。**

+ **CalculatorStaticProxy.java**

```java
public class CalculatorStaticProxy implements MathCalculator {
    // ... 实现接口中的所有方法
    @Override
    public int add(int i, int j) {
        System.out.println("【日志】add 开始：参数："+i+","+j);
        int result = target.add(i, j);
        System.out.println("【日志】add 返回：结果："+result);
        return result;
    }

    @Override
    public int sub(int i, int j) {
        int result = target.sub(i, j);
        return result;
    }

    @Override
    public int mul(int i, int j) {
        int result = target.mul(i, j);
        return result;
    }

    @Override
    public int div(int i, int j) {
        int result = target.div(i, j);
        return result;
    }
}
```



**3、运行时调用被代理对象的真实方法**

> **在代理类实现的接口方法中，调用目标对象的同名方法执行核心业务逻辑，同时可在调用前后添加增强功能（如日志、权限校验等）**

+ **对应代码**（以`add`方法为例）：

```java
@Override
public int add(int i, int j) {
    // 前置增强
    System.out.println("【日志】add 开始：参数："+i+","+j);
    // 调用被代理对象的真实方法
    int result = target.add(i, j);
    // 后置增强
    System.out.println("【日志】add 返回：结果："+result);
    return result;
}
```



**4、外部使用代理对象调用**

> **客户端代码不再直接调用目标对象，而是通过代理对象来执行方法，从而获得增强后的行为。**

```java
// 创建目标对象
MathCalculator target = new MathCalculatorImpl();
// 创建代理对象，并包装目标对象
MathCalculator proxy = new CalculatorStaticProxy(target);
// 通过代理对象调用方法（实际执行的是增强后的逻辑）
int add = proxy.add(1, 2);
System.out.println(add);
```



::: info

优点：实现简单

缺点：需要为不同类型编写不同代理类，导致扩展维护性差  

::: 

:::

![Spring介绍](./Spring面向切面编程/img-3.jpg)



### 动态代理













## 专业术语





























## AOP 实现





























## AOP 细节