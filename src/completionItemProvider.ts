import { getCmsItems, makeDummyItem, TCms, TItem, TModifier } from "./utils";
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
		const CMS_ITEMS = getCmsItems(CMS_NAME);
		const ITEM_ARR = Object.values(CMS_ITEMS);

		const pointerRegex = /[0-9a-zA-Z<:_]+=?/i;
		const tagRegex = /<\$?mt:?[0-9a-zA-Z:_\s=\",]+/i;

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

		const tagCompletionItemArr: CompletionItem[] = [];
		const globalModifierCompletionItemArr: CompletionItem[] = [];
		// console.log("1.2. ITEM_ARR.length" + ITEM_ARR.length);
		ITEM_ARR.forEach((item) => {
			// CMS_ITEMSからCompletionItemを作るところ
			if (item.type === "global") {
				// グローバルモディファイアのCompletionItem
				globalModifierCompletionItemArr.push(
					new CompletionItem(`${item.name}=""`, CompletionItemKind.Field)
				);
				return;
			}

			// タグのCompletionItem
			let label = this.makeTagCompletionItem(item);

			// "<"がすでにあるときは消す
			if (pointerText.search(/^</) > -1) {
				label = label.replace(/^</, "").replace(/>$/, "");
			}

			tagCompletionItemArr.push(
				new CompletionItem(label, CompletionItemKind.Class)
			);
			return;
		});

		if (!tagRange) {
			// タグの外側、タグの補完をする
			return tagCompletionItemArr;
		}

		// タグの内側、グローバルモディファイアとタグのモディファイアを補完する
		const tagText = document.getText(tagRange);
		const tagStructure = tagText.split(/\s+/);
		const tagItemId = tagStructure[0].replace(/[<:$]/g, "");
		// console.log("2.1. tagText is :" + tagText);
		// console.log("2.2. tag structure is :" + tagStructure.join(", "));

		const tagItem = CMS_ITEMS[tagItemId.toLowerCase()] || makeDummyItem();
		const localModifierCompletionItemArr: CompletionItem[] = Object.values(
			tagItem.modifiers
		).map((item) => {
			return new CompletionItem(`${item.name}="${item.value}"`);
		});

		return globalModifierCompletionItemArr.concat(
			localModifierCompletionItemArr
		);
	}

	/**
	 * @param item
	 * @returns
	 */
	private makeTagCompletionItem(item: TItem): string {
		let prefix = "mt:";
		if (item.name.search(/mtapp/i) >= 0) {
			prefix = "mtapp:";
		}

		const tagName = item.name.replace(/^mt(app)?:?/i, "");
		const completeTagName = prefix + tagName;

		// 必須モディファイアがあったら追加する
		const requiredModifierArr: TModifier[] = [];
		Object.values(item.modifiers).forEach((modifier) => {
			if (modifier.description.search("必須です") > -1) {
				requiredModifierArr.push(modifier);
			}
		});
		const modifierString = requiredModifierArr
			.map((modifier): string => {
				return `${modifier.name}="${modifier.value}"`;
			})
			.join(" ");

		let label =
			"<" +
			completeTagName +
			(modifierString === "" ? "" : " " + modifierString);
		// ブロックタグなら閉じタグを追加
		if (item.type === "block") {
			label += `></${completeTagName}`;
		}
		return label + ">";
	}
}
