import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  // Config JavaScript de base (ESLint Recommended)
  pluginJs.configs.recommended,

  // Config TypeScript recommandée
  ...tseslint.configs.recommended,

  // Configuration personnalisée du projet
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Règles ESLint
      'no-unused-vars': 'warn',
      'no-console': 'off',

      // Règles TypeScript (exemples)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Prettier en tant que règle ESLint
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          tabWidth: 2,
          trailingComma: 'es5',
          printWidth: 100,
        },
      ],
    },
  },

  // Désactive les règles en conflit avec Prettier
  prettierConfig,
]
