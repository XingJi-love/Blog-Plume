/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改都会重启 vuepress 服务。
 * 部分配置项的更新没有必要重启 vuepress 服务，建议请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会被覆盖
 */

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'XINGJI',
  description: '',

  head: [
    // 配置站点图标
    ['link', { rel: 'icon', type: 'image/png', href: 'https://i.p-i.vip/47/20241024-67192acae3bb8.png' }],
    // 配置网监控器
    [
      "script",
      {
        async: true,
        defer: true,
        "data-website-id": "92445f67-3d16-4d40-8122-50a4b92d6e60",
        src: "https://umami.xingji.fun/script.js",
      },
    ],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    // hostname: 'https://your_site_url',

    /* 文档仓库配置，用于 editLink */
    // docsRepo: '',
    // docsDir: 'docs',
    // docsBranch: '',

    /* 页内信息 */
    // editLink: true,
    // lastUpdated: true,
    // contributors: true,
    // changelog: false,
    // 贡献者配置
    contributors: {
      mode: 'block',
      info: [
        {
          username: 'XingJi-love', // github username
          alias: ['XingJi-love'], // 别名，本地 git 配置中的用户名
        }
      ]
    },
    changelog: true,

    plugins: {
      // 如果您在此处直接声明为 true，则表示开发环境和生产环境都启用该功能
      git: process.env.NODE_ENV === 'production'
    },

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/theme/#cache
     */
    cache: 'filesystem',

    /**
     * 为 markdown 文件自动添加 frontmatter 配置
     * @see https://theme-plume.vuejs.press/config/theme/#autofrontmatter
     */
    autoFrontmatter: {
       permalink: true,  // 是否生成永久链接
       createTime: true, // 是否生成创建时间
       title: true,      // 是否生成标题
    },

    /* 本地搜索, 默认启用 */
    search: { provider: 'local' },

    /**
     * Algolia DocSearch
     * 启用此搜索需要将 本地搜索 search 设置为 false
     * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
     */
    // search: {
    //   provider: 'algolia',
    //   appId: '',
    //   apiKey: '',
    //   indices: [''],
    // },

    /**
     * Shiki 代码高亮
     * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
     */
    codeHighlighter: {
       // twoslash: true, // 启用 twoslash
       whitespace: true, // 启用 空格/Tab 高亮
       lineNumbers: true, // 启用行号
       // collapsedLines: true, // 启用折叠代码行
    },

    /* 文章字数统计、阅读时间，设置为 false 则禁用 */
    // readingTime: true,

    /**
     * markdown
     * @see https://theme-plume.vuejs.press/config/markdown/
     */
    markdown: {
        abbr: true,         // 启用 abbr 语法  *[label]: content
        annotation: true,   // 启用 annotation 语法  [+label]: content
        pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
        caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
        plot: true,         // 启用隐秘文本语法 !!xxxx!!
        bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
        youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
        acfun: true,        // 启用嵌入 acfun视频 语法 @[acfun](avid)
    //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
    //   audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
        icon: { provider: 'iconify' },        // 启用内置图标语法  ::icon-name::
        codeTree: true,     // 启用代码树容器语法 ::: code-tree
        field: true,        // 启用字段容器语法 ::: field
        qrcode: true,       // 启用二维码容器语法 ::: qrcode
        timeline: true,     // 启用时间线容器语法 ::: timeline
        chat: true,         // 启用对话记录容器语法 ::: chat
    //   table: true,        // 启用表格增强容器语法 ::: table
    //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
    //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
    //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
    //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
        npmTo: true,        // 启用 npm-to 容器  ::: npm-to
        demo: true,         // 启用 demo 容器  ::: demo
        collapse: true,     // 启用折叠容器  ::: collapse
    //   repl: {             // 启用 代码演示容器
    //     go: true,         // ::: go-repl
    //     rust: true,       // ::: rust-repl
    //     kotlin: true,     // ::: kotlin-repl
    //     python: true,     // ::: python-repl
    //   },
        math: {             // 启用数学公式
          type: 'katex',
        },
        chartjs: true,      // 启用 chart.js
        echarts: true,      // 启用 ECharts
        mermaid: true,      // 启用 mermaid
        flowchart: true,    // 启用 flowchart
        plantuml: true,     // 启用 plantuml 语法
    //   image: {
    //     figure: true,     // 启用 figure
    //     lazyload: true,   // 启用图片懒加载
    //     mark: true,       // 启用图片标记
    //     size: true,       // 启用图片大小
    //   },
    //   include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
    //   imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
        // table: true, // 启用默认功能
        table: {
          // 表格默认对齐方式 'left' | 'center' | 'right'
          align: 'center',
          // 表格宽度是否为最大内容宽度
          // 行内元素不再自动换行，超出容器宽度时表格显示滚动条
          maxContent: false,
          // 表格宽度默认占据整行
          fullWidth: false,
          /**
            * 复制为 html/markdown
            * true 相当于 `all`，相当于同时启用 html 和 markdown
          */
          copy: true, // true | 'all' | 'html' | 'md'
        },
    },

    /**
     * 水印
     * @see https://theme-plume.vuejs.press/guide/features/watermark/
     */
    // watermark: true,

    /**
     * 评论 comments
     * @see https://theme-plume.vuejs.press/guide/features/comments/
     */
    comment: {
        provider: 'Twikoo', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
          comment: true, // 是否开启评论功能
          envId: 'https://twikoohzb.netlify.app/.netlify/functions/twikoo', // 评论服务地址
    //   repo: '',
    //   repoId: '',
    //   category: '',
    //   categoryId: '',
    //   mapping: 'pathname',
    //   reactionsEnabled: true,
    //   inputPosition: 'top',
    },

    /**
     * 资源链接替换
     * @see https://theme-plume.vuejs.press/guide/features/replace-assets/
     */
    // replaceAssets: 'https://cdn.example.com',

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},
    //encrypt: {
    //  global: true,
    //  admin: ['123456'],
    //}

    /**
     * 启用 llmstxt 插件，用于为大语言模型提供更友好的内容
     * @see https://theme-plume.vuejs.press/guide/features/llmstxt/
     */
    // llmstxt: {
    //   locale: '/',    // 默认仅为主语言生成 llms 友好内容
    // }
    llmstxt: true, // 启用 llmstxt 插件
  }),
})
