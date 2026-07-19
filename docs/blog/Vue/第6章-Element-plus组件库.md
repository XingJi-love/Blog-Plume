---
title: Vue | Element Plus组件库
tags:
    - Element Plus组件库
    - 前端工程化
createTime: 2026/07/01 19:59:49
permalink: /blog/n097tk0l/
cover: ./Element Plus.jpg
---

![Element Plus组件库](./Element-Plus.jpg)

## 1. Element-plus介绍

> Element Plus 是一套基于 Vue 3 的开源 UI 组件库，是由饿了么前端团队开发的升级版本 Element UI。Element Plus 提供了丰富的 UI 组件、易于使用的 API 接口和灵活的主题定制功能，可以帮助开发者快速构建高质量的 Web 应用程序。

+ Element Plus 支持按需加载，且不依赖于任何第三方 CSS 库，它可以轻松地集成到任何 Vue.js 项目中。Element Plus 的文档十分清晰，提供了各种组件的使用方法和示例代码，方便开发者快速上手。

+ Element Plus 目前已经推出了大量的常用 UI 组件，如按钮、表单、表格、对话框、选项卡等，此外还提供了一些高级组件，如日期选择器、时间选择器、级联选择器、滑块、颜色选择器等。这些组件具有一致的设计和可靠的代码质量，可以为开发者提供稳定的使用体验。

+ 与 Element UI 相比，Element Plus 采用了现代化的技术架构和更加先进的设计理念，同时具备更好的性能和更好的兼容性。Element Plus 的更新迭代也更加频繁，可以为开发者提供更好的使用体验和更多的功能特性。

+ Element Plus 可以在支持 [ES2018](https://caniuse.com/?feats=mdn-javascript_builtins_regexp_dotall,mdn-javascript_builtins_regexp_lookbehind_assertion,mdn-javascript_builtins_regexp_named_capture_groups,mdn-javascript_builtins_regexp_property_escapes,mdn-javascript_builtins_symbol_asynciterator,mdn-javascript_functions_method_definitions_async_generator_methods,mdn-javascript_grammar_template_literals_template_literal_revision,mdn-javascript_operators_destructuring_rest_in_objects,mdn-javascript_operators_spread_spread_in_destructuring,promise-finally "ES2018") 和 [ResizeObserver](https://caniuse.com/resizeobserver "ResizeObserver") 的浏览器上运行。 如果您确实需要支持旧版本的浏览器，请自行添加 [Babel](https://babeljs.io/ "Babel") 和相应的 Polyfill 

+ 官网[一个 Vue 3 UI 框架 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/)

+ 由于 Vue 3 不再支持 IE11，Element Plus 也不再支持 IE 浏览器。

![](./images/21.png)





## 2. Element-plus环境搭建

>  1 准备vite项目

```shell
pnpm create vite
进入项目
pnpm install 
```

>  2 安装element-plus

```shell
pnpm install element-plus
```

> 3 完整引入element-plus

+ main.js

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 导入element-plus相关内容
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app') // 这里的use(ElementPlus)是将element-plus注册到vue中
```



## 3. Element-plus常用组件

> **结合官网演示以下组件:**
>
> https://element-plus.org/zh-CN

:::: steps

1. Button组件和Card组件



2. Table组件和Pagination组件



3. Form组件和表单数据校验



4. Message、Message Box及Popconfirm弹框组件

::::