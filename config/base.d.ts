export declare const plugins: string[];
export declare const RESTRICTED_GLOBALS: {
    message: string;
    name: string;
}[];
export declare const rules: {
    'accessor-pairs': string;
    'array-callback-return': string;
    'block-scoped-var': string;
    complexity: (string | number)[];
    'default-case-last': string;
    eqeqeq: string[];
    'func-style': (string | {
        allowArrowFunctions: boolean;
    })[];
    'grouped-accessor-pairs': string;
    'max-classes-per-file': string;
    'max-depth': (string | number)[];
    'max-nested-callbacks': (string | number)[];
    'max-params': (string | number)[];
    'max-statements': (string | number)[];
    'new-cap': (string | {
        capIsNew: boolean;
        properties: boolean;
    })[];
    'no-alert': string;
    'no-array-constructor': string;
    'no-caller': string;
    'no-cond-assign': string[];
    'no-console': (string | {
        allow: string[];
    })[];
    'no-constructor-return': string;
    'no-div-regex': string;
    'no-duplicate-imports': string;
    'no-empty': (string | {
        allowEmptyCatch: boolean;
    })[];
    'no-empty-function': string;
    'no-eq-null': string;
    'no-eval': string;
    'no-extend-native': string;
    'no-extra-bind': string;
    'no-implicit-coercion': string;
    'no-implicit-globals': string;
    'no-implied-eval': string;
    'no-inline-comments': string;
    'no-iterator': string;
    'no-labels': string;
    'no-lone-blocks': string;
    'no-multi-str': string;
    'no-negated-condition': string;
    'no-new': string;
    'no-new-func': string;
    'no-new-wrappers': string;
    'no-param-reassign': (string | {
        props: boolean;
    })[];
    'no-promise-executor-return': string;
    'no-proto': string;
    'no-redeclare': (string | {
        builtinGlobals: boolean;
    })[];
    'no-restricted-globals': (string | {
        message: string;
        name: string;
    })[];
    'no-restricted-properties': (string | {
        message: string;
        property: string;
    })[];
    'no-self-assign': (string | {
        props: boolean;
    })[];
    'no-self-compare': string;
    'no-sequences': string;
    'no-shadow': (string | {
        builtinGlobals: boolean;
        hoist: string;
    })[];
    'no-template-curly-in-string': string;
    'no-throw-literal': string;
    'no-undefined': string;
    'no-unmodified-loop-condition': string;
    'no-unneeded-ternary': (string | {
        defaultAssignment: boolean;
    })[];
    'no-unused-expressions': (string | {
        allowShortCircuit: boolean;
        allowTernary: boolean;
    })[];
    'no-unused-vars': (string | {
        caughtErrors: string;
        destructuredArrayIgnorePattern: string;
    })[];
    'no-useless-call': string;
    'no-useless-computed-key': string;
    'no-useless-constructor': string;
    'no-useless-rename': (string | {
        ignoreDestructuring: boolean;
        ignoreExport: boolean;
        ignoreImport: boolean;
    })[];
    'no-useless-return': string;
    'no-var': string;
    'no-warning-comments': string;
    'object-shorthand': (string | {
        avoidQuotes: boolean;
        ignoreConstructors: boolean;
    })[];
    'prefer-arrow-callback': (string | {
        allowNamedFunctions: boolean;
        allowUnboundThis: boolean;
    })[];
    'prefer-const': (string | {
        destructuring: string;
        ignoreReadBeforeAssign: boolean;
    })[];
    'prefer-destructuring': (string | {
        array: boolean;
        object: boolean;
    })[];
    'prefer-exponentiation-operator': string;
    'prefer-promise-reject-errors': string;
    'prefer-regex-literals': (string | {
        disallowRedundantWrapping: boolean;
    })[];
    'prefer-rest-params': string;
    'prefer-spread': string;
    'prefer-template': string;
    'require-await': string;
    'sort-vars': string;
    'symbol-description': string;
    'unicode-bom': string[];
    'use-isnan': (string | {
        enforceForIndexOf: boolean;
        enforceForSwitchCase: boolean;
    })[];
    'valid-typeof': (string | {
        requireStringLiterals: boolean;
    })[];
    'vars-on-top': string;
    yoda: string[];
    'import/default': string;
    'import/first': string;
    'import/no-duplicates': string;
    'import/no-mutable-exports': string;
    'import/no-named-as-default': string;
    'import/no-named-as-default-member': string;
    'import/no-self-import': string;
    'promise/catch-or-return': string;
    'promise/no-nesting': string;
    'promise/no-new-statics': string;
    'promise/no-promise-in-callback': string;
    'promise/no-return-wrap': string;
    'promise/param-names': string;
    'promise/valid-params': string;
    'unicorn/consistent-function-scoping': string;
    'unicorn/explicit-length-check': string;
    'unicorn/filename-case': (string | {
        cases: {
            camelCase: boolean;
            kebabCase: boolean;
            pascalCase: boolean;
        };
    })[];
    'unicorn/no-lonely-if': string;
    'unicorn/no-nested-ternary': string;
    'unicorn/no-static-only-class': string;
    'unicorn/no-typeof-undefined': string;
    'unicorn/no-useless-undefined': string;
    'unicorn/prefer-global-this': string;
    'unicorn/prefer-module': string;
    'unicorn/prefer-node-protocol': string;
    'unicorn/prefer-string-raw': string;
    'unicorn/prefer-ternary': string;
    'unicorn/prefer-top-level-await': string;
    'unicorn/switch-case-braces': string;
};
declare const _default: {
    plugins: string[];
    rules: {
        'accessor-pairs': string;
        'array-callback-return': string;
        'block-scoped-var': string;
        complexity: (string | number)[];
        'default-case-last': string;
        eqeqeq: string[];
        'func-style': (string | {
            allowArrowFunctions: boolean;
        })[];
        'grouped-accessor-pairs': string;
        'max-classes-per-file': string;
        'max-depth': (string | number)[];
        'max-nested-callbacks': (string | number)[];
        'max-params': (string | number)[];
        'max-statements': (string | number)[];
        'new-cap': (string | {
            capIsNew: boolean;
            properties: boolean;
        })[];
        'no-alert': string;
        'no-array-constructor': string;
        'no-caller': string;
        'no-cond-assign': string[];
        'no-console': (string | {
            allow: string[];
        })[];
        'no-constructor-return': string;
        'no-div-regex': string;
        'no-duplicate-imports': string;
        'no-empty': (string | {
            allowEmptyCatch: boolean;
        })[];
        'no-empty-function': string;
        'no-eq-null': string;
        'no-eval': string;
        'no-extend-native': string;
        'no-extra-bind': string;
        'no-implicit-coercion': string;
        'no-implicit-globals': string;
        'no-implied-eval': string;
        'no-inline-comments': string;
        'no-iterator': string;
        'no-labels': string;
        'no-lone-blocks': string;
        'no-multi-str': string;
        'no-negated-condition': string;
        'no-new': string;
        'no-new-func': string;
        'no-new-wrappers': string;
        'no-param-reassign': (string | {
            props: boolean;
        })[];
        'no-promise-executor-return': string;
        'no-proto': string;
        'no-redeclare': (string | {
            builtinGlobals: boolean;
        })[];
        'no-restricted-globals': (string | {
            message: string;
            name: string;
        })[];
        'no-restricted-properties': (string | {
            message: string;
            property: string;
        })[];
        'no-self-assign': (string | {
            props: boolean;
        })[];
        'no-self-compare': string;
        'no-sequences': string;
        'no-shadow': (string | {
            builtinGlobals: boolean;
            hoist: string;
        })[];
        'no-template-curly-in-string': string;
        'no-throw-literal': string;
        'no-undefined': string;
        'no-unmodified-loop-condition': string;
        'no-unneeded-ternary': (string | {
            defaultAssignment: boolean;
        })[];
        'no-unused-expressions': (string | {
            allowShortCircuit: boolean;
            allowTernary: boolean;
        })[];
        'no-unused-vars': (string | {
            caughtErrors: string;
            destructuredArrayIgnorePattern: string;
        })[];
        'no-useless-call': string;
        'no-useless-computed-key': string;
        'no-useless-constructor': string;
        'no-useless-rename': (string | {
            ignoreDestructuring: boolean;
            ignoreExport: boolean;
            ignoreImport: boolean;
        })[];
        'no-useless-return': string;
        'no-var': string;
        'no-warning-comments': string;
        'object-shorthand': (string | {
            avoidQuotes: boolean;
            ignoreConstructors: boolean;
        })[];
        'prefer-arrow-callback': (string | {
            allowNamedFunctions: boolean;
            allowUnboundThis: boolean;
        })[];
        'prefer-const': (string | {
            destructuring: string;
            ignoreReadBeforeAssign: boolean;
        })[];
        'prefer-destructuring': (string | {
            array: boolean;
            object: boolean;
        })[];
        'prefer-exponentiation-operator': string;
        'prefer-promise-reject-errors': string;
        'prefer-regex-literals': (string | {
            disallowRedundantWrapping: boolean;
        })[];
        'prefer-rest-params': string;
        'prefer-spread': string;
        'prefer-template': string;
        'require-await': string;
        'sort-vars': string;
        'symbol-description': string;
        'unicode-bom': string[];
        'use-isnan': (string | {
            enforceForIndexOf: boolean;
            enforceForSwitchCase: boolean;
        })[];
        'valid-typeof': (string | {
            requireStringLiterals: boolean;
        })[];
        'vars-on-top': string;
        yoda: string[];
        'import/default': string;
        'import/first': string;
        'import/no-duplicates': string;
        'import/no-mutable-exports': string;
        'import/no-named-as-default': string;
        'import/no-named-as-default-member': string;
        'import/no-self-import': string;
        'promise/catch-or-return': string;
        'promise/no-nesting': string;
        'promise/no-new-statics': string;
        'promise/no-promise-in-callback': string;
        'promise/no-return-wrap': string;
        'promise/param-names': string;
        'promise/valid-params': string;
        'unicorn/consistent-function-scoping': string;
        'unicorn/explicit-length-check': string;
        'unicorn/filename-case': (string | {
            cases: {
                camelCase: boolean;
                kebabCase: boolean;
                pascalCase: boolean;
            };
        })[];
        'unicorn/no-lonely-if': string;
        'unicorn/no-nested-ternary': string;
        'unicorn/no-static-only-class': string;
        'unicorn/no-typeof-undefined': string;
        'unicorn/no-useless-undefined': string;
        'unicorn/prefer-global-this': string;
        'unicorn/prefer-module': string;
        'unicorn/prefer-node-protocol': string;
        'unicorn/prefer-string-raw': string;
        'unicorn/prefer-ternary': string;
        'unicorn/prefer-top-level-await': string;
        'unicorn/switch-case-braces': string;
    };
};
export default _default;
