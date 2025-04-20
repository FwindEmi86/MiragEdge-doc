module.exports = {
  tutorialSidebar: [
    { 
      type: 'html', 
      value: '<div class="sidebar-title"><i class="fas fa-book"></i>  锐界幻境 玩家文档</div>' 
    },
    { type: 'html', value: '<div class="divider gradient"></div>' },
    // 直接引用文档 ID（对应文件名）
    'intro',       // 对应 docs/前言.md
    'review',       // 对应 docs/玩家审核.md
    {
      type: 'category',
      label: '教程',
      items: [
        'tutorial/Client_Install',
        'tutorial/Join_Server',
        'tutorial/gameplay',
      ],
      collapsible: true,   // 是否可折叠（默认 true）
      collapsed: true,     // 初始是否折叠（默认 true）
    },
    { type: 'html', value: '<div class="divider-icon"></div>' },
    {
      type: 'category',
      label: '介绍',
      items: [
        'introduction/SkyField',
        'introduction/MDSH',
        'introduction/MiragEdge',
        'introduction/ZeroSate',
      ],
      collapsible: true,   // 是否可折叠（默认 true）
      collapsed: false,     // 初始是否折叠（默认 true）
    },
    { type: 'html', value: '<div class="divider-icon"></div>' },
    {
      type: 'category',
      label: '规则',
      items: [
        'rule/rule',
      ],
      collapsible: true,   // 是否可折叠（默认 true）
      collapsed: true,     // 初始是否折叠（默认 true）
    },
    { type: 'html', value: '<div class="divider-icon"></div>' },
    {
      type: 'category',
      label: '游戏玩法',
      items: [
        'gameplay/start',
        'gameplay/food',
      ],
      collapsible: true,   // 是否可折叠（默认 true）
      collapsed: false,     // 初始是否折叠（默认 true）
    },
    { type: 'html', value: '<div class="divider-icon"></div>' },
    {
      type: 'category',
      label: '常见问题',  // 分类显示名称
      items: [
        'question/QQ',  // 子文档路径
        'question/Game',
        // 其他子项...
      ],
      // 可选配置项
      collapsible: true,   // 是否可折叠（默认 true）
      collapsed: true,     // 初始是否折叠（默认 true）
    },

    'log',       // 对应 docs/更新日志.md

    { type: 'html', value: '<div class="divider-icon"></div>' },
    
    // 添加外部链接
    { type: 'html', value: '<div style="margin: 1rem 0"></div>' },
    {
      type: 'link',
      label: '锐界幻境 文档',
      href: 'https://miragedge.top'
    }
  ],
};