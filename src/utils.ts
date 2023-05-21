export * as Config from "./utilities/config";
export * as CodeBlock from "./utilities/codeBlock";
export * as Data from "./utilities/data";

// 正規表現だと改行を取れないらしい
export const tagRegex = /<\$?mt(app)?:?[^>]+/i;
export const modifierRegex =
	/[a-zA-Z0-9_]+(:[a-zA-Z0-9_]+)?=("[^"]*")?(,"[^"]*")?/i;
