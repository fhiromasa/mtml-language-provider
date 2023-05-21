const variableRegex = new RegExp(/(name|(set)?var)=("[^"]*")/g);
const setvarsRegex = new RegExp(
	/<mt:?SetVars>([\n\s\t\w\d=]*)<\/mt:?SetVars>/gi
);

/**
 * 与えられた文字列から変数を探し出して、変数名を配列にして返す
 */
export function collectVariables(document: string): string[] {
	const variableNames: string[] = [];

	// 通常の変数宣言を探す
	for (const matches of document.matchAll(variableRegex)) {
		// console.log(matches);
		const varNames = matches[3].replace(/"/g, "");

		// 同じ変数名は返さなくていい
		// $__key__ みたいな $ が含まれるものは返さなくていい
		// hash{key}, array[index] みたいな添字付きのハッシュ、配列は返さなくていい
		if (
			!variableNames.includes(varNames) &&
			varNames.match(/[\$\[\{]/) === null
		) {
			variableNames.push(varNames);
		}
	}
	// console.log(variableNames);

	// MTSetVars の変数宣言を探す
	for (const setvarsMatches of document.matchAll(setvarsRegex)) {
		console.log(setvarsMatches);
		const declarations = setvarsMatches[1].split(/\n/);

		declarations.forEach((declaration) => {
			const varName = declaration.replace(/\s*/, "").split(/=/)[0];

			// 同じ変数名は返さなくていい
			if (!variableNames.includes(varName)) {
				variableNames.push(varName);
			}
		});
	}

	return variableNames;
}
