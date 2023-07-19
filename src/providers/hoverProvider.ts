import { tagRegex, modifierRegex, Data, Setting, Markdown } from "../utils";
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
		const tagRange = document.getWordRangeAtPosition(position, tagRegex);
		if (!tagRange) {
			return undefined;
		}
		const cms = Setting.CMS.getName();
		const modifierRange = document.getWordRangeAtPosition(
			position,
			modifierRegex
		);

		const tagText = document.getText(tagRange);
		const modifierText = document.getText(modifierRange);
		// console.log("1.1. tag text is   :" + tagText);
		// console.log("1.2. modifier text is   :" + modifierText);

		const tagStructure = tagText.split(/\s+/);
		// console.log("1.3. tag structure is :" + tagStructure.join(", "));

		const tagItemId = tagStructure[0].replace(/[<:$]/g, "");
		// console.log("1.4. tag item id is :" + tagItemId);
		const tagItem = Data.getTagById(tagItemId, cms);
		// console.log("1.5. tagItem is :", tagItem.name);

		const modifierItem = Data.getGlobalModifierById(
			modifierText.replace(/(:\w+)?=$/, ""),
			cms
		);

		return new Hover([
			new MarkdownString(Markdown.globalModifierHover(tagItem, modifierItem)),
			new MarkdownString(Markdown.tagHover(tagItem)),
		]);
	}
}
