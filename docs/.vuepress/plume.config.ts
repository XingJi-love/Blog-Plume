/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改不会重启 vuepress 服务，而是通过热更新的方式生效
 * 但同时部分配置项不支持热更新，请查看文档说明
 * 对于不支持热更新的配置项，请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会覆盖 `.vuepress/config.ts` 文件中的配置
 */

import { defineThemeConfig } from 'vuepress-theme-plume'
import navbar from './navbar'
import collections from './collections'

/**
 * @see https://theme-plume.vuejs.press/config/theme/
 */
export default defineThemeConfig({
  logo: 'https://i.p-i.vip/47/20241024-67192acae3bb8.png',

  appearance: true,  // 配置 深色模式

  social: [
    { icon: 'mdi:github', link: 'https://github.com/XingJi-love' },
    { icon: 'ri:gitee-fill', link: 'https://gitee.com/giteehzb', },
    { icon: 'simple-icons:csdn', link: 'https://blog.csdn.net/AcsdnHZB?spm=1011.2648.3001.5343', },
    { icon: 'hugeicons:leetcode', link: 'https://leetcode.cn/u/charming-darwinhis/', },
    { icon: 'ix:bilibili-logo', link: 'https://space.bilibili.com/1289480756?spm_id_from=333.1007.0.0' },
  ],
  navbarSocialInclude: ['mdi:github','ri:gitee-fill','simple-icons:csdn','hugeicons:leetcode','ix:bilibili-logo'], // 允许显示在导航栏的 social 社交链接
  // aside: true, // 页内侧边栏， 默认显示在右侧
  outline: [2, 6], // 页内大纲， 默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: 'CC-BY-NC-ND-4.0',

  // prevPage: true,   // 是否启用上一页链接
  // nextPage: true,   // 是否启用下一页链接
  // createTime: true, // 是否显示文章创建时间

  /* 站点页脚 */
  // footer: {
  //   message: 'Power by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
  //   copyright: '',
  // },
  /* 站点页脚 */
  footer: {
     message: '🥼 <a target="_blank" href="https://theme-plume.vuejs.press/">vuepress-theme-plume</a> & ✒️ XINGJI',
  },

  /**
   * @see https://theme-plume.vuejs.press/config/theme/#profile
   */
  profile: {
    name: 'XINGJI',
    description: '迄今所有人生都大写着失败，但不妨碍我继续向前✨',
    avatar: 'https://i.p-i.vip/47/20241024-67192acae3bb8.png',
    location: 'YunNan, China',
    circle: true, // 是否为圆形头像
    layout: 'right', // 个人信息在左侧还是右侧，'left' | 'right'
  },

  navbar,
  collections,

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  // bulletin: {
  //   layout: 'top-right',
  //   contentType: 'markdown',
  //   title: '公告板标题',
  //   content: '公告板内容',
  // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/theme/#transition */
  transition: {
     page: true,        // 启用 页面间跳转过渡动画
     postList: true,    // 启用 博客文章列表过渡动画
     appearance: 'circle-clip',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  },

})
