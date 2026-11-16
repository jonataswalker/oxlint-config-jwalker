import { execFileSync, spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const fixtures = path.join(root, 'test/consumer')
const manifest = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))
const { devDependencies } = manifest

const TSRS_LINT_OXLINT_FLOOR = '1.92.0'
const PRESETS = ['base', 'node', 'typescript', 'vue', 'disabled']
const CONFIG_MODULES = ['base', 'constants', 'disabled', 'index', 'node', 'typescript', 'vue']
const EXPECTED_FILES = [
    'LICENSE',
    'README.md',
    'package.json',
    ...CONFIG_MODULES.flatMap((name) => [`config/${name}.d.ts`, `config/${name}.js`]),
].toSorted()
const TYPE_AWARE_CODES = [
    'await-thenable',
    'dot-notation',
    'no-base-to-string',
    'no-confusing-void-expression',
    'no-floating-promises',
    'no-for-in-array',
    'no-implied-eval',
    'no-misused-promises',
    'no-unnecessary-type-assertion',
    'only-throw-error',
    'prefer-includes',
    'prefer-string-starts-ends-with',
    'promise-function-async',
    'require-array-sort-compare',
    'require-await',
    'return-await',
    'unbound-method',
].map((rule) => `typescript(${rule})`)

function peerFloor(name) {
    const range = manifest.peerDependencies[name]

    if (!/^>=\d+\.\d+\.\d+(?:-[\w.]+)?$/u.test(range)) throw new Error(`Expected a >= floor for ${name}, found "${range}"`)

    return range.slice(2)
}

const BACKENDS = [
    {
        name: 'tsgolint',
        oxlint: devDependencies.oxlint,
        install: `oxlint-tsgolint@${devDependencies['oxlint-tsgolint']}`,
        bin: 'tsgolint',
        mustBeAbsent: ['tsrs'],
    },
    {
        name: 'tsrs-lint',
        oxlint: devDependencies.oxlint,
        install: `tsrs@${peerFloor('tsrs')}`,
        bin: 'tsrs-lint',
        mustBeAbsent: ['oxlint-tsgolint'],
    },
    {
        name: 'tsrs-lint at its oxlint floor',
        oxlint: TSRS_LINT_OXLINT_FLOOR,
        install: `tsrs@${peerFloor('tsrs')}`,
        bin: 'tsrs-lint',
        mustBeAbsent: ['oxlint-tsgolint'],
    },
    {
        name: 'tsgolint at the peer floor',
        oxlint: peerFloor('oxlint'),
        install: `oxlint-tsgolint@${peerFloor('oxlint-tsgolint')}`,
        bin: 'tsgolint',
        mustBeAbsent: ['tsrs'],
    },
]

const isolatedEnv = { ...process.env, PATH: path.dirname(process.execPath) }

function fail(message) {
    console.error(message)
    process.exit(1)
}

function packTarball(destination) {
    const output = execFileSync('npm', ['pack', '--json', '--pack-destination', destination], {
        cwd: root,
        encoding: 'utf8',
    })
    const report = JSON.parse(output)
    const [entry] = Array.isArray(report) ? report : Object.values(report)
    const files = entry.files.map((file) => file.path).toSorted()

    if (JSON.stringify(files) !== JSON.stringify(EXPECTED_FILES)) {
        fail(`Unexpected tarball contents:\n${files.join('\n')}`)
    }

    console.log(`Tarball has the ${files.length} expected files`)

    return path.join(destination, entry.filename)
}

function writeConsumer(directory) {
    cpSync(fixtures, directory, { recursive: true })
    writeFileSync(
        path.join(directory, 'package.json'),
        JSON.stringify({ name: 'consumer', private: true, type: 'module' }),
    )

    for (const preset of PRESETS) {
        writeFileSync(
            path.join(directory, `preset-${preset}.config.ts`),
            `import { defineConfig } from 'oxlint'\nimport { ${preset} } from 'oxlint-config-jwalker'\n\nexport default defineConfig({ extends: [${preset}] })\n`,
        )
    }
}

function install(directory, tarball, backend) {
    execFileSync(
        'npm',
        [
            'install',
            '--no-audit',
            '--no-fund',
            '--ignore-scripts',
            tarball,
            `oxlint@${backend.oxlint}`,
            `typescript@${devDependencies.typescript}`,
            backend.install,
        ],
        { cwd: directory, stdio: 'ignore' },
    )

    for (const name of backend.mustBeAbsent) {
        if (existsSync(path.join(directory, 'node_modules', name))) {
            fail(`${backend.name}: ${name} must not be installed in this consumer`)
        }
    }
}

function oxlint(directory, config, file) {
    const result = spawnSync(
        path.join(directory, 'node_modules/.bin/oxlint'),
        ['-c', config, '-f', 'json', file],
        { cwd: directory, encoding: 'utf8', env: isolatedEnv },
    )

    try {
        return { ...JSON.parse(result.stdout), output: result.stdout }
    } catch {
        return { diagnostics: null, output: `${result.stdout}${result.stderr}` }
    }
}

function diagnosticsOf(report) {
    return report.diagnostics
        .map(({ code, filename, labels }) => `${filename}:${labels[0]?.span.line}:${labels[0]?.span.column} ${code}`)
        .toSorted()
}

function typeCheck(directory) {
    const result = spawnSync(
        process.execPath,
        [path.join(directory, 'node_modules/typescript/bin/tsc'), '-p', directory],
        { encoding: 'utf8' },
    )

    if (result.status !== 0) fail(`TypeScript consumer failed:\n${result.stdout}${result.stderr}`)
}

function checkPresets(directory, backend) {
    for (const preset of PRESETS) {
        const report = oxlint(directory, `preset-${preset}.config.ts`, 'type-aware.ts')

        if (!Array.isArray(report.diagnostics)) {
            fail(`${backend.name}: preset ${preset} did not load:\n${report.output}`)
        }
    }
}

function checkTypeAwareRules(directory, backend) {
    const report = oxlint(directory, 'jwalker.config.ts', 'type-aware.ts')

    if (!Array.isArray(report.diagnostics)) fail(`${backend.name}: oxlint failed:\n${report.output}`)

    const codes = new Set(report.diagnostics.map(({ code }) => code))
    const missing = TYPE_AWARE_CODES.filter((code) => !codes.has(code))

    if (missing.length > 0) fail(`${backend.name}: type-aware rules did not fire: ${missing.join(', ')}`)

    return diagnosticsOf(report)
}

function proveBackend(directory, backend) {
    const bin = path.join(directory, 'node_modules/.bin', backend.bin)

    rmSync(bin)
    writeFileSync(bin, '#!/bin/sh\necho "backend stub reached" >&2\nexit 3\n', { mode: 0o755 })

    const report = oxlint(directory, 'jwalker.config.ts', 'type-aware.ts')

    if (Array.isArray(report.diagnostics) || !report.output.includes('backend stub reached')) {
        fail(`${backend.name}: oxlint did not run ${backend.bin} from this install`)
    }
}

function checkBackend(tarball, backend) {
    const directory = mkdtempSync(path.join(tmpdir(), `oxlint-config-jwalker-${backend.name.replaceAll(' ', '-')}-`))

    try {
        writeConsumer(directory)
        install(directory, tarball, backend)
        typeCheck(directory)
        checkPresets(directory, backend)

        const diagnostics = checkTypeAwareRules(directory, backend)

        proveBackend(directory, backend)
        console.log(
            `${backend.name} (oxlint ${backend.oxlint}): jwalker() and ${PRESETS.length} presets type-check and load, ${TYPE_AWARE_CODES.length} type-aware rules fire, and oxlint ran ${backend.bin} from this install`,
        )

        return diagnostics
    } finally {
        rmSync(directory, { recursive: true, force: true })
    }
}

function reportDifferences([first, second], [firstDiagnostics, secondDiagnostics]) {
    const onlyFirst = firstDiagnostics.filter((entry) => !secondDiagnostics.includes(entry))
    const onlySecond = secondDiagnostics.filter((entry) => !firstDiagnostics.includes(entry))

    if (onlyFirst.length === 0 && onlySecond.length === 0) {
        console.log(`${first.name} and ${second.name} report the same ${firstDiagnostics.length} diagnostics`)
        return
    }

    console.warn(`Backends differ. Only ${first.name}:\n${onlyFirst.join('\n') || '(none)'}`)
    console.warn(`Only ${second.name}:\n${onlySecond.join('\n') || '(none)'}`)
}

const packDirectory = mkdtempSync(path.join(tmpdir(), 'oxlint-config-jwalker-pack-'))

try {
    const tarball = packTarball(packDirectory)
    const results = BACKENDS.map((backend) => checkBackend(tarball, backend))

    for (const [index, backend] of BACKENDS.entries()) {
        if (index > 0) reportDifferences([BACKENDS[0], backend], [results[0], results[index]])
    }
} finally {
    rmSync(packDirectory, { recursive: true, force: true })
}
