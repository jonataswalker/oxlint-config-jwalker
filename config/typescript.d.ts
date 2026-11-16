import type { OxlintConfig, OxlintOverride } from 'oxlint';
/** @import { OxlintConfig, OxlintOverride } from 'oxlint' */
/** @type {NonNullable<OxlintConfig['plugins']>} */
export declare const plugins: NonNullable<OxlintConfig['plugins']>;
/** @type {NonNullable<OxlintConfig['rules']>} */
export declare const rules: NonNullable<OxlintConfig['rules']>;
/** @type {OxlintOverride[]} */
export declare const overrides: OxlintOverride[];
/** @type {{ overrides: typeof overrides, plugins: typeof plugins, rules: typeof rules }} */
declare const preset: {
    overrides: typeof overrides;
    plugins: typeof plugins;
    rules: typeof rules;
};
export default preset;
