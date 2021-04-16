module.exports = {
  extends: [
    'react-app',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['jsx-a11y', 'react-hooks'],
  root: true,
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'jsx-a11y/accessible-emoji': 0,
    'jsx-a11y/no-onchange': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'any', next: '*', prev: ['const', 'let'] },
      { blankLine: 'any', next: ['const', 'let'], prev: ['const', 'let'] },
      { blankLine: 'always', next: '*', prev: 'multiline-block-like' },
      { blankLine: 'always', next: '*', prev: 'multiline-expression' },
      { blankLine: 'always', next: '*', prev: 'multiline-const' },
      { blankLine: 'always', next: '*', prev: 'multiline-let' },
      { blankLine: 'always', next: 'multiline-const', prev: '*' },
      { blankLine: 'always', next: 'multiline-let', prev: '*' },
      { blankLine: 'always', next: 'multiline-block-like', prev: '*' },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-sort-props': 'error',
    'react/react-in-jsx-scope': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        paths: ['./src'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
