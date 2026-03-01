module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
        ],
    rules: {
          '@typescript-eslint/no-explicit-any': 'warn',
          '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
          'no-console': 'warn',
    },
    env: { node: true, es2020: true },
    ignorePatterns: ['dist/', 'node_modules/'],
};
