/**
 * Create a generator from a template string.
 *
 * @param strings
 * @param keys
 */
export declare const fromTemplate: (strings: TemplateStringsArray, ...keys: any) => () => string;
