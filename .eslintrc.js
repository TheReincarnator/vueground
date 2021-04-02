const prettierConfig = require('@sumcumo/prettier-config')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'complexity': ['error', 10],
    'max-statements': 'off',
    'vue/valid-v-slot': 'off',
    'vue/no-mutating-props': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'require-await': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ],
}
