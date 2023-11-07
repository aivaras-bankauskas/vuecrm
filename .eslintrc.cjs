module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        'eslint-config-prettier',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        requireConfigFile: false,
        ecmaVersion: 2020
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { 'baseIndent': 1, 'switchCase': 1 }],
        'vue/no-multiple-template-root': 0,
        'semi': [2, 'always'],
        'no-trailing-spaces': ['error', { 'skipBlankLines': false }],
        'vue/no-multi-spaces': ['error', { 'ignoreProperties': false }],
        'object-curly-spacing': ['error', 'always'],
        'switch-colon-spacing': ['error', { 'after': true, 'before': false }],
        'quotes': ['error', 'single'],
        'eol-last': ['error', 'always'],
        'vue/no-v-for-template-key': 'off'
    },
    'overrides': [
        {
            'files': ['*.vue'],
            'rules': { 'indent': 'off' }
        }
    ]
};
