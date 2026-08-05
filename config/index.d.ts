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
export function jwalker(options?: JwalkerOptions): import("oxlint").OxlintConfig;
export * from "./constants.js";
export namespace categories {
    let correctness: string;
    let nursery: string;
    let pedantic: string;
    let perf: string;
    let restriction: string;
    let style: string;
    let suspicious: string;
}
export type JwalkerOptions = {
    /**
     * Extra ignore patterns, appended after the shared excludes.
     */
    ignores?: string[] | undefined;
    /**
     * Node plugin and the `node:`-prefix restricted globals. Defaults to true.
     */
    node?: boolean | undefined;
    /**
     * Type-aware linting. Forced off when `typescript` is false. Defaults to true.
     */
    typeAware?: boolean | undefined;
    /**
     * TypeScript plugin and the type-aware overrides. Defaults to true.
     */
    typescript?: boolean | undefined;
    /**
     * Vue plugin, script blocks only. Defaults to false.
     */
    vue?: boolean | undefined;
};
import base from './base.js';
import node from './node.js';
import vue from './vue.js';
import disabled from './disabled.js';
import typescript from './typescript.js';
export { base, node, vue, disabled, typescript };
