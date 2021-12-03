// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');

const fs = require('fs')
const dotenv = require('dotenv')

// helps to determine whether we are running yarn start (development) or yarn build (production)
const nodeEnv = process.env.NODE_ENV;
const objectivEnvironment = process.env.OBJECTIV_ENVIRONMENT ?? 'development';
// read env config from .env file
const envConfig = dotenv.parse(fs.readFileSync(`.env.${objectivEnvironment}`));

// only allow yarn start (dev) in dev mode
if (nodeEnv === 'development' && objectivEnvironment !== 'development'){
  throw new Error(`Not allowed to use 'yarn start' (${nodeEnv}) on non dev build 
    (OBJECTIV_ENVIRONMENT=${process.env.OBJECTIV_ENVIRONMENT})`);
}

const slackJoinLink = 'https://join.slack.com/t/objectiv-io/shared_invite/zt-u6xma89w-DLDvOB7pQer5QUs5B_~5pg';

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Objectiv Docs - creating the ultimate workflow for data scientists',
  titleDelimiter: '|',
  tagline: 'Objectiv is a data collection & modeling library that puts the data scientist first.',
  url: envConfig.websiteUrl,
  baseUrl: baseUrl,
  favicon: 'img/favicon/favicon.ico',
  organizationName: 'objectiv', // Usually your GitHub org/user name.
  projectName: 'objectiv.io', // Usually your repo name.

  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'throw',
  //trailingSlash: false,

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
    trackerDocsApplicationId: envConfig.trackerApplicationId,
    trackerEndPoint: envConfig.trackerEndPoint,
    slackJoinLink: slackJoinLink,
    trackerConsoleEnabled: envConfig.trackerConsoleEnabled
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
            type: 'search',
            position: 'right',
          },
          {
            label: 'Objectiv.io',
            position: 'right',
            to: envConfig.websiteUrl,
            target: '_self',
            className: 'navbar__item navbar__link go-homepage'
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
                to: envConfig.websiteUrl + '/privacy/'
              },
              {
                label: 'Cookies',
                to: envConfig.websiteUrl + '/privacy/cookies/'
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
        appId: 'P9B1J55TMB',
          // Public API key, safe to commit
        apiKey: '57e02ab0593f5338e36b7bff8235a505',
        indexName: 'objectiv',
        container: 'main'
      },
    }),
};

module.exports = config;

console.log("OBJECTIV TRACKER APPLICATION ID:", config.customFields.trackerDocsApplicationId);
console.log("OBJECTIV TRACKER ENDPOINT:", config.customFields.trackerEndPoint);
console.log("DOCUSAURUS URL:", config.baseUrl);
console.log("DOCUSAURUS BASEURL:", config.baseUrl);
