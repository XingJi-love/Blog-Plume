/**
 * @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。
 *
 * Collections 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 请注意，你应该先在这里配置好 Collections，然后再启动 vuepress，主题会在启动 vuepress 时，
 * 读取这里配置的 Collections，然后在与 Collection 相关的 Markdown 文件中，自动生成 permalink。
 *
 * collection 的  type 为 `post` 时，表示为 文档列表类型（即没有侧边导航栏，有文档列表页）
 * 可用于实现如 博客、专栏 等以文章列表聚合形式的文档集合 （内容相对碎片化的）
 *
 * collection 的 type 为 `doc` 时，表示为文档类型（即有侧边导航栏）
 * 可用于实现如 笔记、知识库、文档等以侧边导航栏形式的文档集合 （内容强关联、成体系的）
 * 如果发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
 * 是否是以对应的 Collection 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `collection.link`
 * 的前缀是否匹配来决定。
 */

/**
 * 在受支持的 IDE 中会智能提示配置项。
 *
 * - `defineCollections` 是用于定义 collection 集合的帮助函数
 * - `defineCollection` 是用于定义单个 collection 配置的帮助函数
 *
 * 通过 `defineCollection` 定义的 collection 配置，应该填入 `defineCollections` 中
 */
import { defineCollection, defineCollections } from 'vuepress-theme-plume'

/*
const blog = defineCollection({
  // post 类型，这里用于实现 博客功能
  type: 'post',
  // 文档集合所在目录，相对于 `docs`
  dir: 'blog',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'Blog',
  // 文章列表页的链接，如果 `linkPrefix` 未定义，它也将作为 相关的文章的 permalink 的前缀
  link: '/blog/',
  //   linkPrefix: '/article/', // 相关文章的链接前缀
  postList: true, // 是否启用文章列表页
  tags: true, // 是否启用标签页
  archives: true, // 是否启用归档页
  categories: true, // 是否启用分类页
  pagination: 10, // 每页显示文章数量
  postCover: { // 文章封面位置
      layout: 'odd-left',
      ratio: '16:9',
      width: 400,
      compact: true
  },
})

const demoDoc = defineCollection({
  // doc 类型，该类型带有侧边栏
  type: 'doc',
  // 文档集合所在目录，相对于 `docs`
  dir: 'docs',
  // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `linkPrefix` 配置作为前缀
  // 如果 前缀不一致，则无法生成侧边栏。
  // 所以请确保  markdown 文件的 permalink 都以 `linkPrefix` 开头
  linkPrefix: '/docs',
  // 文档标题，它将用于在页面的面包屑导航中显示
  title: 'Docs',
  // 手动配置侧边栏结构
  // sidebar: ['', 'foo', 'bar'],
  // 根据文件结构自动生成侧边栏
  sidebar: 'auto',
})

*/

/**
 * 导出所有的 collections
 * (blog 为博客示例，如果不需要博客功能，请删除)
 * (demoDoc 为参考示例，如果不需要它，请删除)
 */
export default defineCollections([
  /*
  {
    type: "doc",
    dir: "计算机网络",
    title: "计算机网络",
    sidebar: [
    { text: 'OSI七层模型', prefix: '/ComputerNetwork/OSI七层模型/', items: 'auto' },
    { text: 'TCP-IP四层协议', prefix: '/ComputerNetwork/TCP-IP四层协议/', items: 'auto' },
    { text: '五层协议', prefix: '/ComputerNetwork/五层协议/', items: 'auto' },
    ],
  },
  */
  {
    type: "doc",
    dir: "JVM",
    title: "JVM",
    sidebar: [
    { text: '初识JVM', prefix: '/JVM/初识JVM/', items: 'auto' },
    { text: '字节码文件详解', prefix: '字节码文件详解', items: 'auto' },
    { text: 'JVM的内存区域', prefix: 'JVM的内存区域', items: 'auto' },
    { text: 'JVM的垃圾回收', prefix: 'JVM的垃圾回收', items: 'auto' },
    ],
  },
  {
    type: "doc",
    dir: "Leetcode",
    title: "Leetcode",
    sidebar: [
    { text: '算法入门', prefix: '/Leetcode/算法入门/', items: 'auto' },
    { text: '哈希', prefix: '哈希', items: 'auto' },
    { text: '双指针', prefix: '双指针', items: 'auto' },
    { text: '滑动窗口', prefix: '滑动窗口', items: 'auto' },
    { text: '子串', prefix: '子串', items: 'auto' },
    { text: '普通数组', prefix: '普通数组', items: 'auto' },
    { text: '矩阵', prefix: '矩阵', items: 'auto' },
    { text: '链表', prefix: '链表', items: 'auto' },
    { text: '二叉树', prefix: '二叉树', items: 'auto' },
    { text: '图论', prefix: '图论', items: 'auto' },
    { text: '回溯', prefix: '回溯', items: 'auto' },
    { text: '二分查找', prefix: '二分查找', items: 'auto' },
    { text: '栈', prefix: '栈', items: 'auto' },
    { text: '堆', prefix: '堆', items: 'auto' },
    { text: '贪心算法', prefix: '贪心算法', items: 'auto' },
    { text: '动态规划', prefix: '动态规划', items: 'auto' },
    { text: '多维动态规划', prefix: '多维动态规划', items: 'auto' },
    { text: '技巧', prefix: '技巧', items: 'auto' },
    ],
  },
  {
    type: "doc",
    dir: "Job",
    title: "Job",
    sidebar: [
    { text: '求职指南', prefix: '/Job/1.求职指南/', items: 'auto' },
    ],
  },

  // 文章
  {
    // post 类型，这里用于实现 博客功能
    type: 'post',
    // 文档集合所在目录，相对于 `docs`
    dir: 'blog',
    // 文档标题，它将用于在页面的面包屑导航中显示
    title: 'Blog',
    // 文章列表页的链接，如果 `linkPrefix` 未定义，它也将作为 相关的文章的 permalink 的前缀
    link: '/blog/',
    //   linkPrefix: '/article/', // 相关文章的链接前缀
    postList: true, // 是否启用文章列表页
    tags: true, // 是否启用标签页
    archives: true, // 是否启用归档页
    categories: true, // 是否启用分类页
    pagination: 10, // 每页显示文章数量
    postCover: { // 文章封面位置
        layout: 'odd-left',
        ratio: '16:9',
        width: 400,
        compact: true
    },
  },
])
