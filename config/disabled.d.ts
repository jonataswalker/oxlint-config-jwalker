/** @import { OxlintConfig } from 'oxlint' */
import type { OxlintConfig } from 'oxlint';
/** @type {NonNullable<OxlintConfig['rules']>} */
export declare const rules: NonNullable<OxlintConfig['rules']>;
/** @type {{ rules: typeof rules }} */
declare const preset: {
    rules: typeof rules;
};
export default preset;
