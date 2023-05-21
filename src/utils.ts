export * as Config from "./utilities/config";
export * as CodeBlock from "./utilities/codeBlock";
export * as Data from "./utilities/data";
export * as Variable from "./utilities/variable";

// 正規表現だと改行を取れないらしい
export const tagRegex = new RegExp(/<\$?mt(app)?:?[^>]+/i);
export const modifierRegex = new RegExp(
	/[a-zA-Z0-9_]+(:[a-zA-Z0-9_]+)?=("[^"]*")?(,"[^"]*")?/i
);
