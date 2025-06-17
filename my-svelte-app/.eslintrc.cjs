module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended'],
  ignorePatterns: ['node_modules']
};
