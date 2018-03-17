module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    ecmascript: 6,
    jsx: true,
    'import/core-modules': ['prop-types'],
  },
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'arrow-parens': [2, 'as-needed'],
    'function-paren-newline': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 80,
        trailingComma: 'all',
      },
    ],
  },
};
