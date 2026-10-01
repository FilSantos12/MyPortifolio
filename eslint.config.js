// @ts-check
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import globals from 'globals';

export default defineConfig(
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.tsx'],
    extends: [reactHooks.configs.flat.recommended, jsxA11y.configs.recommended],
  },
  {
    files: ['scripts/**/*.{js,mjs}', '*.config.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },
);
