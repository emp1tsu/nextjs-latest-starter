module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'require-jsdoc': ['off'],
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    '@next/next/no-img-element': ['off'],
  },
}
