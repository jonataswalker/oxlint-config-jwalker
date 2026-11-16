# oxlint-config-jwalker

Shareable [oxlint](https://oxc.rs) config — native rules only, no JavaScript plugin bridge.

## Install

```sh
npm i -D oxlint-config-jwalker oxlint oxlint-tsgolint
```

The type-aware rules need one backend, and both are optional peers:

| Backend                            | Install           | oxlint   |
| ---------------------------------- | ----------------- | -------- |
| tsgolint                           | `oxlint-tsgolint` | >=1.77.0 |
| tsrs-lint (oxc's Rust port of tsc) | `tsrs`            | >=1.92.0 |

When `tsrs` is installed, oxlint runs `tsrs-lint` and ignores `oxlint-tsgolint`.
tsrs has no stable release yet: the peer range starts at `7.1.0-beta.tsrs2`, so
`npm i -D tsrs` resolves to a tested version, while the older `0.x` builds that
npm's `latest` tag still points at are rejected.

The default `jwalker()` sets `options.typeAware: true`. If you install neither
backend, compose with `typeAware: false`, or oxlint exits with
`Failed to find type-aware linter executable`.

## Usage

Package imports only resolve in a TypeScript config, so this config is consumed from
`oxlint.config.ts` rather than `.oxlintrc.json`:

```typescript
import { defineConfig } from 'oxlint'
import { jwalker } from 'oxlint-config-jwalker'

export default defineConfig(jwalker())
```

`jwalker()` returns one complete config object. Options:

| Option       | Default | Effect                                                      |
| ------------ | ------- | ----------------------------------------------------------- |
| `node`       | `true`  | Node plugin plus the `node:`-prefix restricted globals       |
| `typescript` | `true`  | TypeScript plugin and the type-aware overrides               |
| `typeAware`  | `true`  | Sets `options.typeAware`; forced off when `typescript` is off |
| `vue`        | `false` | Vue plugin — script blocks only, oxlint never reads templates |
| `ignores`    | `[]`    | Appended after the shared excludes                           |

```typescript
export default defineConfig(jwalker({ vue: true, ignores: ['**/generated'] }))
```

To override, spread and edit — `jwalker()` is a plain object:

```typescript
const base = jwalker()

export default defineConfig({
    ...base,
    rules: { ...base.rules, 'no-console': 'off' },
})
```

The individual fragments (`base`, `node`, `typescript`, `vue`, `disabled`) are also
exported for `extends`, typed with oxlint's own config types:

```typescript
import { defineConfig } from 'oxlint'
import { base, typescript } from 'oxlint-config-jwalker'

export default defineConfig({ extends: [base, typescript] })
```

Note that oxlint's `extends` merges only `rules`, `plugins`
and `overrides` — `categories`, `env`, `options` and `ignorePatterns` must be set at
the top level, which is exactly what `jwalker()` does for you.

## What this config is

Every rule here runs natively in oxlint's Rust core. There is no `jsPlugins` bridge,
so there are no ESLint plugin dependencies and no per-file JavaScript execution.

Categories are set to `correctness`, `suspicious` and `perf` as errors, with
`pedantic`, `restriction`, `style` and `nursery` off. Taste rules are then listed
explicitly, so upgrading oxlint adds new correctness coverage without silently
introducing new stylistic opinions.

### Type-aware linting costs a flat ~0.3s, even on JavaScript

`typeAware: true` makes oxlint spawn tsgolint and build a TypeScript program for the
run. The `**/*.{js,cjs,mjs}` override in the `typescript` fragment turns every
type-aware rule off for JavaScript, but that suppresses the *diagnostics*, not the
*work* — the program is still built.

Measured on 300 generated files, oxlint 1.80:

| Tree            | `typeAware: true` | `typeAware: false` |
| --------------- | ----------------- | ------------------ |
| 300 `.js` files | 0.38s / 0.44s     | 0.11s / 0.13s      |
| 300 `.ts` files | 1.04s             | 0.27s              |

So on a JavaScript-only repo the default is ~3x slower for zero extra coverage.
Compose with `jwalker({ typeAware: false })` there. On TypeScript the cost is real
work and worth paying.

**Formatting is not this config's job.** The `style` category is off; use
[oxfmt](https://oxc.rs/docs/guide/usage/formatter) and enable its `sortImports`
option, which is modelled on `perfectionist/sort-imports`.

## Relationship to eslint-config-jwalker

This is not a port. [eslint-config-jwalker](https://github.com/jonataswalker/eslint-config-jwalker)
leans on plugins with no native oxlint equivalent — sonarjs, perfectionist, es-x,
array-func, security — and on `jsonc`/prettier passes for JSON, CSS and HTML that
oxlint does not cover at all. Run both if you want that coverage: oxlint for the fast
pass, ESLint for the remainder.

## License

MIT
