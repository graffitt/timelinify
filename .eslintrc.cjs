module.exports = {
    'ignorePatterns': ['libs/', 'release/', 'gulpfile.js'],
    'env': {
        'browser': true,
        'commonjs': true,
        'es2022': true,
        'es2023': true,
        'jquery': true
    },
    'extends': 'eslint:recommended',
    // 'parser': '@babel/eslint-parser',
    'parserOptions': {
        'ecmaVersion': 2023,
        'sourceType': 'module',
        'project': 'jsconfig.json'
    },
    'rules': {
        'indent': [
            'warn',
            4,
            {
                'SwitchCase': 1,
                'ignoreComments': true
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'warn',
            'single',
            {
                'allowTemplateLiterals': true
            }
        ],
        'semi': [
            'warn',
            'never'
        ],
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'no-useless-escape': 'off',
        'arrow-spacing': 'warn',
        'comma-spacing': ['warn', {'before': false, 'after': true}],
        'curly': ['warn', 'multi-line'],
        'object-curly-spacing': ['warn', 'never', {'objectsInObjects': false}],
        'array-bracket-spacing': ['warn', 'never'],
        'computed-property-spacing': ['warn', 'never'],
        'comma-dangle': ['error', 'never'],
        'space-in-parens': ['warn', 'never'],
        'space-before-function-paren': ['warn', {'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always'}],
        'space-before-blocks': ['warn', 'never'],
        'keyword-spacing': ['warn', {'before': true, 'after': false, 'overrides': {
            'const': {'after': true},
            'static': {'after': true},
            'case': {'after': true},
            'else': {'before': false},
            'return': {'after': true},
            'throw': {'after': true},
            'let': {'after': true},
            'from': {'after': true}
        }}],
        // 'no-var': 'warn',
        'no-redeclare': 'off',
        'eqeqeq': ['warn', 'always'],
        'no-multi-spaces': ['warn', {'ignoreEOLComments': true/*, 'exceptions': {'BinaryExpression': true}*/}],
        // 'spaced-comment': ['warn', 'always', {
        //     'line': {
        //         'markers': ['//', '?', '!', 'todo'],
        //         'exceptions': ['-', '+', '@']
        //     },
        //     'block': {
        //         'markers': ['!'],
        //         // 'exceptions': [''],
        //         'balanced': true
        //     }
        // }],
        'no-prototype-builtins': 'off',
        'space-infix-ops': 'warn',
        'no-inner-declarations': 'off',
        'no-case-declarations': 'off'
    },
    // 'plugins': ['prettier'],
    'globals': {
        // 'CHECK_SYMBOL': 'readonly',
        // 'RELATIVE_PIXEL': 'writable'
    }
}