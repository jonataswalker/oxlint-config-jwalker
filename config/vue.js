/** @import { OxlintConfig } from 'oxlint' */

/** @type {NonNullable<OxlintConfig['plugins']>} */
export const plugins = ['vue']

/** @type {NonNullable<OxlintConfig['rules']>} */
export const rules = {
    'vue/no-export-in-script-setup': 'error',
    'vue/no-shared-component-data': 'error',
    'vue/require-prop-types': 'error',
    'vue/valid-define-props': 'error',
}

/** @type {{ plugins: typeof plugins, rules: typeof rules }} */
const preset = { plugins, rules }

export default preset
