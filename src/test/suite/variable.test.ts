import * as assert from "node:assert";
import { readFileSync } from "node:fs";
import * as path from "node:path";
import * as Variable from "../../utilities/variable";

suite("variable Test Suite", () => {
	test("collectVariables", () => {
		// prepare
		const filepath = path.resolve(
			__dirname,
			"../../../",
			"testfiles/variable.data.mtml",
		);
		const document = readFileSync(filepath, "utf-8");

		// execute
		const actual = Variable.collectVariables(document);

		// assert
		assert.strictEqual(
			actual.join(),
			[
				"setVarsName1",
				"setVarsName2",
				"setVarsName3",
				"setVarsName4",
				"varName",
				"setVarName",
				"getVarName",
				"setVarBlockName",
				"setVarTemplateName",
				"varArr",
				"SetHashVarName",
				"SetHashVarName2",
				"setVar_modifier",
				"hashKey",
				"arrIndex",
			].join(),
		);
	});
});
