/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'icon-park:home-two' },
  { text: '博客', link: '/blog/', icon: 'logos:blogger' },
  { 
    text: '技术栈', 
    icon: 'pixel:technology',
    items: [
      { text: 'Java', 
        link: '/blog/preview/chart.md/',
        icon: 'skill-icons:java-light'
      },
      { text: 'MySQL', 
        link: '/blog/preview/chart.md/', 
        icon: 'skill-icons:mysql-light'
      },
      { text: 'JavaWeb', 
        link: '/blog/preview/chart.md/',
        icon: 'catppuccin:java-class'
      },
      { text: 'SSM', 
        link: '/blog/preview/chart.md/',
        icon: 'catppuccin:java-class'
      },
    ]
   },
  { text: '标签', link: '/blog/tags/', icon: 'icon-park:tag' },
  { text: '分类', link: '/blog/categories/', icon: 'carbon:categories' },
  { text: '归档', link: '/blog/archives/', icon: 'lucide:archive' },
  { text: '友链', link: '/friends/', icon: 'solar:accessibility-bold-duotone' },
  { text: '关于', link: '/about/', icon: 'fa:child' },
  {
    text: '笔记',
    items: [{ text: '示例', link: '/demo/README.md' }]
  },
])
