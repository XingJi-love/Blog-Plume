/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'icon-park:home-two' },
  { text: '博客', link: '/blog/', icon: 'logos:blogger' },
  { text: '标签', link: '/blog/tags/', icon: 'icon-park:tag' },
  { text: '归档', link: '/blog/archives/', icon: 'lucide:archive' },
  { text: '友链', link: '/friends/', icon: 'solar:accessibility-bold-duotone' },
  /*{ text: '足迹', link: '/foot/', icon: 'material-symbols:barefoot'},*/
  { text: '关于', link: '/about/', icon: 'fa:child' },
  {
    text: '笔记',
    icon: 'mdi:learn-outline',
    items: [
      {
        text: '八股文',
        icon: 'ic:twotone-cloud',
        items: [
          /*
          { text: '计算机网络', link: '/ComputerNetwork/计算机网络体系结构/', icon: 'devicon-plain:java' },
           */
          { text: 'JVM', link: '/JVM/初识JVM/', icon: 'devicon-plain:java' },
        ],
      },
      {
        text: '算法',
        icon: 'fa7-brands:leetcode',
        items: [
          { text: 'Leetcode', link: '/Leetcode/算法入门/', icon: 'fa7-brands:leetcode' },
        ],
      },
      {
        text: '求职',
        icon: 'hugeicons:permanent-job',
        items: [
          { text: '求职指南', link: '/Job/1.求职指南/', icon: 'hugeicons:permanent-job' },
        ],
      },
    ],
  },
])
