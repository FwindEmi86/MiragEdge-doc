// sidebars.js
module.exports = {
  tutorialSidebar: [
    { 
      type: 'html',
      value: '<div class="sidebar-header"><div class="logo-wrap"><i class="fas fa-dragon logo-icon"></i></div><h2 class="sidebar-title">锐界幻境文档</h2></div>',
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
    { type: 'html', value: '<div class="divider gradient"></div>' },
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
    { type: 'html', value: '<div class="divider dotted"></div>' },
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
          id: 'introduction/ZeroSate',
          label: '❄️ 零境',
        },
      ],
      collapsible: true,
      collapsed: false,
      className: 'sidebar-category world-category',
    },
    { type: 'html', value: '<div class="divider star"></div>' },
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
    { type: 'html', value: '<div class="divider arrow"></div>' },
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
    { type: 'html', value: '<div class="divider pulse"></div>' },
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
    { type: 'html', value: '<div class="divider wave"></div>' },
    {
      type: 'doc',
      id: 'log',
      label: '📅 更新日志',
      className: 'changelog-item',
    },
    { type: 'html', value: '<div class="external-links">' },
    {
      type: 'link',
      label: '🌐 官方网站',
      href: 'https://miragedge.top',
      className: 'external-link',
    },
    {
      type: 'link',
      label: '👾 Discord社区',
      href: 'https://discord.gg/your-invite-link',
      className: 'external-link',
    },
    { type: 'html', value: '</div>' },
  ],
};