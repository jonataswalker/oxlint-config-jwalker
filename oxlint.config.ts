import { defineConfig } from 'oxlint'

import { jwalker } from './config/index.js'

export default defineConfig({
    ...jwalker({ ignores: ['**/*.d.ts', 'lint/**'] }),
})
