import { getCmsItems, TCms, tagRegex } from "./utils";
import { Tag } from "./item";
import * as CodeBlock from "./codeBlock";
import {
	CompletionItemProvider,
	TextDocument,
	CancellationToken,
	Position,
	workspace,
	CompletionContext,
	CompletionItem,
	CompletionItemKind,
} from "vscode";

export default class MTMLCompletionItemProvider
	implements CompletionItemProvider
{
	public provideCompletionItems(
		document: TextDocument,
		position: Position,
		token: CancellationToken,
		context: CompletionContext
	): CompletionItem[] | undefined {
		// 設定を使うのならここで読んで設定処理
		const CMS_NAME = workspace
			.getConfiguration("mtml")
			.get<TCms>("cms.name", "Movable Type");
		const [TAGS, GLOBAL_MODIFIERS] = getCmsItems(CMS_NAME);

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
