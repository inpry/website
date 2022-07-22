// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Gpushare',
  tagline: 'Gpushare 官方用户文档',
  url: 'https://gpushare.com/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  noIndex: false,
  organizationName: 'Gpushare-com',
  projectName: 'Gpushare-docs',
  deploymentBranch: 'main',
  githubHost: 'github.com',
  githubPort: '22',
  i18n: {
    defaultLocale: 'cn',
    locales: ['cn'],
    path: 'i18n',
    localeConfigs: {
      cn: {
        label: 'Chinese',
        direction: 'ltr',
        htmlLang: 'zh-CN',
        calendar: 'iso8601',
        path: 'cn',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          sidebarCollapsible: true,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** autoCollapseCategories: true,@type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        }
      },
      /*
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
      */
      //颜色模式切换
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      image: 'img/favicon.ico',
      announcementBar: {
        id: 'support_us',
        content:
          '公告，这是一条公告消息，更新了自定义服务文档 <a target="_blank" rel="noopener noreferrer" href="#">点击查看</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      //导航条
      navbar: {
        title: 'Gpushare',
        hideOnScroll: false,
        logo: {
          alt: '导航条logo',
          src: 'img/favicon.ico',
          srcDark: 'img/favicon.ico',
          //href: 'https://gpushare.com/',
          target: '_self',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: '官方文档',
            /*type: 'docSidebar',
            position: 'left',
            sidebarId: 'official',
            label: '使用文档', */
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'practice',
            label: '最佳实践',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'faq',
            label: '常见问题',
          },
          {to: 'https://bbs.gpushare.com', label: '官方社区', position: 'left'},
          {
            href: 'https://gpushare.com',
            label: '返回官网',
            position: 'right',
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        
        copyright: `Copyright © ${new Date().getFullYear()} 上海恒源云 (Gpushare) 网络科技有限公司`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
