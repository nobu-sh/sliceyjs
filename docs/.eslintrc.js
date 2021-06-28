module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    allowImportExportEverywhere: false,
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],

  plugins: [
    'react',
  ],

  rules: {
    "@typescript-eslint/explicit-module-boundary-types": false,
  },
}