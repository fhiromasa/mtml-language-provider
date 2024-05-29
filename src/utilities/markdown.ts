import { Tag, GlobalModifier, TLocalModifiers } from "../data/item";
import * as Codegen from "./codegen";

// ホバー、補完が使うはず。
// vscode.MarkdownStringにわたす文字列を作るモジュール

/**
 * Tagを受け取ってmarkdown形式の文字列を返します。
 *
 * ex)
 * ```
 * .```
 * <mt:TagName>
 * .```
 *
 * description
 *
 * [リンク](https)
 *
 * モディファイア
 * - key
 *   - description
 * ```
 */
export function tagHover(tag: Tag): string {
	const str = [
		codeblock(Codegen.generate(tag)),
		description(tag),
		anchor(tag),
		localModifiersList(tag.modifiers),
	].join("\n");
	// console.log(str);
	return str;
}

/**
 * TagとGlobalModifierを受け取ってmarkdown形式の文字列を返します。
 * GlobalModifierがundefinedだった場合空文字列を返します。
 *
 * ex)
 * ```
 * .```
 * <mt:TagName global="">
 * .```
 *
 * description
 *
 * [リンク](https)
 * ```
 */
export function globalModifierHover(
	tag: Tag,
	mod: GlobalModifier | undefined
): string {
	if (!mod) {
		return "";
	}
	return [
		codeblock(Codegen.withGlobalModifier(tag, mod)),
		description(mod),
		anchor(mod),
	].join("\n");
}

/**
 * 引数のコード(string)を```で括って返す
 */
export function codeblock(code: string): string {
	return "```\n" + code + "\n```\n";
}

/**
 * ディスクリプションの最後に改行を追加して返す。
 */
export function description(item: Tag | GlobalModifier): string {
	return item.description + "\n";
}

/**
 * リンクの名前とurlをとって markdown のアンカーリンクを返す。
 *
 * ex)
 * ```
 * [名前](url)
 * ```
 */
export function anchor(item: Tag | GlobalModifier): string {
	if (item.url === "") {
		return "";
	}
	return `[${item.name}](${item.url})\n`;
}

/**
 * マークダウン形式のリストとして返す
 * modifiers が 0 個だったら空文字列を返す
 *
 * ex)
 * ```markdown
 * モディファイア
 * - key
 *   - description
 * - key
 *   - description
 * ```
 */
export function localModifiersList(modifiers: TLocalModifiers): string {
	const modifierArr = Object.values(modifiers);
	if (modifierArr.length < 1) {
		return "";
	}
	const modifierStringArr = modifierArr.map((modifier) => {
		return [
			`- ${modifier.name}`,
			`  - ${modifier.description || "no description"}`,
		].join("\n");
	});
	return "モディファイア\n\n" + modifierStringArr.join("\n");
}
