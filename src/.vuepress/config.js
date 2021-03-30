module.exports = {
  dest: 'docs',
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
  themeConfig: {
    baseCanonicalUrl: 'http://rebeccadeakin.com',
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
      /* {
        text: 'Portfolio',
        link: '/portfolio/',
      }, */
      {
        text: 'me@rebeccadeakin.com',
        link: 'mailto:me@rebeccadeakin.com',
      },
      {
        text: '@BeccyDeakin',
        link: 'https://twitter.com/BeccyDeakin',
        icon: 'twitter',
      },
    ],
  },

  plugins: [
    // tailwind
    (options = {}, ctx) => {
      const { cwd, siteConfig /*  sourceDir, vuepressDir */ } = ctx;
      tailwindConfig = require(`${cwd}/tailwind.config.js`);
      const plugins = [require('tailwindcss')(tailwindConfig), require('autoprefixer')];
      siteConfig.postcss = Object.assign(siteConfig.postcss || {}, {
        plugins,
      });

      return { name: 'tailwindcss-vuepress' };
    },
  ],
};
