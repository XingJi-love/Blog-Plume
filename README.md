# XINGJI 的博客与知识库

**XINGJI** 的个人博客与知识库，一名来自China的 Java 后端开发者。站点内容涵盖 Java 技术栈深度探索、JVM 底层原理、LeetCode 题解以及工程实践笔记。

基于 [VuePress 2](https://vuepress.vuejs.org/) 和 [vuepress-theme-plume](https://theme-plume.vuejs.press/) 构建，部署于 [Vercel](https://vercel.com)。

## 功能特性

- **Vue 3 + Vite** — 极速开发服务器与优化的生产构建
- **代码高亮** — Shiki 高亮，支持行号、空格/Tab 渲染及多语言
- **数学公式与图表** — KaTeX、Mermaid、ECharts、Chart.js、Flowchart、PlantUML
- **Markdown 增强** — 代码树、时间线、对话记录等容器，PDF 嵌入，bilibili/YouTube/AcFun 视频嵌入，二维码等
- **评论系统** — Twikoo 驱动的评论功能
- **深色模式** — 支持外观切换，附带平滑过渡动画
- **全文搜索** — 开箱即用的本地搜索
- **Git 信息集成** — 自动生成更新日志、贡献者信息及文章创建时间
- **LLM 友好** — 内置 llmstxt 插件，便于 AI 消费站点内容

## 技术栈

| 分类       | 技术 |
|------------|------|
| 框架       | Vue 3、VuePress 2 |
| 构建工具   | Vite |
| 主题       | vuepress-theme-plume |
| 包管理器   | pnpm |
| 部署       | Vercel |
| 统计分析   | Umami |

## 目录结构

```
my-project/
├── docs/                    # 站点内容
│   ├── .vuepress/           # VuePress 配置
│   │   ├── config.ts        # 主配置文件
│   │   ├── plume.config.ts  # 主题配置（热更新）
│   │   ├── navbar.ts        # 导航栏配置
│   │   ├── collections.ts   # 内容集合
│   │   ├── public/          # 静态资源
│   │   └── styles/          # 自定义样式
│   ├── blog/                # 博客文章
│   ├── JVM/                 # JVM 学习笔记
│   ├── Job/                 # 求职与面试笔记
│   ├── Leetcode/            # LeetCode 题解
│   ├── about.md             # 关于页面
│   ├── friends.md           # 友链页面
│   └── README.md            # 首页
├── package.json
├── pnpm-lock.yaml
├── vercel.json              # Vercel 部署配置
└── README.md
```

## 环境要求

- **Node.js** >= 20.19.0 或 >= 22.0.0
- **pnpm**（通过 `packageManager` 锁定为 10.14.0）

## 快速开始

```sh
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 清除缓存后启动开发服务器
pnpm docs:dev-clean
```

## 构建与部署

```sh
# 构建生产包
pnpm docs:build

# 本地预览生产构建
pnpm docs:preview
```

## 版本更新

```sh
# 更新 VuePress 和主题到最新版本
pnpm vp-update
```

## 相关链接

- [VuePress 文档](https://vuepress.vuejs.org/)
- [Plume 主题文档](https://theme-plume.vuejs.press/)
- [作者 GitHub](https://github.com/XingJi-love)
- [在线站点](https://home.xingji.fun/)

## 许可证

[MIT](LICENSE) © XINGJI
