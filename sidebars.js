// sidebars.js
module.exports = {
  tutorialSidebar: [
    {
      type: 'html',
      value: `
        <div class="sidebar-header">
          <div class="logo-wrap">
            <i class="logo-icon"></i>
          </div>
          <h2 class="sidebar-title">锐界幻境文档</h2>
        </div>
      `
    },
    { type: 'html', value: '<div class="divider wave"></div>' },
    {
      type: 'doc',
      id: 'intro',
      label: '📜 文档前言',
      className: 'sidebar-main-item',
    },
    {
      type: 'doc',
      id: 'review',
      label: '🛡️ 玩家审核',
      className: 'sidebar-main-item',
    },
    { type: 'html', value: '<div class="divider dotted"></div>' },
    {
      type: 'category',
      label: '🎮 新手教程',
      items: [
        {
          type: 'doc',
          id: 'tutorial/Client_Install',
          label: '💻 客户端安装',
        },
        {
          type: 'doc',
          id: 'tutorial/Join_Server',
          label: '🌐 加入服务器',
        },
        {
          type: 'doc',
          id: 'tutorial/gameplay',
          label: '⚔️ 基础玩法',
        },
      ],
      collapsible: true,
      collapsed: true,
      className: 'sidebar-category tutorial-category',
    },
    { type: 'html', value: '<div class="divider gradient"></div>' },
    {
      type: 'category',
      label: '🌍 世界介绍',
      items: [
        {
          type: 'doc',
          id: 'introduction/SkyField',
          label: '☁️ 空之城',
        },
        {
          type: 'doc',
          id: 'introduction/MDSH',
          label: '🌃 梦始之空',
        },
        {
          type: 'doc',
          id: 'introduction/MiragEdge',
          label: '🏰 锐界幻境',
        },
        {
          type: 'doc',
          id: 'introduction/ZeroState', // 修正了此处拼写
          label: '❄️ 零境',
        },
      ],
      collapsible: true,
      collapsed: false,
      className: 'sidebar-category world-category',
    },
    { type: 'html', value: '<div class="divider gradient"></div>' },
    {
      type: 'category',
      label: '📜 服务器规则',
      items: [
        {
          type: 'doc',
          id: 'rule/rule',
          label: '🚦 基础守则',
        },
      ],
      collapsible: true,
      collapsed: true,
      className: 'sidebar-category rule-category',
    },
    { type: 'html', value: '<div class="divider dotted"></div>' },
    {
      type: 'category',
      label: '🎲 进阶玩法',
      items: [
        {
          type: 'doc',
          id: 'gameplay/start',
          label: '🚀 快速入门',
        },
        {
          type: 'doc',
          id: 'gameplay/food',
          label: '🍔 食物系统',
        },
      ],
      collapsible: true,
      collapsed: false,
      className: 'sidebar-category gameplay-category',
    },
    { type: 'html', value: '<div class="divider gradient"></div>' },
    {
      type: 'category',
      label: '❓ 常见问题',
      items: [
        {
          type: 'doc',
          id: 'question/QQ',
          label: '🐧 QQ相关问题',
        },
        {
          type: 'doc',
          id: 'question/Game',
          label: '🎮 游戏问题',
        },
      ],
      collapsible: true,
      collapsed: true,
      className: 'sidebar-category faq-category',
    },
    {
      type: 'doc',
      id: 'log',
      label: '📅 更新日志',
      className: 'changelog-item',
    },
    { type: 'html', value: '<div class="divider dotted"></div>' },
    {
      type: 'category',
      label: '🎨 开发文档',
      items: [
        {
          type: 'doc',
          id: 'develop/intro',
          label: '💖 这是什么？',
        },
        {
          type: 'doc',
          id: 'develop/potion_effect_bottle',
          label: '🍷 药水效果瓶',
        },
      ],
      collapsible: true,
      collapsed: true,
      className: 'sidebar-category faq-category',
    },
    { type: 'html', value: '<div class="divider wave"></div>' },
    // 将外部链接合并为一个 HTML 块，确保结构完整
    { 
      type: 'html', 
      value: `
        <div class="external-links">
          <a class="external-link" href="https://miragedge.top">🌐 官方网站</a>
        </div>
      `
    },
  ],
};