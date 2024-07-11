module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  rules: {
    // Customize rules here if needed
    'require-jsdoc': 'off', // Google style guide requires JSDoc, but you can disable it if you don't want it
    'valid-jsdoc': 'off', // Same as above
    'prettier/prettier': 'error',
  },
};
