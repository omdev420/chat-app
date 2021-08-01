module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'no-plusplus': [0],
    'arrow-body-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': [0],
    'import/prefer-default-export': [0],
    'react/no-array-index-key': [0],
    'react/no-danger': [0],
    'no-param-reassign': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'consistent-return': [0],
  },
};
