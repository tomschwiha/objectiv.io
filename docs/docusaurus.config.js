// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');

const environment = process.env.OBJECTIV_ENVIRONMENT;
const isStagingEnv = environment ? environment.startsWith('staging') : false;
const isProductionEnv = environment ? environment.startsWith('prod') : false;

const slackJoinLink = 'https://join.slack.com/t/objectiv-io/shared_invite/zt-u6xma89w-DLDvOB7pQer5QUs5B_~5pg';

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Objectiv Docs - creating the ultimate workflow for data scientists',
  titleDelimiter: '|',
  tagline: 'Objectiv is a data collection & modeling library that puts the data scientist first.',
  url: 'https://objectiv.io/',
  baseUrl: isProductionEnv ? '/docs/' : '/',
  favicon: 'img/favicon/favicon.ico',
  organizationName: 'objectiv', // Usually your GitHub org/user name.
  projectName: 'objectiv.io', // Usually your repo name.

  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'throw',
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          path: './docs',
          editUrl: 'https://github.com/objectiv/objectiv.io/edit/main/docs/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      })
    ],
  ],
  plugins: [
    path.resolve(__dirname, 'src/plugins/favicons/'),
    path.resolve(__dirname, 'src/plugins/post-build/')
  ],
  scripts: [
    'https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js',
    {
      src: 'https://consent.cookiebot.com/uc.js?cbid=7498452c-872b-431a-9859-21045f83f0a0',
      'data-cbid': '7498452c-872b-431a-9859-21045f83f0a0',
      'data-blockingmode': 'auto',
      id: 'Cookiebot'
    },
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css',
  ],
  customFields: {
    trackerDocsApplicationId: isProductionEnv ? 'objectiv-docs' : 'objectiv-docs-dev',
    trackerEndPoint: isProductionEnv ? 'https://collector.objectiv.io' : 'http://localhost:5000',
    slackJoinLink: slackJoinLink,
    trackerConsoleEnabled: !isProductionEnv
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Objectiv Documentation Logo',
          src: '/img/logo-objectiv-docs.svg',
        },
        items: [
          {
            label: 'Tracking',
            to: '/tracking//',
          },
          {
            label: 'Modeling',
            to: '/modeling//',
          },
          {
            label: 'Taxonomy',
            to: '/taxonomy//',
          },
          {
            label: 'Objectiv.io \u{1F855}',
            position: 'right',
            to: 'https://objectiv.io/',
            target: '_self',
          }
        ],
      },
      footer: {
        style: 'light',
        copyright: `Copyright © ${new Date().getFullYear()} Objectiv`,
        links: [
          {
            items: [
              {
                label: 'Privacy Policy',
                to: 'https://objectiv.io/privacy/',
              },
              {
                label: 'Cookies',
                to: 'https://objectiv.io/privacy/cookies',
              },
            ],
          },
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        disableSwitch: true
      },
      algolia: {
        // If Algolia did not provide you any appId, use 'BH4D9OD16A'
        appId: 'BH4D9OD16A',
          // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'YOUR_INDEX_NAME',
        // Optional: see doc section below
        contextualSearch: true
      },
    }),
};

module.exports = config;

console.log("USING OBJECTIV TRACKER ENDPOINT:", config.customFields.trackerEndPoint);
console.log("USING BASEURL:", config.baseUrl);
