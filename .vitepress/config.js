import { createContentLoader } from 'vitepress';
import { encryptPage } from './encrypt-page.js';

export default {
  vite: {
    build: {
      // assetsInlineLimit: 0,
    },
    plugins: [],
  },
  srcDir: 'src',
  outDir: 'docs',
  title: 'Rebecca Deakin - Game Artist',
  description: 'Rebecca Deakin - Game Artist',
  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'rebecca deakin, beccy deakin, deakin, brighton, illustrator, illustration, animation, animator, games, games development, unity, unity3d, blender, 3d modelling, concept art',
      },
    ],
    ['meta', { name: 'viewport', content: 'width=device-width' }],
    ['meta', { name: 'theme-color', content: '#16CAB1' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  siteTitle: 'Rebecca Deakin',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://rebeccadeakin.com',
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
        text: 'Portfolio',
        link: '/',
      },
      {
        text: 'About',
        link: '/about/',
      },
      {
        text: 'me@rebeccadeakin.com',
        link: 'mailto:me@rebeccadeakin.com',
      },
      /* {
        text: '@BeccyDeakin',
        link: 'https://twitter.com/BeccyDeakin',
        icon: 'twitter',
      }, */
    ],
  },
  async transformPageData(pageData, { siteConfig }) {
    let portfolioItems = await createContentLoader('./src/portfolio/**/index.md', {}).load();
    portfolioItems = portfolioItems
      .filter((page) => page.frontmatter.portfolioHub !== true)
      .filter((page) => page.frontmatter.hidden !== true);
    portfolioItems.sort((a, b) => {
      if (a.frontmatter.featured) {
        return a.frontmatter.featured ? -1 : 1;
      }
      return a.frontmatter.sort > b.frontmatter.sort ? -1 : 1;
    });
    pageData.portfolioItems = portfolioItems;
  },
  async transformHtml(code, id, { pageData }) {
    if (pageData.frontmatter.encrypt === true) {
      console.time('encryptedTime');
      const { password, html } = await encryptPage(code);
      console.log('page: ', id, ' password: ', password);
      console.timeEnd('encryptedTime');
      return html;
    }

    return code;
  },
};
