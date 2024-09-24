module.exports = {
  endOfLine: 'auto',
  trailingComma: 'es5',
  bracketSpacing: true,
  singleQuote: true,
  tabWidth: 2,
  importOrder: [
    '^(react|next?/?([a-zA-Z/]*))$',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
