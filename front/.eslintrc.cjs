/* eslint-env node */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'react/jsx-tag-spacing': [
      'error',
      {
        'closingSlash': 'never',
        'beforeSelfClosing': 'never',
        'afterOpening': 'never',
        'beforeClosing': 'never',
      }
    ],
    'react/jsx-closing-bracket-location': [
      1,
      { selfClosing: 'line-aligned',
        nonEmpty: 'after-props' }],
    'react/jsx-curly-brace-presence': [
      'error',
      { 'props': 'never',
        'children': 'never' }
    ],
    'react/no-unescaped-entities': 'off',
  }
}
