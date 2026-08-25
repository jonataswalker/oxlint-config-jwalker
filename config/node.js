import { RESTRICTED_GLOBALS } from './base.js'

export const plugins = ['node']

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

export default { plugins, rules }
