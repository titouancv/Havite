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
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: tseslint.parser, // ✅ pass the actual parser object, not a string
    },
    plugins: {
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

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
