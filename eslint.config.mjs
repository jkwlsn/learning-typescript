import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import html from '@html-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  { ignores: ['index.js'] },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  // HTML config
  {
    ...html.configs['flat/recommended'],
    files: ['**/*.html'],
    rules: {
      ...html.configs['flat/recommended'].rules,
      '@html-eslint/no-multiple-h1': 'off',
      '@html-eslint/indent': 'off',
      '@html-eslint/no-extra-spacing-attrs': [
        'error',
        { enforceBeforeSelfClose: true },
      ],
      '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
      '@html-eslint/attrs-newline': 'off',
    },
  },
  // ESLINT CONFIG PRETTIER
  eslintConfigPrettier,
);
