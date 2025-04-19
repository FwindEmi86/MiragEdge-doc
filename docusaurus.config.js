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
  url: 'https://miragedge.top',
  baseUrl: '/',
  organizationName: 'FwindEmi',
  projectName: 'MiragEdge-doc',
  onBrokenLinks: 'throw', // 当链接失效时抛出错误
  onBrokenMarkdownLinks: 'warn', // 当 Markdown 链接失效时发出警告

  // 即使您不使用国际化功能，也可以使用此字段设置
  // 有用的元数据，例如 HTML 的语言属性。
  // 例如，如果您的站点是中文，可以将 "en" 替换为 "zh-Hans"。
  i18n: {
    // Removed invalid property "enabled"
    defaultLocale: 'zh-Hans',
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
      image: '/img/背景.jpg',
      navbar: {
        title: 'MiragEdge',
        logo: {
          alt: 'MiragEdge', // 网站 Logo 的替代文本
          src: '/img/B-LOGO.svg',
        },
        items: [
          {
            type: 'docSidebar', // 使用文档侧边栏
            sidebarId: 'tutorialSidebar', // 侧边栏 ID
            position: 'left', // 在导航栏左侧显示
            label: '文档', // 显示的标签
          },
          {
            href: 'https://github.com/FwindEmi86/MiragEdge',
            label: 'GitHub', // GitHub 链接
            position: 'right', // 在导航栏右侧显示
          },
        ],
      },
      colorMode: {
        defaultMode: 'dark', // 默认深色
        disableSwitch: false, // 显示切换按钮
        respectPrefersColorScheme: false, // 忽略系统主题设置
      },
      footer: {
        style: 'dark', // 页脚样式
        links: [
          {
            title: '文档',
            items: [
              {
                label: '介绍',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'QQ交流群',
                href: 'https://qm.qq.com/cgi-bin/qm/qr?k=D75vW-DYhDNzYoKghGPvGpDiMl4cRKBb&jump_from=webapi&authKey=EG46Uvg+6ZnoyAidNSbB6e//ShbVXC327dpMvpPD/nweZExlPYeTuWAKeSq+If4T',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Bilibili',
                href: 'https://space.bilibili.com/359174372?spm_id_from=333.1007.0.0',
              },
            ],
          },
        ],
	copyright: `
 	  <div>
 	    <a href="https://beian.miit.gov.cn" id="beian" target="_blank">苏ICP备2024133820号-1</a>
      	  </div>
	  <div>
            版权所有 © ${new Date().getFullYear()} 锐界幻境. 使用 Docusaurus 构建。
	`,
      },
      prism: {
        theme: prismThemes.github, // 代码高亮主题（浅色）
        darkTheme: prismThemes.dracula, // 代码高亮主题（深色）
      },
    }),
};

export default config;
