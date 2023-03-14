import { getCmsItems, TCms, tagRegex } from "./utils";
import { Tag, LocalModifier } from "./Item";
import {
	CompletionItemProvider,
	TextDocument,
	CancellationToken,
	Position,
	workspace,
	CompletionContext,
	CompletionItem,
	CompletionItemKind,
	CompletionItemTag,
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
		const TAGS_ARR = Object.values(TAGS);
		const GLOBAL_MODIFIER_ARR = Object.values(GLOBAL_MODIFIERS);

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
			return TAGS_ARR.map((tag) => {
				let label = this.makeTagCompletionItemLabel(tag);

				// "<"がすでにあるときは消す
				if (pointerText.search(/^</) > -1) {
					label = label.replace(/^</, "").replace(/>$/, "");
				}

				return new CompletionItem(
					{ label: label, detail: tag.type },
					CompletionItemKind.Class
				);
			});
		}

		const globalModifierCompletionItemArr: CompletionItem[] =
			GLOBAL_MODIFIER_ARR.map((modifier) => {
				return new CompletionItem(
					{ label: `${modifier.name}=""`, detail: modifier.type },
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
		).map((item) => {
			return new CompletionItem(
				{
					label: `${item.name}="${item.value}"`,
					detail: item.type,
				},
				CompletionItemKind.Property
			);
		});

		return globalModifierCompletionItemArr.concat(
			localModifierCompletionItemArr
		);
	}

	/**
	 * @param tag
	 * @returns
	 */
	readonly makeTagCompletionItemLabel = (tag: Tag): string => {
		const prefix = tag.name.search(/mtapp/i) < 0 ? "mt:" : "mtapp:";

		const tagName = tag.name.replace(/^mt(app)?:?/i, "");
		const completeTagName = prefix + tagName;

		// 必須モディファイアがあったら追加する
		const requiredModifierArr: LocalModifier[] = [];
		Object.values(tag.modifiers).forEach((modifier) => {
			if (modifier.description.search("必須です") > -1) {
				requiredModifierArr.push(modifier);
			}
		});
		const modifierString = requiredModifierArr
			.map((modifier): string => {
				return ` ${modifier.name}="${modifier.value}"`;
			})
			.join("");
		const blockClosingTag = tag.type === "block" ? `</${completeTagName}>` : "";

		return `<${completeTagName}${modifierString}>${blockClosingTag}`;
	};
}
