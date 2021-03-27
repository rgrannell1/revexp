import * as jsonPkg from './json/spec.js';
import builderPkg from './core/builder.js';
import { diff, evolve, shrink, firehose } from './tools/index.js';
export const tools = {
    diff,
    evolve,
    shrink,
    firehose
};
export const jsonSpec = jsonPkg;
export const builder = builderPkg;
import { oneOf, notOneOf, range } from './core/character-classes.js';
import { any, digit, nonZeroDigit, space, literal, nonLineBreak, regexp } from './core/characters.js';
import { and, or } from './core/logic.js';
import { repeat, optional } from './core/quantifiers.js';
import { fromTemplate } from './core/template.js';
export const parts = {
    oneOf,
    notOneOf,
    range,
    any,
    digit,
    nonZeroDigit,
    space,
    literal,
    nonLineBreak,
    regexp,
    and,
    or,
    repeat,
    optional,
    fromTemplate
};
