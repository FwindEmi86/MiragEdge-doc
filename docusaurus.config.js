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
  favicon: '/img/B-LOGO.ico',
  url: 'https://doc.miragedge.top',
  baseUrl: '/',
  organizationName: 'FwindEmi',
  projectName: 'MiragEdge-doc',
  onBrokenLinks: 'throw', // 当链接失效时抛出错误
  onBrokenMarkdownLinks: 'warn', // 当 Markdown 链接失效时发出警告

  // 即使您不使用国际化功能，也可以使用此字段设置
  // 有用的元数据，例如 HTML 的语言属性。
  // 例如，如果您的站点是中文，可以将 "en" 替换为 "zh-Hans"。
  i18n: {
    defaultLocale: 'zh-Hans', // 设置默认语言
    locales: ['zh-Hans'], // 定义支持的语言
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          path: 'docs', // 明确指定文档路径
          routeBasePath: '/', // 可选：将文档设为根路径
          sidebarPath: './sidebars.js', // 侧边栏配置文件路径
          showLastUpdateTime: true, // 显示最后更新时间
        },
        theme: {
          customCss: './src/css/custom.css', // 自定义 CSS 文件路径
        },
      },
    ],
  ],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 替换为您的项目的社交卡片
      image: '/img/背景.jpg',
      navbar: {
        title: 'MiragEdge',
        logo: {
          alt: 'MiragEdge', // 网站 Logo 的替代文本
          src: '/img/B-LOGO.svg',
        },
        items: [
          {
            href: 'https://miragedge.top', // 主页链接
            position: 'right', // 在导航栏右侧显示
            label: '官网', // 显示的标签
          },
          {
            type: 'docSidebar', // 使用文档侧边栏
            sidebarId: 'tutorialSidebar', // 侧边栏 ID
            position: 'right',
            label: '文档',
          },
          {
            href: 'https://space.bilibili.com/359174372',
            label: 'B站主页', // B站 链接
            position: 'right', // 在导航栏右侧显示
          },
        ],
      },
      colorMode: {
        defaultMode: 'dark', // 默认深色
        disableSwitch: true, // 显示切换按钮
        respectPrefersColorScheme: false, // 忽略系统主题设置
      },
      footer: {
        style: 'dark',
	copyright: `
 	  <div>
 	    <a href="https://beian.miit.gov.cn" id="beian" target="_blank">苏ICP备2024133820号-1</a>
      	  </div>
	  <div>
            2020 - ${new Date().getFullYear()} MiragEdge✰锐界幻境 By FwindEmi
	`,
      },
      prism: {
        theme: prismThemes.github, // 代码高亮主题（浅色）
        darkTheme: prismThemes.dracula, // 代码高亮主题（深色）
      },
    }),
};

export default config;
