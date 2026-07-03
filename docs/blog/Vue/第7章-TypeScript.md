---
title: TypeScript
tags:
    - TypeScript
    - 前端工程化
createTime: 2026/07/01 20:14:30
permalink: /blog/ez7eunbw/
cover: ./TypeScript.jpg
---
![TypeScript](./TypeScript.jpg)

## TypeScript 介绍

TypeScript 简称『TS』，是微软开发的一个开源的编程语言。

## TS 特点

TS 主要有如下几个特点:

* 完全兼容 JavaScript，是 JavaScript 的超集
* 引入类型系统，可以尽早的定位错误位置，帮助提升开发效率
* 先进的 JavaScript，支持 JavaScript 的最新特性

> TypeScript 在社区的流行度越来越高，它非常适用于一些大型项目，也非常适用于一些基础库，极大地帮助我们提升了开发效率和体验。



## TS 语法

### TS 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用

启动时如果报错，就在根目录创建一个空文件：tsconfig.app.json

![1740935884216](.\assets\1740935884216.png)

脚本标签：

```typescript
<script setup lang="ts">
```



#### 布尔类型

最基本的数据类型就是简单的 true/false 值，在JavaScript 和 TypeScript 里叫做 `boolean`（其它语言中也一样）。

```js
let isDone: boolean = false;
isDone = true;
// isDone = 2 // error
```



#### 数字类型

除了支持十进制和十六进制字面量，也支持二进制和八进制字面量。

```js
let a1: number = 10 // 十进制
let a2: number = 0b1010  // 二进制
let a3: number = 0o12 // 八进制
let a4: number = 0xa // 十六进制
```



#### 字符串类型

JavaScript 程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string` 表示文本数据类型。 和 JavaScript 一样，可以使用双引号（`"`）或单引号（`'`）表示字符串。

```js
let name:string = 'tom'
name = 'jack'
// name = 12 // error
let age:number = 12
const info = `My name is ${name}, I am ${age} years old!`
```



#### 字面量类型

TS 允许限制某个变量为固定的某个值

```js
let z: 521 = 521;
let z2: 'love' = 'love';
// z='abc'; //类型不符 error
```



#### any

any 类型允许变量的值为任意类型, 并且可以进行任意类型的赋值

```js
let a: any = 100;
a = 'iloveyou';
```



#### 对象

object 限制类型为对象,  `用的比较少`

```js
//object 类型
let o: object = {}
o = [];
```



#### 数组

TypeScript 像 JavaScript 一样可以操作数组元素。 有两种方式可以定义数组。 

第一种，可以在`元素类型后面接上[]`，表示由此类型元素组成的一个数组：

第二种方式是使用数组泛型，`Array<元素类型>`：

```js
let arr: number[] = [1,2,3];
// arr.push('abc');// error
let arr2: Array<number> = [4,5,6];
```



#### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```js
let v1: number | string;
v1 = 5211314;
v1 = 'iloveyou'
```



#### 类型断言

类型断言（Type Assertion）可以告诉编译器，“相信我，我知道自己在干什么，别报错，出了事我负责”。联合类型要有

```typescript
(async () => {
  let v: number | string;
  v = await new Promise((resolve) => {
    resolve(3.14);
  })
  //方式一  as
  console.log((v as number).toFixed(2));
  //(v as number) 是 TypeScript 中的 类型断言（Type Assertion），意思是将 v 强制转换为 number 类型。
 //toFixed(2) 是 JavaScript 中 Number 类型的一个方法，用于将数字转换为字符串，并保留指定的小数位数。它将返回一个字符串表示数字，且小数点后保留 2 位。
  //方式二  <类型>
  console.log((<number>v).toFixed(2));
})()
```



#### 类型推断

TS 会在没有明确的指定类型的时候推测出一个类型。主要有下面两种情况

1. 变量声明时赋值了，推断为值对应的类型
2. 变量声明时没有赋值， 推断为 any 类型

```js
let v3 = 100; // number 类型
// v3 = 'loveyou'; //类型 error
let v4; // any 类型
v4 = 100; 
v4 = 'loveyou';
```



### 函数

TypeScript 为 JavaScript 函数添加了额外的功能

#### 参数与返回值类型

TypeScript 可以为参数与返回值设置类型，代码示例如下：

```typescript
function add(x: number, y: number): number {
  return x + y
}

let sub = function(x: number, y: number): number { 
  return x + y
}

let times = (a: number, b: number): number => {
    return a * b;
}
```

>  TypeScript 能够根据返回语句自动推断出返回值类型，因此我们通常省略返回值的类型。



#### 可选参数

TypeScript 默认要求函数实参数量要与形参的数量保持一致，不过可以使用『 ?: 』设置参数为可选参数

```typescript
//截取字符串
function slice(str: string, start: number, end ?: number): string{
    return 'iloveyou';
}
```



#### 参数默认值

TypeScript 与 JavaScript 一样，允许为参数设置默认值

```typescript
//构建手机号
function buildPhone(code:string, area : string = '+86'){
    return area + code;
}
```



### 接口

#### 基本使用

TypeScript 中引入了接口，用来限制对象的结构与类型。代码示例：

```typescript
//声明接口
interface BoyFriend{
    name: string;
    age: number;
}
//声明对象 满足接口结构与类型要求
let zhangsan: BoyFriend = {
    name: '张三',
    age: 18,
}

console.log(zhangsan);
```

> 上述代码中，对象的属性不能多， 也不能少，属性值的类型也必须满足接口的要求



#### 可选属性

如果某些属性不是固定的，只是某些条件下存在，可以使用可选属性配置

```typescript
interface BoyFriend{
    name: string,
    age: number,
    car ?: string
}
```

这样设置之后，对象中的 car 属性就不是必须的属性



#### 限制方法

接口除了可以限制属性类型之外，也可以对对象的方法进行限制

```typescript
interface BoyFriend{
    readonly id: number,
    name: string,
    age: number,
    car ?: string,
    cook: () => void  
}
```

该接口要求对象必须要有 cook 方法且返回结果必须为 undefined



#### 接口的继承

当接口中出现重复结构时，可以对公共部分进行抽离，然后通过继承来简化代码

```typescript
interface BasicInfo{
    name: string,
    age: number,
}

interface BoyFriend extends BasicInfo{
    id: number,
    car ?: string,
    cook: () => void  
}

interface Staff extends BasicInfo{
    programTS: () => void;
}
```



### 泛型

泛型（generic）指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。

#### 引入

下面创建一个函数, 实现功能: 根据指定的数量 `count` 和数据 `value` , 创建一个包含 `count` 个 `value` 的数组 不用泛型的话，这个函数可能是下面这样：

```js
function createArray (count:number,value:any):any[]{
  const arr:any[] = []
  for (let index = 0; index < count; index++) {
    arr.push(value)
  }
  return arr
}

const arr01 = createArray(3,'hello')
const arr02 = createArray(3,100)

console.log(arr01[0].split('')) //运行不报错，但编码时没有提示
console.log(arr02[0].toFixed(3)) //运行不报错，但编码时没有提示
console.log(arr02[0].split('')) //运行报错，但编码时没有提示错误 
```

#### 泛型函数

```js
function createArray <P>(count:number,value:P):P[]{
  const arr:P[]= []
  for (let index = 0; index < count; index++) {
    arr.push(value)
  }
  return arr
}

const arr03 = createArray<string>(3,'hello')
const arr04 = createArray<number>(3,100)
console.log(arr03[0].split(''))
console.log(arr04[0].toFixed(1))
console.log(arr04[0].split('')) //error 类型“number”上不存在属性“split”
```



#### 多个泛型参数的函数

一个函数可以定义多个泛型参数

```js
function createArray <T,P> (a: T, b: P): [T, P] {
  return [a, b]
}

const result = createArray<string, number>('abc', 123)
console.log(result[0].length)
console.log(result[1].toFixed())
```

#### 泛型接口

在定义接口时, 为接口中的属性或方法定义泛型类型
在使用接口时, 再指定具体的泛型类型

```tsx
// 声明一个接口
interface Response<T>{
  status: number,
  headers: object,
  data: T,
}

interface Stu{
  id: number,
  name: string,
  age: number,
}

interface Book{
  id: number,
  title: string,
  price: number
}

//一个对象
let response: Response<Book> = {
  status: 200,
  headers: {},
  data: {
    id: 1,
    title: '西游记',
    price: 28
  }
}

let response2: Response<Stu> = {
  status: 200,
  headers: {},
  data: {
    id: 1,
    name: 'xx',
    age: 19
  }
}
```



### 其他

#### 类型声明

可以使用 type 关键字声明类型

```tsx
//类型声明
type Computer = {
  brand: string,
  price: number
}

interface Person{
  name: string,
  age: number
}

type Persons = Person[];
```









