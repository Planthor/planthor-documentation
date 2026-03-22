import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Planthor',
  headTags: [
    // JSON-LD: Organization
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Planthor",
        "url": "https://planthor.github.io/planthor-documentation",
        "logo": "https://planthor.github.io/planthor-documentation/img/planthor-logo.png",
        "sameAs": [
          "https://github.com/planthor",
          "https://x.com/planthor",
          "https://discordapp.com/invite/planthor"
        ]
      }),
    },
    // JSON-LD: SoftwareApplication
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Planthor",
        "alternateName": "Planthor Goal Tracker",
        "description": "Planthor is an open-source goal and objectives tracking application for athletes in the Dragging to Dream (D2D) community.",
        "url": "https://planthor.github.io/planthor-documentation",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "Planthor"
        }
      }),
    },
  ],
  tagline: 'Planthor is an open-source goal/objectives tracking application designed to support the journey of the "Dragging to Dream" (D2D) community.',
  favicon: 'img/favicon-32x32.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://Planthor.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/planthor-documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Planthor', // Usually your GitHub org/user name.
  projectName: 'planthor-documentation', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid', 
    'docusaurus-theme-plantuml',
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
      }),
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: process.env.NODE_ENV !== 'production',
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/planthor-logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: 'manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#003366',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#003366',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/planthor-logo.png',
          },
        ],
      },
    ],
    function webpackWarningSuppressorPlugin() {
      return {
        name: 'webpack-warning-suppressor',
        configureWebpack() {
          return {
            ignoreWarnings: [
              {
                module: /vscode-languageserver-types/,
              },
            ],
          };
        },
      };
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      vi: {
        label: 'Tiếng Việt',
        direction: 'ltr',
        htmlLang: 'vi-VN',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Planthor/planthor-documentation/tree/main/',
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/planthor-documentation/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    plantuml: {
      serverUrlLight: "https://www.plantuml.com/plantuml/svg/",
      serverUrlDark: "https://www.plantuml.com/plantuml/svg/",
    },
    // Replace with your project's social card
    image: 'img/planthor-logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    metadata: [
      { name: 'keywords', content: 'Planthor, goal tracker, objective tracking, D2D, Dragging to Dream, open source, athletic goals, running plan tracker' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@planthor' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Planthor' },
    ],
    navbar: {
      title: 'Planthor',
      logo: {
        alt: 'Planthor Logo',
        src: 'img/planthor-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/about', label: 'About', position: 'left'},
        {to: '/goal-tracker', label: 'Goal Tracker', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/planthor',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/planthor',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/planthor',
            },
            {
              label: 'X',
              href: 'https://x.com/planthor',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/planthor',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Planthor Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
