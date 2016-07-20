'use strict';

module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'mocha': true
  },
  'parserOptions': {
    'ecmaVersion': 6
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'error',
      2, {
        'SwitchCase': 1
      }
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
      'always'
    ],
    'eqeqeq': [
      'error',
      'allow-null'
    ],
    'strict': [
      'error',
      'safe'
    ],
    'space-before-function-paren': [
      'error', {
        'anonymous': 'always',
        'named': 'never'
      }
    ],
    'space-before-blocks': [
      'error',
      'always'
    ],
    'computed-property-spacing': [
      'error',
      'always'
    ],
    'no-console': [
      'error', {
        'allow': ['log', 'warn', 'error']
      }
    ]
  }
};