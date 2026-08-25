import assert from 'node:assert'
import { it, before, after, describe } from 'node:test'
import { execFileSync } from 'node:child_process'
import { rmSync, writeFileSync } from 'node:fs'

import { jwalker } from '../config/index.js'

const CONFIG_PATH = 'tmp-oxlint-test.json'
const BIN = 'node_modules/.bin/oxlint'

const lint = (file) => {
    try {
        return JSON.parse(execFileSync(BIN, ['-c', CONFIG_PATH, '-f', 'json', file], { encoding: 'utf8' }))
    } catch (error) {
        const { stdout } = error

        if (typeof stdout !== 'string' || stdout.length === 0) throw error

        return JSON.parse(stdout)
    }
}

const codesIn = (report) => new Set(report.diagnostics.map((entry) => entry.code))

describe('oxlint accepts the composed config', () => {
    before(() => {
        writeFileSync(CONFIG_PATH, JSON.stringify(jwalker({ ignores: [] }), null, 2))
    })

    after(() => {
        rmSync(CONFIG_PATH, { force: true })
    })

    it('parses without unknown rule or plugin names', () => {
        const report = lint('lint/invalid.ts')

        assert.ok(report.number_of_rules > 0, 'no rules were registered')
    })

    it('enforces the shared taste rules on typescript', () => {
        const codes = codesIn(lint('lint/invalid.ts'))

        assert.ok(codes.has('eslint(eqeqeq)'))
        assert.ok(codes.has('eslint(prefer-template)'))
    })

    it('runs type-aware rules on typescript sources', () => {
        const codes = codesIn(lint('lint/invalid.ts'))

        assert.ok(
            codes.has('typescript(require-await)'),
            'type-aware rules did not reach .ts files — check the override globs',
        )
    })

    it('does not double-report a rule that has a typescript replacement', () => {
        const codes = codesIn(lint('lint/invalid.ts'))

        assert.ok(codes.has('typescript(require-await)'))
        assert.ok(
            !codes.has('eslint(require-await)'),
            'the base rule fired alongside its typescript replacement',
        )
    })

    it('keeps type-aware rules off javascript sources', () => {
        const report = lint('lint/invalid.js')
        const codes = codesIn(report)

        assert.ok(codes.has('eslint(eqeqeq)'), 'core rules should still apply to .js')
        assert.ok(
            !codes.has('typescript(require-await)'),
            'type-aware rules leaked into .js — check the disable override globs',
        )
    })
})
