export default {
  prefix: 'tw_',
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#054A91',
        secondary: '#bb6412',
        accent: '#3E7CB1',
        dark: '#1D1D1D',

        positive: '#33ad50',
        negative: '#d9312d',
        info: '#31CCEC',
        warning: '#F2C037'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
}
