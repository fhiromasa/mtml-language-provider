import { tagRegex } from "./utils";
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
	Range,
} from "vscode";

export default class MTMLDefinitionProvider implements DefinitionProvider {
	public provideDefinition(
		document: TextDocument,
		position: Position,
		token: CancellationToken
	): ProviderResult<Definition | LocationLink[]> {
		const workDir = workspace.workspaceFolders || [];
		const workDirPath = workDir[0].uri.path; //vscodeで開いているディレクトリのフルパス

		// F12を押した時のカーソル位置にmtタグがあるか確認
		const pointerRange = document.getWordRangeAtPosition(position, tagRegex);
		if (!pointerRange) {
			return;
		}

		const pointerText = document.getText(pointerRange);
		const tagStructure = pointerText.split(/\s+/);
		// console.log("1.1. pointer text is :" + pointerText);
		// console.log("1.2. tag structure is :" + tagStructure.join(", "));

		// tagStructureから"name" or "var" のローカルモディファイアを探す
		// これらモディファイアの値を定義の名前として使う
		let definitionName = "";
		tagStructure.forEach((structure) => {
			if (structure.search(/(name|(set)?var)=/i) > -1) {
				// console.log(`2.1. var,name modifier: ${structure}`);
				definitionName = structure
					.split("=")[1]
					.replace(/"/g, "")
					.replace(/\{[_\w\d\$]*\}/i, "")
					.replace(/\[[_\w\d\$]*\]/i, "");
			}
		});
		// name,varモディファイアがなければ終わり
		if (definitionName === "") {
			// console.log(`2.1. no definition`);
			return;
		}
		// console.log(`1.3. definitionName: ${definitionName}`);

		// documentの全行からname,var モディファイアの値がdefinitionNameと一致するものを探す
		// FIX: 各行1個づつの定義しか見つけられない。
		const definitionRegex = new RegExp(
			[
				`((name|(set)?var)="${definitionName})`, // 基本形
				`({[_\\$\\d\\w]+})?`, // ハッシュのkey指定
				`(\\[\\d+\\])?"`, // 配列のindex指定
			].join(""),
			"i"
		);
		const definitionRangeArr: Range[] = [];
		for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
			const lineText = document.lineAt(lineNum).text;

			const charStartNum = lineText.search(definitionRegex);
			const matchedWord = lineText.match(definitionRegex);
			if (charStartNum > -1 && matchedWord) {
				definitionRangeArr.push(
					new Range(
						new Position(lineNum, charStartNum),
						new Position(lineNum, charStartNum + matchedWord[0].length)
					)
				);
			}
		}

		return definitionRangeArr.map((range): LocationLink => {
			return {
				targetUri: Uri.file(document.fileName),
				targetRange: range,
			};
		});
	}
}
