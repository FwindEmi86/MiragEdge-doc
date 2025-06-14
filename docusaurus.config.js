// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '锐界幻境',
  tagline: '👼🏻远离困恼之地（锐界）和天堂般的境地（幻境）',
  favicon: '/img/B-LOGO.ico',
  url: 'https://doc.miragedge.top',
  baseUrl: '/',
  organizationName: 'FwindEmi',
  projectName: 'MiragEdge-doc',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // 脚本加载配置
  scripts: [
    // 加载 PixiJS
    //{
    //  src: 'https://cdn.jsdelivr.net/npm/pixi.js@6.5.2/dist/browser/pixi.min.js',
    //  defer: true,
    //  id: 'pixi-script'
    //},
    // Cubism 2
    //{
    //  src: '/live2d/webgl/live2d.min.js',
    //  defer: true,
    //  id: 'live2d-script',
    //  'data-name': 'live2d'
    //},
    // Cubism Core
    //{
    //  src: '/live2d/core/live2dcubismcore.min.js',
    //  defer: true,
    //  id: 'live2d-core-script',
    //  'data-name': 'live2dcore'
    //},
    // 检查脚本
    //{
    //  src: '/pixi-check.js',
    //  defer: true
    //},
  ],

  // 插件配置
  plugins: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        language: "zh",
        searchResultLimits: 8,
      },
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: '/img/背景.jpg',
    navbar: {
      title: 'MiragEdge',
      logo: {
        alt: 'MiragEdge',
        src: '/img/B-LOGO.svg',
      },
      items: [
        {
          href: 'https://miragedge.top',
          position: 'right',
          label: '官网',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: '文档',
        },
        {
          href: 'https://space.bilibili.com/359174372',
          label: 'B站主页',
          position: 'right',
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    footer: {
      style: 'dark',
      copyright: `
        <div>
          <a href="https://beian.miit.gov.cn" id="beian" target="_blank">苏ICP备2024133820号-1</a>
        </div>
        <div>
          2020 - ${new Date().getFullYear()} MiragEdge✰锐界幻境 By FwindEmi
        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;