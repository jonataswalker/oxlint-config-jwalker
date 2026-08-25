import base from './base.js';
import vue from './vue.js';
import node from './node.js';
import disabled from './disabled.js';
import typescript from './typescript.js';
export * from './constants.js';
export { base, node, vue, disabled, typescript };
export declare const categories: {
    correctness: string;
    nursery: string;
    pedantic: string;
    perf: string;
    restriction: string;
    style: string;
    suspicious: string;
};
export type JwalkerOptions = {
    /**
     * Extra ignore patterns, appended after the shared excludes.
     */
    ignores?: string[];
    /**
     * Node plugin and the `node:`-prefix restricted globals. Defaults to true.
     */
    node?: boolean;
    /**
     * Type-aware linting. Forced off when `typescript` is false. Defaults to true.
     */
    typeAware?: boolean;
    /**
     * TypeScript plugin and the type-aware overrides. Defaults to true.
     */
    typescript?: boolean;
    /**
     * Vue plugin, script blocks only. Defaults to false.
     */
    vue?: boolean;
};
/**
 * @typedef {object} JwalkerOptions
 * @property {string[]} [ignores] Extra ignore patterns, appended after the shared excludes.
 * @property {boolean} [node] Node plugin and the `node:`-prefix restricted globals. Defaults to true.
 * @property {boolean} [typeAware] Type-aware linting. Forced off when `typescript` is false. Defaults to true.
 * @property {boolean} [typescript] TypeScript plugin and the type-aware overrides. Defaults to true.
 * @property {boolean} [vue] Vue plugin, script blocks only. Defaults to false.
 */
/**
 * @param {JwalkerOptions} [options]
 * @returns {import('oxlint').OxlintConfig}
 */
export declare function jwalker(options?: JwalkerOptions): import('oxlint').OxlintConfig;
