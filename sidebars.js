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
      label: '🔐 社区规则',
      items: [
        {
          type: 'doc',
          id: 'rule/ServerRule',
          label: '🚦 服务器玩家守则',
        },
        {
          type: 'doc',
          id: 'rule/MemberRule',
          label: '🤴 交流群成员守则',
        },
      ],
      collapsible: true,
      collapsed: true,
      className: 'sidebar-category rule-category',
    },
    { type: 'html', value: '<div class="divider gradient"></div>' },
    {
      type: 'category',
      label: '🎮 新手教程',
      items: [
        {
          type: 'doc',
          id: 'tutorial/BackGround',
          label: '💖 背景介绍',
        },
        {
          type: 'category',
          label: '🌐 加入服务器',
          items: [
            {
              type: 'doc',
              id: 'tutorial/ClientInstall',
              label: '💻 客户端安装',
            },
            {
              type: 'doc',
              id: 'tutorial/ServerJoin',
              label: '🔗 入服方法&链接',
            },
            {
              type: 'doc',
              id: 'tutorial/Whitelist',
              label: '📝 白名单系统',
            },
          ],
          collapsible: true,
          collapsed: true,
          className: 'sidebar-category tutorial-category',
        },
        {
          type: 'doc',
          id: 'tutorial/gameplay',
          label: '⚔️ 核心玩法',
        },
      ],
      collapsible: true,
      collapsed: false,
      className: 'sidebar-category tutorial-category',
    },
    { type: 'html', value: '<div class="divider dotted"></div>' },
    {
      type: 'category',
      label: '🎲 进阶玩法',
      items: [
        {
          type: 'doc',
          id: 'gameplay/CustomCroups',
          label: '🪻 星露谷种植',
        },
        {
          type: 'doc',
          id: 'gameplay/CustomFishing',
          label: '🐟 星露谷钓鱼',
        },
        {
          type: 'doc',
          id: 'gameplay/AdvancedEnchantments',
          label: '📕 高级附魔',
        },
        {
          type: 'doc',
          id: 'gameplay/MMO',
          label: '🗡 装备升级系统',
        },
        {
          type: 'doc',
          id: 'gameplay/Dungeon',
          label: '😈 地牢副本挑战',
        },
        {
          type: 'doc',
          id: 'gameplay/Jobs',
          label: '😽 工作系统',
        },
        {
          type: 'doc',
          id: 'gameplay/food',
          label: '🍔 食物系统',
        },
      ],
      collapsible: true,
      collapsed: true,
      className: 'sidebar-category gameplay-category',
    },
    { type: 'html', value: '<div class="divider gradient"></div>' },
    {
      type: 'category',
      label: '❓ 常见问题',
      items: [
        {
          type: 'doc',
          id: 'question/Game',
          label: '🎮 游戏问题',
        },
        {
          type: 'doc',
          id: 'question/QQ',
          label: '🐧 QQ相关问题',
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
