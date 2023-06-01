import { GlobalModifier, Tag } from "../data/item";
import { tagRegex, modifierRegex, Data, Codegen, Setting } from "../utils";
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

		const tagMS = this.makeMSByTag(tagItem);
		const modifierMS = this.makeMSGlobalModifier(tagItem, modifierItem);

		return new Hover([modifierMS, tagMS]);
	}

	/**
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
	public makeMSByTag(tag: Tag): MarkdownString {
		const ms = new MarkdownString();
		ms.appendCodeblock(Codegen.generate(tag));
		ms.appendText(tag.description + "\n");
		if (tag.url !== "") {
			ms.appendMarkdown(
				`[${tag.name}](${tag.url}) link to ${Setting.CMS.getName()}\n`
			);
		}
		if (Object.values(tag.modifiers).length > 0) {
			ms.appendText("\nモディファイア\n");
			ms.appendMarkdown(Codegen.localModifiersToMarkdownList(tag.modifiers));
		}
		return ms;
	}

	/**
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
	public makeMSGlobalModifier(
		tag: Tag,
		modifier: GlobalModifier | undefined
	): MarkdownString {
		const ms = new MarkdownString();
		if (!modifier) {
			return ms;
		}
		ms.appendCodeblock(Codegen.withGlobalModifier(tag, modifier));
		ms.appendText(modifier.description + "\n");
		ms.appendMarkdown(
			`[${modifier.name}](${modifier.url}) link to ${Setting.CMS.getName()}`
		);

		return ms;
	}
}
