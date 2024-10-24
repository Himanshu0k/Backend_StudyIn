// .eslintrc.js

export default {
  env: {
      browser: true,
      es2021: true,
      node: true, // This line allows Node.js globals
      es6: true
  },
  extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // If you're using Prettier
  ],
  parserOptions: {
      ecmaVersion: 2015,
      sourceType: 'module', // Use this for ES modules
  }
};
