// eslint.config.mjs - PRODUCTION AWARE
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default tseslint.config(
  { ignores: ['dist', 'node_modules', '*.config.*'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': isProduction ? 'error' : 'warn',
      // 🎯 PRODUCTION AWARE RULES
      '@typescript-eslint/no-explicit-any': isProduction ? 'error' : 'warn',
      'react-hooks/exhaustive-deps': isProduction ? 'error' : 'warn',
      'react-refresh/only-export-components': 'warn',
      // 🚀 PRODUCTION SPECIFIC RULES
      ...(isProduction ? {
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'error',
        'no-alert': 'error',
        'prefer-const': 'error',
        'no-var': 'error',
      } : {}),
    },
  },
)
