module.exports = {
  // 侧边栏的标识符（例如：tutorialSidebar 是侧边栏名称）
  tutorialSidebar: [
    // 直接引用文档 ID（对应文件名）
    '介绍',       // 对应 docs/介绍.md
    '游玩须知',       // 对应 docs/游玩须知.md

    // 添加分隔线
    { type: 'html', value: '<hr />' },

    // 分类（Category）
    {
      type: 'category',
      label: '教程',  // 分类显示名称
      items: [
        'tutorial/Client_Install',  // 子文档路径
        'tutorial/Join_Server',
        'tutorial/gameplay',
        // 其他子项...
      ],
      // 可选配置项
      collapsible: true,   // 是否可折叠（默认 true）
      collapsed: false,     // 初始是否折叠（默认 true）
    },

    // 添加分隔线
    { type: 'html', value: '<hr />' },

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
      collapsed: false,     // 初始是否折叠（默认 true）
    },

    '更新日志',       // 对应 docs/更新日志.md

    // 添加外部链接
    { type: 'html', value: '<div style="margin: 1rem 0"></div>' },
    {
      type: 'link',
      label: '锐界幻境 文档',
      href: 'https://miragedge.top'
    }
  ],
};