/** @import { OxlintConfig } from 'oxlint' */
import type { OxlintConfig } from 'oxlint';
/** @type {NonNullable<OxlintConfig['plugins']>} */
export declare const plugins: NonNullable<OxlintConfig['plugins']>;
export declare const RESTRICTED_GLOBALS: {
    message: string;
    name: string;
}[];
/** @type {NonNullable<OxlintConfig['rules']>} */
export declare const rules: NonNullable<OxlintConfig['rules']>;
/** @type {{ plugins: typeof plugins, rules: typeof rules }} */
declare const preset: {
    plugins: typeof plugins;
    rules: typeof rules;
};
export default preset;
