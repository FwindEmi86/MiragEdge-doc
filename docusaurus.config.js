// @ts-check
// `@type` JSDoc 注释允许编辑器自动补全和类型检查
// （与 `@ts-check` 配合使用时）。
// 声明 Docusaurus 配置有多种等效方式。
// 参考：https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// 此代码运行在 Node.js 环境中 - 请勿在此处使用客户端代码（浏览器 API、JSX 等）

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '锐界幻境',
  tagline: '👼🏻远离困恼之地（锐界）和天堂般的境地（幻境）',
  favicon: 'img/M-LOGO.ico',
  url: 'http//miragedge.top',
  baseUrl: '/',
  organizationName: 'FwindEmi',
  projectName: 'MiragEdge-doc',
  onBrokenLinks: 'throw', // 当链接失效时抛出错误
  onBrokenMarkdownLinks: 'warn', // 当 Markdown 链接失效时发出警告

  // 即使您不使用国际化功能，也可以使用此字段设置
  // 有用的元数据，例如 HTML 的语言属性。
  // 例如，如果您的站点是中文，可以将 "en" 替换为 "zh-Hans"。
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'], // 支持的语言列表
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js', // 侧边栏配置文件路径
          // 请将此更改为您的仓库地址。
          // 删除此项以移除“编辑此页面”链接。
          editUrl:
            'https://github.com/FwindEmi86/FwindEmi/blob/page/',
        },
        blog: {
          showReadingTime: true, // 显示阅读时间
          feedOptions: {
            type: ['rss', 'atom'], // 启用 RSS 和 Atom 格式的订阅
            xslt: true, // 启用 XSLT 支持
          },
          // 请将此更改为您的仓库地址。
          // 删除此项以移除“编辑此页面”链接。
          editUrl:
            'https://github.com/FwindEmi86/FwindEmi/blob/page/',
          // 强制执行博客最佳实践的有用选项
          onInlineTags: 'warn', // 对内联标签发出警告
          onInlineAuthors: 'warn', // 对内联作者发出警告
          onUntruncatedBlogPosts: 'warn', // 对未截断的博客文章发出警告
        },
        theme: {
          customCss: './src/css/custom.css', // 自定义 CSS 文件路径
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 替换为您的项目的社交卡片
      image: 'img/背景.jpg',
      navbar: {
        title: 'MiragEdge',
        logo: {
          alt: 'MiragEdge', // 网站 Logo 的替代文本
          src: 'B-LOGO.svg',
        },
        items: [
          {
            type: 'docSidebar', // 使用文档侧边栏
            sidebarId: 'tutorialSidebar', // 侧边栏 ID
            position: 'left', // 在导航栏左侧显示
            label: '文档', // 显示的标签
          },
          {to: '/blog', label: '博客', position: 'left'}, // 博客链接
          {
            href: 'https://github.com/FwindEmi86/MiragEdge',
            label: 'GitHub', // GitHub 链接
            position: 'right', // 在导航栏右侧显示
          },
        ],
      },
      footer: {
        style: 'dark', // 页脚样式
        links: [
          {
            title: '文档',
            items: [
              {
                label: '教程',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `版权所有 © ${new Date().getFullYear()} 锐界幻境. 使用 Docusaurus 构建。`,
      },
      prism: {
        theme: prismThemes.github, // 代码高亮主题（浅色）
        darkTheme: prismThemes.dracula, // 代码高亮主题（深色）
      },
    }),
};

export default config;
