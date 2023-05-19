import { Tag } from "../data/item";
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

export class MTMLCompletionItemProvider implements CompletionItemProvider {
	public provideCompletionItems(
		document: TextDocument,
		position: Position,
		token: CancellationToken,
		context: CompletionContext
	): CompletionItem[] | undefined {
		// 設定を使うのならここで読んで設定処理
		const [TAGS, GLOBAL_MODIFIERS] = Data.getCmsItems();

		const pointerRegex = /[0-9a-zA-Z<:_]+=?/i;

		const pointerRange = document.getWordRangeAtPosition(
			position,
			pointerRegex
		);
		const tagRange = document.getWordRangeAtPosition(position, tagRegex);

		if (!pointerRange) {
			// 早期リターン、記号等のmtとは無関係な物をタイプしたとき
			// console.log("早期リターン");
			return;
		}

		const pointerText = document.getText(pointerRange);
		// console.log("1.1. pointerText: " + pointerText);

		if (!tagRange) {
			// タグの外側、タグの補完をする
			return Object.values(TAGS).map((tag) => {
				return new CompletionItem(
					{
						label: CodeBlock.withRequiredModifiers(tag),
						detail: tag.type,
					},
					CompletionItemKind.Class
				);
			});
		}

		const globalModifierCompletionItemArr: CompletionItem[] = Object.values(
			GLOBAL_MODIFIERS
		).map((modifier) => {
			return new CompletionItem(
				{
					label: CodeBlock.globalModifier(modifier),
					detail: modifier.type,
				},
				CompletionItemKind.Field
			);
		});

		// タグの内側、グローバルモディファイアとタグのモディファイアを補完する
		const tagText = document.getText(tagRange);
		const tagStructure = tagText.split(/\s+/);
		const tagItemId = tagStructure[0].replace(/[<:$]/g, "");
		// console.log("2.1. tagText is :" + tagText);
		// console.log("2.2. tag structure is :" + tagStructure.join(", "));

		const tagItem =
			TAGS[tagItemId.toLowerCase()] || new Tag("", "undefined", "", "", {});
		const localModifierCompletionItemArr: CompletionItem[] = Object.values(
			tagItem.modifiers
		).map((modifier) => {
			return new CompletionItem(
				{
					label: CodeBlock.localModifier(modifier),
					detail: modifier.type,
				},
				CompletionItemKind.Property
			);
		});

		return globalModifierCompletionItemArr.concat(
			localModifierCompletionItemArr
		);
	}
}

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
	): CompletionItem[] {
		throw new Error("Method not implemented.");
	}
}
