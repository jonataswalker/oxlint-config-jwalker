export const plugins: string[];
export const rules: {
    'no-restricted-globals': (string | {
        message: string;
        name: string;
    })[];
    'node/no-exports-assign': string;
    'node/no-new-require': string;
    'unicorn/prefer-node-protocol': string;
};
declare namespace _default {
    export { plugins };
    export { rules };
}
export default _default;
