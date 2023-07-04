module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-essential',
    'plugin:tailwindcss/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'eol-last': ['error', 'always'],
    'spaced-comment': ['error', 'always'],

    // vue specific rules
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 3 },
        multiline: { max: 1 }
      }
    ],
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],

    // tailwind specific rules
    'tailwindcss/no-custom-classname': 'off'
  }
}
