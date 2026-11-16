import base from './base.js'
import vue from './vue.js'
import node from './node.js'
import disabled from './disabled.js'
import typescript from './typescript.js'
import { GLOB_EXCLUDE } from './constants.js'

export * from './constants.js'

export { base, node, vue, disabled, typescript }

/** @import { OxlintConfig } from 'oxlint' */

/** @type {NonNullable<OxlintConfig['categories']>} */
export const categories = {
    correctness: 'error',
    nursery: 'off',
    pedantic: 'off',
    perf: 'error',
    restriction: 'off',
    style: 'off',
    suspicious: 'error',
}

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
 * @returns {OxlintConfig}
 */
export function jwalker(options = {}) {
    const {
        ignores = [],
        node: withNode = true,
        typeAware = true,
        typescript: withTypeScript = true,
        vue: withVue = false,
    } = options

    /** @type {OxlintConfig[]} */
    const parts = [base]

    if (withNode) parts.push(node)

    if (withTypeScript) parts.push(typescript)

    if (withVue) parts.push(vue)

    parts.push(disabled)

    return {
        categories,
        env: {
            browser: true,
            builtin: true,
            es2026: true,
            node: withNode,
        },
        ignorePatterns: [...GLOB_EXCLUDE, ...ignores],
        options: { typeAware: withTypeScript && typeAware },
        overrides: parts.flatMap((part) => part.overrides ?? []),
        plugins: [...new Set(parts.flatMap((part) => part.plugins ?? []))],
        rules: Object.assign({}, ...parts.map((part) => part.rules ?? {})),
    }
}
