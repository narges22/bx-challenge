import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import jsdoc from 'eslint-plugin-jsdoc'
import promise from 'eslint-plugin-promise'

const commonRules = {
  ...js.configs.recommended.rules,
  ...react.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  ...jsxA11y.flatConfigs.recommended.rules,
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  'jsx-a11y/no-static-element-interactions': 'off',
  'jsx-a11y/click-events-have-key-events': 'off'
}

const promiseRules = {
  'promise/catch-or-return': 'error',
  'promise/no-return-wrap': 'error',
  'promise/param-names': 'error',
  'promise/always-return': 'warn',
  'promise/no-nesting': 'warn',
  'promise/no-promise-in-callback': 'warn',
  'promise/valid-params': 'warn'
}

const jsdocRules = {
  'jsdoc/require-param': 'error',
  'jsdoc/require-param-description': 'error',
  'jsdoc/require-param-type': 'error',
  'jsdoc/check-param-names': 'error'
}

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      jsdoc,
      'jsx-a11y': jsxA11y,
      promise,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },

    rules: {
      ...commonRules,
      ...promiseRules,
      ...jsdocRules,
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: 'Default React import is forbidden.'
            }
          ]
        }
      ]
    }
  }
]
