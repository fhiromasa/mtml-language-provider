import { tagRegex, tagNameRegex, Data, Setting, Markdown } from "../utils";
import {
	HoverProvider,
	Hover,
	TextDocument,
	CancellationToken,
	Position,
	MarkdownString,
} from "vscode";

export default class MTMLHoverProvider implements HoverProvider {
	public provideHover(
		document: TextDocument,
		position: Position,
		token: CancellationToken
	): Hover | undefined {
		const hoverText = document.getText(
			document.getWordRangeAtPosition(position)
		);
		console.log(`1.1. hover text : ${hoverText}`);
		const tagRange = document.getWordRangeAtPosition(position, tagRegex);
		if (!tagRange) {
			return undefined;
		}
		const cms = Setting.CMS.getName();
		const tagNameRange = document.getWordRangeAtPosition(
			position,
			tagNameRegex
		);

		// タグ全体テキスト
		const tagText = document.getText(tagRange);
		const tagStructure = tagText.split(/\s+/);
		console.log("1.3. tag structure is :" + tagStructure.join(", "));

		const tagItemId = tagStructure[0].replace(/[<:$]/g, "");
		// console.log("1.4. tag item id is :" + tagItemId);

		const tagItem = Data.getTagById(tagItemId, cms);
		console.log("1.5. tagItem is :", tagItem.name);

		// タグの名前にカーソルがあるかどうか、あればタグの情報を返す
		if (tagNameRange) {
			return new Hover(new MarkdownString(Markdown.tagHover(tagItem)));
		}

		// モディファイアの名前かもしれないテキスト
		const modifierName = hoverText;
		const modifierItem = Data.getGlobalModifierById(modifierName, cms);

		// グローバルモディファイアにカーソルがあるかどうか
		if (modifierItem) {
			return new Hover(
				new MarkdownString(Markdown.globalModifierHover(tagItem, modifierItem))
			);
		}

		return undefined;
	}
}
