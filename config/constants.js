export const GLOB_SRC_EXT = '{js,cjs,mjs,jsx,ts,cts,mts,tsx}'

export const GLOB_SRC = `**/*.${GLOB_SRC_EXT}`

export const GLOB_JS = '**/*.{js,cjs,mjs}'

export const GLOB_JSX = '**/*.jsx'

export const GLOB_TS = '**/*.{ts,cts,mts}'

export const GLOB_TSX = '**/*.tsx'

export const GLOB_DTS = '**/*.d.{ts,cts,mts}'

export const GLOB_VUE = '**/*.vue'

export const GLOB_TESTS = [
    `**/__tests__/**/*.${GLOB_SRC_EXT}`,
    `**/*.spec.${GLOB_SRC_EXT}`,
    `**/*.test.${GLOB_SRC_EXT}`,
    `**/*.bench.${GLOB_SRC_EXT}`,
    `**/*.benchmark.${GLOB_SRC_EXT}`,
]

export const GLOB_EXCLUDE = [
    '**/node_modules',
    '**/dist',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/bun.lockb',

    '**/output',
    '**/coverage',
    '**/temp',
    '**/.temp',
    '**/tmp',
    '**/.tmp',
    '**/.history',
    '**/.vscode',
    '**/.vitepress/cache',
    '**/.nuxt',
    '**/.next',
    '**/.vercel',
    '**/.changeset',
    '**/.idea',
    '**/.cache',
    '**/.output',
    '**/.vite-inspect',

    '**/CHANGELOG*.md',
    '**/*.min.*',
    '**/LICENSE*',
    '**/__snapshots__',
    '**/auto-import.d.ts',
    '**/auto-imports.d.ts',
    '**/components.d.ts',
]
