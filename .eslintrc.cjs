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
  ignorePatterns: [
    '**/*.csv'
  ],
  rules: {
    // general rules
    quotes: ['error', 'single'],
    camelcase: ['error', { properties: 'never' }],
    'eol-last': ['error', 'always'],
    'spaced-comment': ['error', 'always'],
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],

    // vue specific rules
    'vue/html-indent': ['error', 2],
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
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      selfClosingTag: 'always',
      startTag: 'never',
      endTag: 'never'
    }
    ],

    // tailwind specific rules
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/classnames-order': 'error'
  }
}
