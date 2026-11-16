import { defineConfig, type OxlintConfig } from 'oxlint'
import { jwalker } from 'oxlint-config-jwalker'

const config: OxlintConfig = defineConfig({
    ...jwalker({ ignores: ['dist/**'] }),
})

export default config
