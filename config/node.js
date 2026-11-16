import { RESTRICTED_GLOBALS } from './base.js'

/** @import { OxlintConfig } from 'oxlint' */

/** @type {NonNullable<OxlintConfig['plugins']>} */
export const plugins = ['node']

/** @type {NonNullable<OxlintConfig['rules']>} */
export const rules = {
    'no-restricted-globals': [
        'error',
        ...RESTRICTED_GLOBALS,
        { message: 'Import Buffer from `node:buffer` instead', name: 'Buffer' },
        { message: 'Import process from `node:process` instead', name: 'process' },
        { message: 'Import setTimeout from `node:timers` instead', name: 'setTimeout' },
        { message: 'Import setInterval from `node:timers` instead', name: 'setInterval' },
        { message: 'Import setImmediate from `node:timers` instead', name: 'setImmediate' },
        { message: 'Import clearTimeout from `node:timers` instead', name: 'clearTimeout' },
        { message: 'Import clearInterval from `node:timers` instead', name: 'clearInterval' },
        { message: 'Import clearImmediate from `node:timers` instead', name: 'clearImmediate' },
    ],
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
}

/** @type {{ plugins: typeof plugins, rules: typeof rules }} */
const preset = { plugins, rules }

export default preset
