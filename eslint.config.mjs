// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

// const filename = fileURLToPath(import.meta.url);
// const tsconfigRootDir = dirname(filename);

export default defineConfig([
    globalIgnores([
        'dist/*',
        '**/npm/**',
        '**/dist/**',
        '.husky/*',
        'node_modules/**'
    ]),
    ...pluginVue.configs['flat/recommended'],
    {
        files: [ '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.js', '**/*.mjs' ],
        languageOptions: {
            parser: typescriptParser,
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error', 'no-var': 'error',
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'interface'
            ],
            '@typescript-eslint/no-unused-vars': 'error', // 使用 ts 未使用变量的规则 比如枚举类型在es中会报错
            'no-extend-native': 0,
            'no-new': 0,
            'no-useless-escape': 0,
            'no-useless-constructor': 0,
            'no-trailing-spaces': [ 'error', { 'skipBlankLines': true } ],
            'indent': [ 'error', 4, {
                'SwitchCase': 1
            } ],
            'space-infix-ops': [ 'error', { 'int32Hint': false } ],
            'space-before-function-paren': [ 'error', {
                'anonymous': 'always',
                'named': 'always',
                'asyncArrow': 'always'
            } ],
            'semi': [ 'error', 'always' ],
            'comma-dangle': 0,
            'no-console': 0,
            'no-debugger': 0,
            'id-length': 0,
            'eol-last': 0,
            'object-curly-spacing': [ 'error', 'always' ],
            'array-bracket-spacing': [ 'error', 'always' ],
            'arrow-spacing': 'error',
            'no-multiple-empty-lines': 'error',
            'no-unused-vars': 'error',
            'spaced-comment': 'error',
            'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true } ],
            'no-unreachable': 'error',
            'keyword-spacing': 'error',
            'space-before-blocks': 'error',
            'semi-spacing': 'error',
            'comma-spacing': 'error',
            'key-spacing': 'error',
            'prefer-const': [ 'error', {
                'destructuring': 'any',
                'ignoreReadBeforeAssign': false
            } ],
            'space-infix-ops': 2,
            'no-irregular-whitespace': 2, // 不规则的空白不允许
            'no-trailing-spaces': 2, // 一行结束后面有空格就发出警告
            '@typescript-eslint/no-empty-function': 1,
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
    {
        files: [ '**/*.vue' ],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: typescriptParser,
                extraFileExtensions: [ '.vue' ],
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error', 'no-var': 'error',
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'interface'
            ],
            '@typescript-eslint/no-unused-vars': 'error', // 使用 ts 未使用变量的规则 比如枚举类型在es中会报错
            'no-extend-native': 0,
            'no-new': 0,
            'no-useless-escape': 0,
            'no-useless-constructor': 0,
            'no-trailing-spaces': [ 'error', { 'skipBlankLines': true } ],
            'indent': [ 'error', 4, {
                'SwitchCase': 1
            } ],
            'space-infix-ops': [ 'error', { 'int32Hint': false } ],
            'space-before-function-paren': [ 'error', {
                'anonymous': 'always',
                'named': 'always',
                'asyncArrow': 'always'
            } ],
            'semi': [ 'error', 'always' ],
            'comma-dangle': 0,
            'no-console': 0,
            'no-debugger': 0,
            'id-length': 0,
            'eol-last': 0,
            'object-curly-spacing': [ 'error', 'always' ],
            'array-bracket-spacing': [ 'error', 'always' ],
            'arrow-spacing': 'error',
            'no-multiple-empty-lines': 'error',
            'no-unused-vars': 'error',
            'spaced-comment': 'error',
            'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true } ],
            'no-unreachable': 'error',
            'keyword-spacing': 'error',
            'space-before-blocks': 'error',
            'semi-spacing': 'error',
            'comma-spacing': 'error',
            'key-spacing': 'error',
            'prefer-const': [ 'error', {
                'destructuring': 'any',
                'ignoreReadBeforeAssign': false
            } ],
            'space-infix-ops': 2,
            'no-irregular-whitespace': 2, // 不规则的空白不允许
            'no-trailing-spaces': 2, // 一行结束后面有空格就发出警告
            '@typescript-eslint/no-empty-function': 1,
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
]);
