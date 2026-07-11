module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'n8n-nodes-base'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: ['dist/', 'coverage/', 'node_modules/', '.opencode/'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['nodes/**/*.node.ts', 'credentials/**/*.credentials.ts'],
      rules: {
        'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'error',
        'n8n-nodes-base/node-class-description-outputs-wrong': 'error',
        'n8n-nodes-base/node-filename-against-convention': 'error',
        'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
      },
    },
  ],
};
