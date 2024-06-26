export * as Setting from "./utilities/setting";
export * as Codegen from "./utilities/codegen";
export * as Data from "./utilities/data";
export * as Variable from "./utilities/variable";
export * as Markdown from "./utilities/markdown";

// 正規表現だと改行を取れないらしい
export const tagRegex = new RegExp(/<\$?mt(app)?:?[^>]+/i);
export const tagNameRegex = new RegExp(/<\$?mt(app)?:?[^\s]+/i);
export const modifierRegex = new RegExp(
	/[a-zA-Z0-9_]+(:[a-zA-Z0-9_]+)?=("[^"]*")?(,"[^"]*")?/i
);
