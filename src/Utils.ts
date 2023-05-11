export * as Config from "./utils/config";
export * as CodeBlock from "./utils/codeBlock";
export * as Data from "./utils/data";

// 正規表現だと改行を取れないらしい
export const tagRegex = /<\$?mt(app)?:?[^>]+/i;
export const modifierRegex = /[a-zA-Z0-9]+(:[a-zA-Z0-9]+)?=/i;
