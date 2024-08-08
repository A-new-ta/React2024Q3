module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, es2020: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'next.config.js'],
  plugins: ['react-compiler', '@typescript-eslint', 'prettier', 'react', 'react-hooks'],
  rules: {
    'react-compiler/react-compiler': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/no-explicit-any': 'error',
  },
}
