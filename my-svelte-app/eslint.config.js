import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginSvelte from 'eslint-plugin-svelte';

export default [
  // Global ignores
  { ignores: ['build/', '.svelte-kit/', 'node_modules/'] },

  // Base config from ESLint
  pluginJs.configs.recommended,

  // Base TypeScript config
  ...tseslint.configs.recommended,

  // Svelte-specific configuration
  ...pluginSvelte.configs['flat/recommended'],

  {
    // General language options for the whole project
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    rules: {
      // You can add or override any custom rules here
    }
  },
  {
    // Specific override for Svelte files to use the TypeScript parser
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  }
];