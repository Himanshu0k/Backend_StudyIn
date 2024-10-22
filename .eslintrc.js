// .eslintrc.js

export default {
  env: {
      browser: true,
      es2021: true,
      node: true, // This line allows Node.js globals
  },
  extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // If you're using Prettier
  ],
  parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module', // Use this for ES modules
  },
  rules: {
      // Customize your rules here
  },
};
