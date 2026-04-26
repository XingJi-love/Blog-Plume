---
title: Redis | Redis常用数据类型和命令
tags:
    - Redis
createTime: 2026/04/24 23:53:02
permalink: /blog/kbrl0sud/
cover: ./Redis.jpg
---

![Redis常用数据类型和命令](./Redis.jpg)

## 相关命令

```纯文本
1 如何对键进行一些操作
2 String类型的value值如何进行操作
3 List 类型的value如何进行操作
4 Set类型的value如何进行操作
5 Hash类型的value如何进行操作
6 Zset类型的value如何进行操作
```

> **redis常见数据类型操作命令的帮助文档**

[https://redis.com.cn/commands.html](https://redis.com.cn/commands.html)

![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-30.jpg)



## 第一节 key操作的相关命令

| 语法              | 功能                                                         |
| ----------------- | ------------------------------------------------------------ |
| **keys \***       | **查看`当前库所有key` (匹配：keys \*1)**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-1.jpg) |
| **exists key**    | **判断`某个key是否存在`(用于分布式锁)**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-2.jpg) |
| **type key**      | **查看你的`key是什么类型`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-3.jpg) |
| **del key**       | **删除`指定的key数据`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-4.jpg) |
| **unlink key**    | **非阻塞删除,仅将keys从keyspace元数据中删除，`真正的删除会在后续异步操作`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-5.jpg) |
| **expire key 10** | **10秒钟：为给定的`key设置过期时间`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-6.jpg) |
| **ttl key**       | **查看`还有多少秒过期`，`-1`表示`永不过期`，`-2`表示`已过期`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-6.jpg) |
| **select**        | **命令`切换数据库`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-7.jpg) |
| **dbsize**        | **查看`当前数据库的key的数量`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-8.jpg) |
| **flushdb**       | **清空`当前库`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-9.jpg) |
| **flushall**      | **清空`全部库`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-10.jpg) |





## 第二节 字符串类型(String)

### 2.1 简介

![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-37.jpg)

::: tip

1. **String是Redis最基本的类型，你可以理解成与`Memcached一模一样的类型`，`一个key对应一个value`。**

2. **String类型是`二进制安全的`。意味着Redis的string可以包含任何数据。比如`jpg图片或者序列化的对象`。**

3. **String类型是Redis最基本的数据类型，一个Redis中`字符串value最多可以是512M`**

:::

### 2.2 常用命令

| 语法                                                  | 解释                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| **set \<key\>\<value\>**                              | **添加`键值对`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-11.jpg) |
|                                                       | NX：当数据库中key不存在时，可以将key-value添加数据库         |
|                                                       | XX：当数据库中key存在时，可以将key-value添加数据库，与NX参数互斥 |
|                                                       | EX：key的超时秒数                                            |
|                                                       | PX：key的超时毫秒数，与EX互斥                                |
| **get \<key\>**                                       | **查询`对应键值`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-12.jpg) |
| **append \<key\>\<value\>**                           | **将给定的\<value\> 追加到`原值的末尾`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-13.jpg) |
| **strlen \<key\>**                                    | **获得`值的长度`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-14.jpg) |
| **setnx \<key\>\<value\>**                            | **只有在 key`不存在时设置 key 的值`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-15.jpg) |
| **incr \<key\>**                                      | **将 key 中储存的`数字值增1`,只能`对数字值操作`，如果`为空`，`新增值为1`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-16.jpg) |
| **decr \<key\>**                                      | **将 key 中储存的`数字值减1`,只能`对数字值操作`，如果`为空`，`新增值为-1`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-17.jpg) |
| **incrby / decrby \<key\>\<步长\>**                   | **将 key 中储存的`数字值增减`。`自定义步长`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-18.jpg) |
| **mset \<key1\>\<value1\>\<key2\>\<value2\> .....**   | **同时设置一个或多个 key-value对**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-19.jpg) |
| **mget \<key1\>\<key2\>\<key3\> .....**               | **同时获取一个或多个 value**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-20.jpg) |
| **msetnx \<key1\>\<value1\>\<key2\>\<value2\> .....** | **同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。有一个失败则都失败(原子性)** |
| **getrange \<key\>\<起始位置\>\<结束位置\>**          | 获得值的范围，类似java中的substring，**前包，后包**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-21.jpg) |
| **setrange \<key\>\<起始位置\>\<value\>**             | 用 \<value\> 覆写\<key\>所储存的字符串值，从\<起始位置\>开始(**索引从0**开始)。 |
| **setex \<key\> \<过期时间\> \<value\>**              | **设置`键值`的同时，设置`过期时间，单位秒`。**               |
| **getset \<key\>\<value\>**                           | **以新换旧，设置了新值同时获得旧值。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-22.jpg) |

::: tip

> **redis指令运行的原子性**

-   **所谓原子操作是指不会被线程调度机制打断的操作；这种操作一旦开始，就一直运行到结束，中间不会有任何 context switch （切换到另一个线程）。**
    -   **（1）在单线程中， 能够在`单条指令中完成的操作`都可以认为是`"原子操作"`，因为中断`只能发生于指令之间`。**
    -   **（2）在多线程中，`不能被其它进程（线程）打断`的操作就叫`原子操作`。**
    -   **（3）Redis单命令的原子性主要得益于的`单线程`。**

> **问题 JAVA中的 a++ 是否具有原子性**

**原子性：**即不可分割性。比如 a=0；（a非long和double类型） 这个操作是不可分割的，那么我们说这个操作是原子操作。再比如：a++； 这个操作实际是a = a + 1；是可分割的，所以他不是一个原子操作。非原子操作都会存在线程安全问题，需要**使用同步技术（sychronized）或者锁（Lock）来让它变成一个原子操作**。一个操作是原子操作，那么我们称它具有原子性。

:::



### 2.3 数据结构

::: tip

String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配.

![](./image/t2_PyJD5svSPN.png)

如图中所示，内部为当前字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。

:::



## 第三节 Redis 列表(List)

### 3.1 简介

![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-38.jpg)

::: tip

**单键多值, 一个键下的value是一个List.Redis 列表是简单的字符串列表，`按照插入顺序排序`。你可以添加一个元素到列表的`头部（左边）`或者`尾部（右边）`。它的底层实际是个`双向链表`，对两端的操作`性能很高`，通过索引下标的操作中间的节点性能会较差。**

![](./image/t3_-u-scVSY5m.png)

:::



### 3.2 常用命令

| 语法                                                       | 功能                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| **lpush/rpush \<key\>\<value1\>\<value2\>\<value3\> ....** | **`从左边/右边`插入`一个或多个值`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-23.jpg)![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-24.jpg)![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-25.jpg) |
| **lpop/rpop \<key\>**                                      | **从左边/右边吐出一个值。`值在键在，值光键亡`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-26.jpg) |
| **rpoplpush \<key1\>\<key2\>**                             | **从\<key1\>列表右边吐出一个值，插到\<key2\>列表左边**       |
| **lrange \<key\>\<start\>\<stop\>**                        | **按照索引下标获得元素(从左到右)**                           |
|                                                            | **0左边第一个，-1右边第一个，（0 -1表示获取所有）**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-24.jpg) |
| **lindex \<key\>\<index\>**                                | **按照`索引下标获得元素(从左到右)`**                         |
| **llen \<key\>**                                           | **获得`列表长度`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-27.jpg) |
| **linsert \<key\> before \<value\>\<newvalue\>**           | **在\<value\>的前面插入\<newvalue\>插入值**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-28.jpg) |
| **linsert \<key\> after \<value\>\<newvalue\>**            | **在\<value\>的后面插入\<newvalue\>插入值**                  |
| **lrem \<key\>\<n\>\<value\>**                             | **从左边`删除n个value(从左到右)`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-29.jpg) |
| **lset\<key\>\<index\>\<value\>**                          | **将列表key下标为index的值替换成value**                      |



### 3.3 数据结构

::: tip

**List的数据结构为快速链表quickList。首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。它将所有的元素紧挨着一起存储，分配的是一块连续的内存。当数据量比较多的时候才会改成quicklist。因为普通的链表需要的附加指针空间太大，会比较浪费空间。比如这个列表里存的只是int类型的数据，结构上还需要两个额外的指针prev和next。**

![](./image/t4_m8O96K0uZ0.png)

**Redis将链表和ziplist结合起来组成了quicklist。也就是将多个ziplist使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。***

:::



## 第四节Redis 集合(Set)

### 4.1 简介

![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-40.jpg)

::: tip

&#x20;   Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以**自动排重**的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。

&#x20;   Redis的Set是string类型的无序集合。它底层其实是一个value为null的hash表，所以添加，删除，查找的**复杂度都是O(1)**。一个算法，随着数据的增加，执行时间的长短，如果是O(1)，数据增加，查找数据的时间不变  &#x20;

:::

### 4.2 常用命令

| 语法                                         | 功能                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| **sadd \<key\>\<value1\>\<value2\> .....**   | **将一个或多个 member 元素`加入到集合 key 中`，已经`存在的 member 元素`将被`忽略`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-32.jpg) |
| **smembers \<key\>**                         | **取出`该集合的所有值`。**                                   |
| **sismember \<key\>\<value\>**               | **判断集合\<key\>是否为含有该\<value\>值，有1，没有0**       |
| **scard\<key\>**                             | **返回该集合的元素个数。**                                   |
| **srem \<key\>\<value1\>\<value2\> ....**    | **删除集合中的某个元素。**                                   |
| **spop \<key\>**                             | **随机从该集合中`吐出一个值`**                               |
| **spop \<key\>\<N\>**                        | **随机从该集合中`吐出N个值`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-36.jpg) |
| **srandmember \<key\>\<n\>**                 | **随机从该集合中取出n个值。不会从集合中删除 。**             |
| **smove \<source\>\<destination\>\<value\>** | **把集合中一个值从一个集合移动到另一个集合**                 |
| **sinter \<key1\>\<key2\>**                  | **返回两个集合的`交集元素`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-33.jpg) |
| **sunion \<key1\>\<key2\>**                  | **返回两个集合的`并集元素`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-34.jpg) |
| **sdiff \<key1\>\<key2\>**                   | **返回两个集合的**差集**元素(`key1中的，不包含key2中的`)**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-35.jpg) |

### 4.2 数据结构

::: tip

**Set数据结构是`dict字典`，字典是`用哈希表实现的`。Java中HashSet的内部实现`使用的是HashMap`，只不过所有的value都指向`同一个对象`。Redis的set结构也是一样，它内部也使用hash结构，`所有value都指向同一个内部值`。**

:::



## 第五节 Redis 哈希(Hash)

### 5.1 简介

![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-39.jpg)

::: tip

**Redis hash 是`一个键值对集合`。Redis hash是`一个string类型的field和value的映射表`，hash特别`适合用于存储对象`。类似Java里面的Map\<String,Object\>用户ID为查找的key，存储的`value用户对象`包含`姓名，年龄，生日等信息`**

![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-50.jpg)

- **方式1  单key+序列化 .问题:每次修改用户的某个属性需要，先反序列化改好后再序列化回去。开销较大。**

  ![image-20230706110321231](./image/image-20230706110321231.png)

- **方式2 多key-value .问题:用户ID数据冗余 &#x20;**

  ![image-20230706110341117](./image/image-20230706110341117.png)

- **方式3 单key + 多(field+value)**

![image-20230706110256007](./image/image-20230706110256007.png)

* **通过 key(用户ID) + field(属性标签) 就可以操作对应属性数据了，既不需要重复存储数据，也不会带来序列化和并发修改控制的问题**&#x20;

:::



### 5.2 常用命令

| 语法                                                         | 功能                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **hset \<key\>\<field\>\<value\>\<field\>\<value\>**         | **给\<key\>集合中的 \<field\>键赋值\<value\>**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-51.jpg) |
| **hget \<key1\>\<field\>**                                   | **从\<key1\>集合\<field\>取出 value**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-52.jpg) |
| **hmset \<key1\>\<field1\>\<value1\>\<field2\>\<value2\>...** | **批量设置hash的值**                                         |
| **hexists\<key1\>\<field\>**                                 | **查看哈希表 key 中，给定域 field 是否存在。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-53.jpg) |
| **hkeys \<key\>**                                            | **列出该hash集合的所有field**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-54.jpg) |
| **hvals \<key\>**                                            | **列出该hash集合的所有value**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-55.jpg) |
| **hincrby \<key\>\<field\>\<increment\>**                    | **为哈希表 key 中的域 field 的值加上增量 1 -1**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-56.jpg) |
| **hsetnx \<key\>\<field\>\<value\>**                         | **将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 .**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-57.jpg) |

### 5.3 数据结构

::: tip

**Hash类型对应的数据结构是两种：`ziplist（压缩列表）`，`hashtable（哈希表）`。当field-value`长度较短且个数较少`时，`使用ziplist`，否则`使用hashtable`。**

:::



## 第六节 Redis 有序集合Zset

### 6.1 简介

![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-41.jpg)

::: tip

**Redis有序集合zset与普通集合set非常相似，是一个没有重复元素的字符串集合。不同之处是有序集合的每个成员都关联了一个评分（score）,这个评分（score）被用来按照从最低分到最高分的方式排序集合中的成员。集合的成员是唯一的，但是评分可以是重复了 。因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。**

:::



### 6.2 常用命令

| 语法                                                         | 功能                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **zadd \<key\>\<score1\>\<value1\>\<score2\>\<value2\>…**    | **将一个或多个 member 元素及其 score 值加入到有序集 key 当中。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-42.jpg) |
| **zrange\<key\>\<start\>\<stop\>  \[WITHSCORES]**            | **`升序返回`有序集 key 中，下标在\<start\>\<stop\>之间的元素,`0代表第一个元素索引,-1代表最后一个元素索引`.带WITHSCORES，可以让分数一起和值返回到结果集。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-43.jpg) |
| **zrevrange \<key\>\<start\>\<stop\> \[WITHSCORES]**         | **`降序返回`有序集 key 中，下标在\<start\>\<stop\>之间的元素,`0代表第一个元素索引,-1代表最后一个元素索引`.带WITHSCORES，可以让分数一起和值返回到结果集**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-44.jpg) |
| **zrangebyscore \<key\> \<min\> \<max\> \[withscores] \[limit offset count]** | **返回有序集 key 中，所有 score 值`介于 min 和 max 之间(包括等于 min 或 max )的成员`。有序集成员按 score 值递增`(从小到大)次序排列`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-45.jpg) |
| **zrevrangebyscore \<key\> \<max\> \<min\> \[withscores] \[limit offset count]** | **同上，改为`从大到小排列`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-46.jpg) |
| **zincrby \<key\>\<increment\>\<value\>**                    | **为元素的`score加上增量`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-47.jpg) |
| **zrem \<key\>\<value\>**                                    | **删除该集合下，指定值的元素**                               |
| **zcount \<key\>\<min\>\<max\>**                             | **统计该集合，`分数区间内的元素个数`**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-48.jpg) |
| **zrank \<key\>\<value\> \| zrevrank**                       | **返回该值在`集合中的排名`，`从0开始`。**![Redis常用数据类型和命令](./Redis常用数据类型和命令/img-49.jpg) |

案例：如何利用zset实现一个文章访问量的排行榜？

![](./image/r1_p0CpjaSfLZ.png)

### 6.3 数据结构

::: tip

**SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map\<String, Double\>，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。**

:::





## 第7节 Redis 综合练习

1. 例如，假设用户ID为1，用户名为Alice，电子邮件为alice@example.com，注册时间为2023-09-12 10:00:00!

   ``` bash
   方案1：string key处理 
   	user:1:id 1  user:1:name alice user:1:email xxx ...
   方案2：hash 
   	user:1 id 1 name alice ...
   方案3：json(string 序列化)
   	user:1 {id:1,name:alice...}
   ```

2. 例如，假设商品ID为1，名称为iPhone 12，描述为一款先进的智能手机，价格为999美元，库存为100，上架时间为2023-09-12 12:00:00

   ``` bash
   方案1：string key处理 
   	user:1:id 1  user:1:name alice user:1:email xxx ...
   方案2：hash 
   	user:1 id 1 name alice ...
   方案3：json(string 序列化)
   	user:1 {id:1,name:alice...}
   ```

3. 正在开发一个实时消息系统，需要保存每个用户的最近聊天记录，最多保留最近的 10 条消息。请问如何使用 Redis 的xx类型保存每个用户的聊天记录，并限制列表长度为 10？[list]

   ``` bash
   lpush chat:1 在吗 在吗 在吗 说句话啊 你男朋友也在啊 那你俩吃不吃早餐啊  我是不是要订两份啊 。。。
   
   lrange chat:1 0 9 [最新数据] # 列出最新的10条聊天记录
   
   ltrim key(chat:1) 0 9 [list左边10条] # 删除最新的10条聊天记录
   ```

4. 正在构建一个社交网络应用，需要保存每个用户的好友列表。请问如何使用 Redis 的xx类型存储每个用户的好友列表，并支持添加、删除好友，以及判断是否是好友的操作？[set]

   例如，假设用户ID为1，好友ID为2、3、4，您可以使用以下命令将好友添加到用户对应的集合中

   ``` bash
   sadd fds:1 2 3 4 # 用户1增加好友2 3 4
   sadd fds:2 3 4 5 # 用户2增加好友3 4 5
   sinter fds:1 fds:2 # 用户1和用户2的交集
   
   sismember fds:1 3 # 判断用户1是否存在好友3
   sadd fds:1 5 # 用户1增加好友5
   srem fds:1 4 # 移除用户1的好友4
   ```

5. 正在开发一个在线竞赛平台，需要保存每个参赛选手的成绩(zset)，并根据成绩进行排名。请问如何使用 Redis 的xx类型存储每个选手的成绩，并实现按成绩排序的功能？

   例如，假设选手ID为1，成绩为90，选手ID为2，成绩为80..

   ``` bash
   zadd ranks 90 1 80 2 ....
   ```

6. 正在开发一个实时统计系统，需要记录每个用户的在线时长和登录次数，并按用户 ID 进行统计。请问如何使用 Redis 的xxx实现用户的在线时长和登录次数的记录？

   例如，假设用户ID为1，在线时长为3600秒，登录次数为10次!

   ``` bash
   方案1：string key处理 
   	user:1:id 1  user:1:name alice user:1:email xxx ...
   方案2：hash 
   	user:1 id 1 name alice ...
   方案3：json(string 序列化)
   	user:1 {id:1,name:alice...}
   ```



## 练习题

### 1. 用户会话管理 （hash, 长key, json）
> **场景**：需要`存储用户的会话信息`，包括`会话ID、用户ID、创建时间和过期时间`。  
>
> **问题**：请问如何使用Redis的xx类型存储会话信息，并支持根据会话ID快速查找？

**方案一：Hash 类型**
```bash
# 使用哈希存储会话的各个字段
hset session:1 id 1 user 1 createtime 2020 timeout 2022
# hset 会话key 字段名 字段值 ...  一次性设置多个字段
# 快速查找某字段：hget session:1 user   -> 返回 "1"
```

**方案二：长 key（String 类型分散存储）**

```bash
# 每个字段单独使用一个String key
set session:1:id 1          # 存储会话ID
set session:1:user 1        # 存储用户ID
set session:1:createtime 2020  # 存储创建时间
set session:1:timeout 2022  # 存储过期时间
# 查找时直接 get session:1:user
```

**方案三：JSON 字符串**
```bash
# 将对象序列化为JSON字符串后存入一个String key
set session:1 '{"id":1,"user":1,"createtime":2020,"timeout":2022}'
# 读取时获取整个JSON，然后在应用层解析
```



### 2. 商品库存管理 (hash, 长key)

> **场景**：需要`存储商品的库存信息`，包括`商品ID、名称、库存数量`。  
>
> **问题**：请问如何使用Redis的xx类型存储商品库存信息，并支持库存数量的增减操作？

**方案一：Hash 类型**
```bash
# 初始化商品信息
hset product:1 id 1 name 可比克 stock 10
# hset 商品哈希 key 字段 值 ...

# 库存增加或减少（原子操作）
hincrby product:1 stock 10   # 库存 +10
hincrby product:1 stock -3   # 库存 -3
# 查看库存：hget product:1 stock
```

**方案二：长 key（String 类型）**
```bash
# 各字段单独存储为String
set product:1:id 1
set product:1:name 可比克
set product:1:stock 10

# 库存增减操作（原子操作）
incrby product:1:stock 10    # 库存 +10
decrby product:1:stock 3     # 库存 -3
```



### 3. 用户点赞统计 (set)

> **场景**：需要`记录某篇文章被哪些用户进行了点赞`，也需要`统计某篇文章的点赞总数`。  
>
> **问题**：请问如何使用Redis的xx类型存储点赞信息，并支持快速统计点赞总数，以及查询某个用户是否点赞？

**Set 类型实现**
```bash
# 用户点赞：将用户ID加入文章对应的Set
sadd blog:1 1 2 3 4 5 6 7   # 文章1被用户1-7点赞
# sadd 文章点赞集合 用户ID [用户ID ...]

# 统计点赞总数
scard blog:1                 # 返回集合元素个数，即点赞总数 -> 7

# 查询某个用户是否点赞
sismember blog:1 3           # 判断用户3是否在集合中，返回1表示存在，0不存在
```



### 4. 热门文章排行榜 (zset)

> **场景**：需要`根据文章的阅读量生成一个热门文章（文章id和阅读量）排行榜`。  
>
> **问题**：请问如何使用Redis的xx类型存储文章阅读量，获取阅读量最高的前10篇文章？

**Sorted Set 类型实现**

```bash
# 记录或更新文章阅读量（分数）
zadd ranks 100 1 200 2 60 3 70 4
# zadd 排行榜key 分数1 成员1 分数2 成员2 ...
# 1号文章阅读量100，2号200，3号60，4号70

# 获取阅读量最高的前10篇文章（从高到低）
zrevrange ranks 0 9 withscores
# zrevrange 按分数从大到小返回，0 9 表示索引范围（第1到第10），withscores 同时返回分数

# 查询某篇文章的排名（从高到低，0表示第1名）
zrevrank ranks 3            # 查询文章3的排名，返回3（即第4名）
```



### 5. 用户消息队列 (list)

> **场景**：需要`实现一个简单的消息队列`，支持`消息的入队和出队操作`。  
>
> **问题**：请问如何使用Redis的xx类型实现消息队列？

**List 类型实现（FIFO 队列）**

```bash
# 生产者：将消息放入队列（左侧入队）
lpush messages 1 2 3 4 5 6
# lpush 队列key 消息...   列表从左到右依次变为 [6,5,4,3,2,1]

# 消费者：从队列右侧取出消息（右侧出队，实现先进先出）
rpop messages               # 返回 "1"，队列变为 [6,5,4,3,2]
# 重复 rpop 即可依次取出 2,3,4,5,6
```



### 6. 用户黑名单管理 (set)

> **场景**：需要`存储用户的黑名单列表`，并支持`快速判断某个用户是否在黑名单中`。  
>
> **问题**：请问如何使用Redis的xx类型存储用户黑名单？

**Set 类型实现**
```bash
# 将用户ID加入黑名单集合
sadd blacks 1 2 3 4         # sadd 黑名单集合key 用户ID...

# 判断某用户是否在黑名单中
sismember blacks 1          # 返回1表示存在，0表示不存在

# 查看黑名单总人数
scard blacks                # 返回集合基数

# 从黑名单中移除某用户
srem blacks 1               # srem 集合key 用户ID，返回1表示移除成功
```
