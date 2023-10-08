module.exports = {
  content: ['./.vitepress/theme/**/*.vue', './src/**/*.md'],
  theme: {
    extend: {
      colors: {
        'beccy-dark': 'RGB(8, 183, 158)',
        beccy: 'RGB(22, 202, 177)',
        'beccy-light': 'RGB(31, 230, 202)',
      },
      spacing: {
        em: '1em',
      },
      padding: {
        ratio169: '56.25%',
        ratio43: '75%',
        ratio1: '100%',
        ratio15: '150%',
        ratio2: '200%',
      },
    },
  },

  variants: {
    extend: {
      margin: ['first', 'last'],
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
