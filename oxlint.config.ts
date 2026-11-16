import { defineConfig } from 'oxlint'

import { jwalker } from './config/index.js'

const config = jwalker({ ignores: ['**/*.d.ts', 'lint/**', 'test/consumer/**'] })

export default defineConfig({
    ...config,
    overrides: [
        ...(config.overrides ?? []),
        {
            files: ['scripts/**/*.mjs'],
            rules: {
                'no-console': 'off',
            },
        },
    ],
})
