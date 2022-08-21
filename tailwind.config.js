module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    screens: {
      lg: {min:'1001px', max: '2000px'},
      md: { min: '765px', max: '1000px' },
      sm: { min: '0px', max: '764px' },
      login: { min: '0px', max: '415px' },
    },
    boxShadow: {
      'mb-cart': '0 10px 10px 0px rgba(0, 0, 0, 0.05)',
      'mb-fundraising': '0px 5px 15px rgba(0, 0, 0, 0.05)',
      'de-header': '0px 6px 10px rgba(0, 0, 0, 0.05)',
      'desk-cart': '0px 10px 15px rgba(0, 0, 0, 0.05)'
    }
  },
}
