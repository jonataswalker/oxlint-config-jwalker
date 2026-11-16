import type { OxlintConfig } from 'oxlint';
/** @import { OxlintConfig } from 'oxlint' */
/** @type {NonNullable<OxlintConfig['plugins']>} */
export declare const plugins: NonNullable<OxlintConfig['plugins']>;
/** @type {NonNullable<OxlintConfig['rules']>} */
export declare const rules: NonNullable<OxlintConfig['rules']>;
/** @type {{ plugins: typeof plugins, rules: typeof rules }} */
declare const preset: {
    plugins: typeof plugins;
    rules: typeof rules;
};
export default preset;
