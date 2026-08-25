export declare const plugins: string[];
export declare const rules: {
    'no-restricted-globals': (string | {
        message: string;
        name: string;
    })[];
    'node/no-exports-assign': string;
    'node/no-new-require': string;
};
declare const _default: {
    plugins: string[];
    rules: {
        'no-restricted-globals': (string | {
            message: string;
            name: string;
        })[];
        'node/no-exports-assign': string;
        'node/no-new-require': string;
    };
};
export default _default;
