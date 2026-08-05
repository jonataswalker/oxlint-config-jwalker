export const plugins = ['vue']

export const rules = {
    'vue/no-export-in-script-setup': 'error',
    'vue/no-shared-component-data': 'error',
    'vue/require-prop-types': 'error',
    'vue/valid-define-props': 'error',
}

export default { plugins, rules }
