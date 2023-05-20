import { Data, tagRegex, CodeBlock, modifierRegex } from "../utils";
import {
	CompletionItemProvider,
	TextDocument,
	CancellationToken,
	Position,
	CompletionContext,
	CompletionItem,
	CompletionItemKind,
} from "vscode";

/**
 * 何もないところでタグの基本形を補完する。
 * 必須モディファイアを付属させる。
 */
export class TagCompletion implements CompletionItemProvider {
	provideCompletionItems(
		document: TextDocument,
		position: Position,
		token: CancellationToken,
		context: CompletionContext
	): CompletionItem[] | undefined {
		const tagRange = document.getWordRangeAtPosition(position, tagRegex);
		if (tagRange) {
			return;
		}
		const tagArr = Object.values(Data.getTagItems());
		const completionItemArr = tagArr.map((tag) => {
			return new CompletionItem(
				{
					label: CodeBlock.withRequiredModifiers(tag),
					detail: tag.type,
				},
				CompletionItemKind.Class
			);
		});
		return completionItemArr;
	}
}

/**
 * タグのモディファイアとグローバルモディファイアのIDを補完する。
 * タグの内部で働く。
 */
export class ModifierCompletion implements CompletionItemProvider {
	provideCompletionItems(
		document: TextDocument,
		position: Position,
		token: CancellationToken,
		context: CompletionContext
	): CompletionItem[] | undefined {
		const tagRange = document.getWordRangeAtPosition(position, tagRegex);
		if (!tagRange) {
			// タグの外側
			return;
		}
		const tagText = document.getText(tagRange);
		// console.log(modifierRegex.exec(tagText));
		// if () {
		// 	// TODO: modifierのうちがわを検出して補完しないようにする
		// 	// console.log("inner modifier");
		// 	return;
		// }
		const tagStructure = tagText.split(/\s+/);
		const tagId = tagStructure[0].replace(/[<:$]/g, "");
		// console.log(`1.2 tag id: ${tagId}`);
		const tag = Data.getTagById(tagId);
		const lModArr = Object.values(tag.modifiers);
		const lModItemArr = lModArr.map((mod) => {
			return new CompletionItem(
				{
					label: CodeBlock.localModifier(mod),
					detail: mod.type,
				},
				CompletionItemKind.Property
			);
		});

		const gModArr = Object.values(Data.getGlobalModifierItems());
		const gModItemArr = gModArr.map((mod) => {
			return new CompletionItem(
				{
					label: CodeBlock.globalModifier(mod),
					detail: mod.type,
				},
				CompletionItemKind.Field
			);
		});

		return [...lModItemArr, ...gModItemArr];
	}
}

/**
 * モディファイアIDの後ろで "=" を打ったときにモディファイアがとりうる値を補完する
 */
export class ModifierValueCompletion implements CompletionItemProvider {
	provideCompletionItems(
		document: TextDocument,
		position: Position,
		token: CancellationToken,
		context: CompletionContext
	): CompletionItem[] | undefined {
		const tagRange = document.getWordRangeAtPosition(position, tagRegex);
		const modRange = document.getWordRangeAtPosition(position, modifierRegex);
		if (!tagRange) {
			// タグの外側
			return;
		}
		const tagText = document.getText(tagRange);
		const tagStructure = tagText.split(/\s+/);
		const tagId = tagStructure[0].replace(/[<:$]/g, "");
		// console.log(`1.2 tag id: ${tagId}`);

		const modText = document.getText(modRange);
		const modStructure = modText.split(/[=:]/);
		const modId = modStructure[0];
		// console.log(`1.3 mod id: ${modId}`);

		const tag = Data.getTagById(tagId);
		const lMod = tag.modifiers[modId];
		if (!lMod) {
			// console.log("モディファイアなし");
			return;
		}

		const values = lMod.value.replace(/\s/g, "").split("|");
		// console.log(`1.4 values: ${values}`);

		return values.map((val) => {
			return new CompletionItem(`"${val}"`, CompletionItemKind.EnumMember);
		});
	}
}
