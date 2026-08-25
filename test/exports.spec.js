import assert from 'node:assert'
import { it, describe } from 'node:test'

import {
    base,
    node,
    vue,
    GLOB_JS,
    GLOB_TS,
    GLOB_SRC,
    GLOB_DTS,
    GLOB_JSX,
    GLOB_TSX,
    GLOB_VUE,
    jwalker,
    disabled,
    GLOB_TESTS,
    typescript,
    GLOB_EXCLUDE,
    GLOB_SRC_EXT,
} from '../config/index.js'

const PRESETS = { base, disabled, node, typescript, vue }

const GLOBS = {
    GLOB_DTS,
    GLOB_JS,
    GLOB_JSX,
    GLOB_SRC,
    GLOB_SRC_EXT,
    GLOB_TS,
    GLOB_TSX,
    GLOB_VUE,
}

describe('lib exports', () => {
    it('exports every preset as a config fragment', () => {
        for (const [name, preset] of Object.entries(PRESETS)) {
            assert.ok(preset && typeof preset === 'object', `${name} is not exported`)
            assert.ok(Object.keys(preset.rules).length > 0, `${name} carries no rules`)
        }

        assert.ok(Array.isArray(typescript.overrides) && typescript.overrides.length > 0)
        assert.equal(typeof jwalker, 'function')
    })

    it('exports constants', () => {
        for (const [name, glob] of Object.entries(GLOBS)) {
            assert.ok(typeof glob === 'string' && glob.length > 0, `${name} is not a string`)
        }

        assert.ok(Array.isArray(GLOB_TESTS) && GLOB_TESTS.length > 0)
        assert.ok(Array.isArray(GLOB_EXCLUDE) && GLOB_EXCLUDE.length > 0)
    })

    it('uses brace globs, never extglobs, since oxlint does not parse extglobs', () => {
        const patterns = [
            ...Object.entries(GLOBS),
            ...GLOB_TESTS.map((glob, index) => [`GLOB_TESTS[${index}]`, glob]),
            ...GLOB_EXCLUDE.map((glob, index) => [`GLOB_EXCLUDE[${index}]`, glob]),
        ]

        for (const [name, glob] of patterns) {
            assert.ok(!glob.includes('?('), `${name} uses an extglob oxlint cannot match`)
        }
    })

    it('never uses an empty brace alternative, which oxlint does not expand', () => {
        for (const glob of GLOB_EXCLUDE) {
            assert.ok(!glob.includes('{,'), `${glob} relies on an empty brace alternative`)
        }
    })
})

describe('jwalker composer', () => {
    it('merges plugins without duplicates', () => {
        const config = jwalker({ vue: true })

        assert.deepEqual(config.plugins, [...new Set(config.plugins)])
        assert.ok(config.plugins.includes('vue'))
        assert.ok(config.plugins.includes('typescript'))
        assert.ok(config.plugins.includes('node'))
    })

    it('omits opt-in presets by default', () => {
        const config = jwalker()

        assert.ok(!config.plugins.includes('vue'))
        assert.ok(!Object.hasOwn(config.rules, 'vue/require-prop-types'))
    })

    it('drops the node preset and its globals when node is false', () => {
        const config = jwalker({ node: false })

        assert.ok(!config.plugins.includes('node'))
        assert.equal(config.env.node, false)

        const restricted = config.rules['no-restricted-globals'].slice(1)

        assert.ok(restricted.every((entry) => entry.name !== 'Buffer'))
        assert.ok(restricted.some((entry) => entry.name === 'global'))
    })

    it('keeps the base restricted globals when the node preset merges its own', () => {
        const restricted = jwalker().rules['no-restricted-globals'].slice(1)
        const names = new Set(restricted.map((entry) => entry.name))

        for (const name of ['global', 'self', 'Buffer', 'process']) {
            assert.ok(names.has(name), `${name} was lost when node rules overwrote base rules`)
        }
    })

    it('hands each base rule over to its typescript replacement on ts files', () => {
        const [typeScriptOverride] = jwalker().overrides
        const handovers = {
            'no-implied-eval': 'typescript/no-implied-eval',
            'no-throw-literal': 'typescript/only-throw-error',
            'require-await': 'typescript/require-await',
        }

        for (const [baseRule, replacement] of Object.entries(handovers)) {
            assert.equal(typeScriptOverride.rules[baseRule], 'off', `${baseRule} double-reports`)
            assert.equal(typeScriptOverride.rules[replacement], 'error')
        }
    })

    it('lets disabled win over every preset composed before it', () => {
        const config = jwalker({ vue: true })

        for (const name of Object.keys(disabled.rules)) {
            assert.equal(config.rules[name], 'off', `${name} was not disabled`)
        }
    })

    it('turns type-aware linting off together with the typescript preset', () => {
        assert.equal(jwalker({ typescript: false }).options.typeAware, false)
        assert.equal(jwalker({ typeAware: false }).options.typeAware, false)
        assert.equal(jwalker().options.typeAware, true)
    })

    it('appends caller ignores after the shared excludes', () => {
        const config = jwalker({ ignores: ['**/generated'] })

        assert.ok(config.ignorePatterns.includes('**/node_modules'))
        assert.equal(config.ignorePatterns.at(-1), '**/generated')
    })

    it('keeps style rules off at category level so oxfmt owns formatting', () => {
        assert.equal(jwalker().categories.style, 'off')
    })
})
