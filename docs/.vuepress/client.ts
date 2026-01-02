import { defineClientConfig } from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue' // 仓库卡片组件
import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue' // npm 徽章组件
import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue' // npm 徽章组组件
import Swiper from 'vuepress-theme-plume/features/Swiper.vue' // 轮播图组件


import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue' // 为站点添加 llms.txt组件

// import CustomComponent from './theme/components/Custom.vue'

// import './theme/styles/custom.css'
import './styles/custom.css' // 自定义CSS样式

import Homepage from './theme/components/Homepage.vue' // 首页组件

import AllFriendContent from './theme/components/AllFriendContent.vue' // 友链组件

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    app.component('RepoCard', RepoCard) // 仓库卡片组件
    app.component('NpmBadge', NpmBadge) // npm 徽章组件
    app.component('NpmBadgeGroup', NpmBadgeGroup) // npm 徽章组组件
    app.component('Swiper', Swiper) // 轮播图组件

    // your custom components
    // app.component('CustomComponent', CustomComponent)
    app.component('Homepage', Homepage) // 首页组件

    app.component('AllFriendContent', AllFriendContent) // 友链组件
  },

  layouts: {
    Layout: h(Layout, null, {
      // 将 PageContextMenu 添加到 doc-title-after 插槽，即文章标题的右侧
      'doc-title-after': () => h(PageContextMenu), // 为站点添加 llms.txt组件
    }),
  },
})
