import { getCmsItems, TCms, tagRegex } from "./utils";
import { Tag } from "./data/item";
import * as CodeBlock from "./codeBlock";
import {
	DefinitionProvider,
	TextDocument,
	CancellationToken,
	Position,
	workspace,
	Definition,
	LocationLink,
	ProviderResult,
	Uri,
} from "vscode";

export default class MTMLDefinitionProvider implements DefinitionProvider {
	public provideDefinition(
		document: TextDocument,
		position: Position,
		token: CancellationToken
	): ProviderResult<Definition | LocationLink[]> {
		// 設定を使うのならここで読んで設定処理
		const CMS_NAME = workspace
			.getConfiguration("mtml")
			.get<TCms>("cms.name", "Movable Type");
		const [TAGS, GLOBAL_MODIFIERS] = getCmsItems(CMS_NAME);
		const workDir = workspace.workspaceFolders || [];

		const cursorRange = document.getWordRangeAtPosition(position, tagRegex);
		if (!cursorRange) {
			return;
		}
		const text = document.getText(cursorRange);
		console.log(text);
		// mtタグの中で何かしらの要素にホバーしている状況
		const cursorText = document.getText(cursorRange);
		const tagStructure = cursorText.split(/\s+/);
		// console.log("1.1. hover text is :" + hoverText);
		// console.log("1.2. tag text is   :" + tagText);
		// console.log("1.3. tag structure is :" + tagStructure.join(", "));

		const tagItemId = tagStructure[0].replace(/[<:$]/g, "");
		// console.log("1.4. tag item id is :" + tagItemId);
		console.log(workDir[0].uri.path);
		console.log(document.fileName);

		const link: LocationLink[] = [
			{ targetUri: Uri.file(document.fileName), targetRange: cursorRange },
		];

		return link;
	}
}
