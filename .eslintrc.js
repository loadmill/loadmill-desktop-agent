module.exports = {
  root: true,
  globals: {
    chrome: 'readonly',
  },
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'unused-imports',
    'import',
    'typescript-sort-keys',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  rules: {
    'sort-vars': 'error',
    'no-var': 'error',
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'
        ],
      }
    ],
    'import/no-unresolved': 'off',
    'import/newline-after-import': 'error',
    'sort-imports': ['error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        // ignoreMemberSort: true,
        // allowSeparatedGroups: true
      }
    ],
    'no-use-before-define': 'off',
    'eslint-comments/no-use': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        // "callbacksLast": true,
        // "shorthandFirst": true,
        // "shorthandLast": true,
        // "multiline": "ignore" | "first" | "last",
        // "ignoreCase": true,
        // "noSortAlphabetically": true,
        // "reservedFirst": true,
      },
    ],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-max-depth': ['error', { 'max': 5 }
    ],
    'react/destructuring-assignment': 'error',
    'react/no-unused-prop-types': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/no-adjacent-inline-elements': 'error',
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'consistent'
      }
    ],
    'react/jsx-indent': ['error',
      2
    ],
    'react/boolean-prop-naming': ['error',
      { 'validateNested': true
      }
    ],
    'react/jsx-fragments': 'error',
    'no-multiple-empty-lines': ['error',
      { 'max': 1, 'maxEOF': 0
      }
    ],
    'space-before-blocks': 'error',
    'keyword-spacing': ['error'
    ],
    'no-trailing-spaces': 'error',
    curly: ['error'
    ],
    'brace-style': ['error'
    ],
    'eol-last': ['error'
    ],
    'no-console': 1,
    indent: ['error',
      2
    ],
    quotes: ['error', 'single'
    ],
    'object-curly-spacing': ['error', 'always'
    ],
    'no-multi-spaces': ['error'
    ],
    'no-empty': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'max-classes-per-file': ['error',
      10
    ],
    'no-prototype-builtins': 'off',
    semi: ['error', 'always'
    ],
    'max-len': ['error',
      200
    ],
    'react/display-name': 'off',
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-first-prop-new-line': ['error', 'multiline'
    ],
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
      },
    ],
    'react/jsx-closing-bracket-location': 2,
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': ['error'
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: 'Avoid using the `Object` type. Did you mean `object`?',
          Boolean: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          Number: 'Avoid using the `Number` type. Did you mean `number`?',
          String: 'Avoid using the `String` type. Did you mean `string`?',
          Symbol: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
        },
        extendDefaults: false,
      },
    ],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-array-constructor': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'always',
        // allowMultiline: true,
      },
    ],
    'react/jsx-equals-spacing': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
  overrides: [
    {
      files: ['*.tsx'
      ],
      rules: {
        '@typescript-eslint/prefer-as-const': 'off',
      },
    },
    {
      files: '*.spec.*',
      env: {
        mocha: true,
      },
    },
  ],
};
