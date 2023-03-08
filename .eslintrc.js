module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    "@typescript-eslint/comma-dangle": ["warn", "always-multiline"],
    "@typescript-eslint/space-before-function-paren": ["warn", "never"],
    "@typescript-eslint/indent": ["warn", 4]
  }
}
