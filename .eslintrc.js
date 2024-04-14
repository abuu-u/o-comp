module.exports = {
  extends: ['plugin:unicorn/recommended', 'next/core-web-vitals', 'prettier'],
  rules: {
    'unicorn/prefer-node-protocol': 0,
    'no-console': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: { generateStaticParams: true },
      },
    ],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
  },
}
