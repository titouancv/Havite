import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default [
  // Base JavaScript config (ESLint Recommended)
  pluginJs.configs.recommended,

  // Recommended TypeScript config
  ...tseslint.configs.recommended,

  // Custom project configuration
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest', // Latest ECMAScript version
        sourceType: 'module', // Use ES modules
        ecmaFeatures: {
          jsx: true, // Enable JSX syntax
        },
      },
      parser: '@typescript-eslint/parser', // Use TypeScript parser for ESLint
    },
    plugins: {
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // ESLint core rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',

      // React-specific rules
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',

      // React hooks rules
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

      // Prettier formatting rules enforced as ESLint errors
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

  // Disable ESLint rules that conflict with Prettier
  prettierConfig,
]
