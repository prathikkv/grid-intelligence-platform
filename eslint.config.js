// eslint.config.js - Enterprise Pharmaceutical Intelligence Platform ESLint Configuration
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      'public/**',
      '*.min.js',
      'vite.config.js.timestamp-*',
      '.vercel/**',
      '.cache/**',
      'cypress/downloads/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
      'storybook-static/**',
      'docs/build/**'
    ]
  },

  // Base JavaScript configuration
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
          impliedStrict: true
        }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      // Extend recommended configurations
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // ==============================
      // ERROR LEVEL RULES (Must Fix)
      // ==============================

      // Security and potential bugs
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-unsafe-innerhtml/no-unsafe-innerhtml': 'off', // Not available in flat config
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-alert': 'error',

      // Variable and scope rules
      'no-undef': 'error',
      'no-unused-vars': ['error', { 
        vars: 'all', 
        args: 'after-used', 
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-redeclare': 'error',
      'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions' }],
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

      // Best practices
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'no-eq-null': 'off', // Covered by eqeqeq
      'curly': ['error', 'all'],
      'dot-notation': 'error',
      'no-else-return': 'error',
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-return': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-var': 'error',

      // ==============================
      // REACT SPECIFIC RULES
      // ==============================

      // React best practices
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'react/jsx-uses-react': 'off', // Not needed with new JSX transform
      'react/prop-types': 'off', // Using TypeScript for type checking
      'react/display-name': 'off', // Allow anonymous components
      'react/no-unescaped-entities': 'error',
      'react/no-danger': 'warn',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unknown-property': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/void-dom-elements-no-children': 'error',

      // JSX rules
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-curly-spacing': ['error', 'never'],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-max-props-per-line': ['error', { maximum: 3, when: 'multiline' }],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-literals': 'off', // Allow string literals
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never'
      }],
      'react/jsx-uses-vars': 'error',
      'react/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh rules (for Vite HMR)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ==============================
      // WARNING LEVEL RULES (Should Fix)
      // ==============================

      // Code quality
      'complexity': ['warn', { max: 15 }],
      'max-depth': ['warn', { max: 4 }],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
      'max-params': ['warn', { max: 5 }],
      'no-magic-numbers': ['warn', { 
        ignore: [-1, 0, 1, 2, 100, 1000],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        detectObjects: false
      }],

      // Performance
      'no-loop-func': 'warn',
      'no-inner-declarations': 'warn',

      // Accessibility (basic rules)
      'jsx-a11y/alt-text': 'off', // Would need jsx-a11y plugin
      'jsx-a11y/anchor-has-content': 'off', // Would need jsx-a11y plugin

      // ==============================
      // STYLE RULES (Prettier will handle most)
      // ==============================

      // Spacing and formatting (minimal since Prettier handles this)
      'indent': 'off', // Let Prettier handle this
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'semi': ['warn', 'always'],
      'comma-dangle': ['warn', 'never'],
      'trailing-comma': 'off', // Let Prettier handle this

      // Object and array formatting
      'object-curly-spacing': ['warn', 'always'],
      'array-bracket-spacing': ['warn', 'never'],
      'computed-property-spacing': ['warn', 'never'],

      // ==============================
      // PHARMACEUTICAL DOMAIN SPECIFIC
      // ==============================

      // Naming conventions for pharmaceutical terms
      'camelcase': ['warn', { 
        properties: 'never',
        ignoreDestructuring: true,
        allow: [
          // Allow common pharmaceutical abbreviations
          'API_KEY', 'FDA_', 'CHEMBL_', 'UNIPROT_',
          'clinical_trials', 'adverse_events', 'drug_bank',
          'molecular_weight', 'half_life', 'bioactivity_data'
        ]
      }],

      // Comments for complex pharmaceutical calculations
      'require-jsdoc': 'off', // Use TypeScript instead
      'valid-jsdoc': 'off', // Use TypeScript instead

      // Security for handling sensitive pharmaceutical data
      'no-restricted-globals': ['error', {
        name: 'localStorage',
        message: 'Use secure storage for sensitive pharmaceutical data'
      }],

      // ==============================
      // ENTERPRISE SPECIFIC RULES
      // ==============================

      // Error handling
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',

      // Code organization
      'sort-imports': ['warn', {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }],

      // Performance optimizations
      'no-await-in-loop': 'warn',
      'require-await': 'warn'
    },

    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  },

  // TypeScript specific configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: ['./tsconfig.json']
      }
    },
    plugins: {
      '@typescript-eslint': 'typescript-eslint'
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error'
    }
  },

  // Test files configuration
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/test/**/*'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.vitest
      }
    },
    rules: {
      // Relax some rules for test files
      'no-magic-numbers': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'no-console': 'off'
    }
  },

  // Configuration files
  {
    files: ['*.config.{js,mjs,cjs}', 'vite.config.*', 'vitest.config.*'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      // Allow imports in config files
      'no-undef': 'off',
      'import/no-extraneous-dependencies': 'off'
    }
  },

  // Cypress test files
  {
    files: ['cypress/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly'
      }
    },
    rules: {
      // Cypress specific adjustments
      'no-unused-expressions': 'off'
    }
  },

  // Storybook files
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    rules: {
      // Allow default exports in stories
      'import/no-default-export': 'off',
      // Allow magic numbers in stories
      'no-magic-numbers': 'off'
    }
  }
];