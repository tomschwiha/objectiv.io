// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');

const objectivEnvironment = process.env.OBJECTIV_ENVIRONMENT ?? 'development';
const getEnvConfig = require('./env_config.js');
const envConfig = getEnvConfig(objectivEnvironment);

const slackJoinLink = '/join-slack';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Open-source product analytics infrastructure with a generic event taxonomy",
  titleDelimiter: '|',
  tagline: 'Use Objectiv to capture validated user behavior data straight into your data warehouse, and speed up product analytics projects with pre-built and reusable models.', //meta description, and og:description
  baseUrl: envConfig.baseUrl,
  url: envConfig.websiteUrl,
  favicon: 'img/favicon/favicon.ico',
  organizationName: 'objectiv', // Usually your GitHub org/user name.
  projectName: 'objectiv.io', // Usually your repo name.

  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'error',

  // undefined it the default behaviour of docusaurus, and leaves it alone
  // see: https://docusaurus.io/docs/api/docusaurus-config#trailing-slash for more info
  trailingSlash: undefined,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        docs: false,
        blog: {
          blogTitle: 'Objectiv Blog',
          blogDescription: 'Objectiv Blog',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 0,
          postsPerPage: 10,
          showReadingTime: false,
          feedOptions: {
            type: 'all',
            title: 'Objectiv Blog',
            description: 'Objectiv Blog',
            copyright: `Copyright © ${new Date().getFullYear()} Objectiv.`,
          },
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],
  plugins: [
    path.resolve(__dirname, 'src/plugins/favicons/'),
    [
        // only load the post-build plugin when creating a production, staging, or testing build
        path.resolve(__dirname, 'src/plugins/post-build/'),
        {
            skip: objectivEnvironment !== 'production' 
              && objectivEnvironment !== 'staging' 
              && objectivEnvironment !== 'testing',
            environment: objectivEnvironment
        }
    ]
  ],
  scripts: [
    {
      src: 'https://consent.cookiebot.com/uc.js?cbid=7498452c-872b-431a-9859-21045f83f0a0',
      'data-cbid': '7498452c-872b-431a-9859-21045f83f0a0',
      'data-blockingmode': 'auto',
      id: 'Cookiebot'
    },
  ],
  customFields: {
    trackerApplicationId: envConfig.trackerApplicationId,
    trackerEndPoint: envConfig.trackerEndPoint,
    trackerConsoleEnabled: envConfig.trackerConsoleEnabled === 'true',
    slackJoinLink: slackJoinLink,
    gitHubRepo: "objectiv-analytics"
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
    metadata: [{
        property: 'og:image', content: 'https://objectiv.io/img/open-graph/objectiv-og-large.png'
      },
      {
        property: 'robots', content: 'all'
      }
    ],
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: '',
      hideOnScroll: false,
      logo: {
        alt: 'Objectiv Logo',
        src: 'img/logo-objectiv.svg',
      },
      items: [
        {
          to: 'about',
          label: 'About us',
        },
        {
          to: 'blog',
          label: 'Blog',
        },
        {
          to: 'jobs',
          label: 'Jobs',
        },
        {
          label: 'FAQ',
          to: envConfig.websiteUrl + '/docs/home/the-project/faq', // ensure Docusaurus redirects to standalone docs
          target: '_self',
          waitUntilTracked: true
        },
        {
          label: 'Docs',
          to: envConfig.websiteUrl + '/docs', // ensure Docusaurus redirects to standalone docs
          target: '_self',
          waitUntilTracked: true
        },
        {
          href: 'https://github.com/objectiv/objectiv-analytics',
          label: 'GitHub',
          position: 'right',
          className: 'navItem navGitHub',
          target: '_self',
          waitUntilTracked: true
        },
        {
          href: slackJoinLink,
          label: 'Slack',
          position: 'right',
          className: 'navItem navSlack',
          target: '_self',
          waitUntilTracked: true
        },
        {
          href: 'https://twitter.com/objectiv_io',
          label: 'Twitter',
          position: 'right',
          className: 'navItem navTwitter',
          target: '_self',
          waitUntilTracked: true
        },
        {
          href: 'mailto:hi@objectiv.io',
          label: 'Contact Us',
          position: 'right',
          className: 'navItem navEmail',
          target: '_self',
          waitUntilTracked: true
        },
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
              to: 'privacy/',
            },
            {
              label: 'Cookies',
              to: 'privacy/cookies',
            },
          ],
        },
      ],
    },
    zoom: {
      config: {
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        }
      }
    }    
  })
};

module.exports = config;

console.log("OBJECTIV TRACKER APPLICATION ID:", config.customFields.trackerApplicationId);
console.log("OBJECTIV TRACKER ENDPOINT:", config.customFields.trackerEndPoint);
console.log("OBJECTIV TRACKER CONSOLE ENABLED:", config.customFields.trackerConsoleEnabled);
console.log("DOCUSAURUS URL:", config.baseUrl);
console.log("DOCUSAURUS BASEURL:", config.baseUrl);
