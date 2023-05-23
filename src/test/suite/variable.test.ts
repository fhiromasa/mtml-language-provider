import * as Variable from "../../utilities/variable";

import * as assert from "assert";
import { readFileSync } from "fs";
import * as path from "path";

suite("variable Test Suite", () => {
	test("collectVariables", () => {
		// prepare
		const testfile = path.resolve(
			__dirname,
			"../../../",
			"testfiles/variable.data.mtml"
		);
		const document = readFileSync(testfile, "utf-8");

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
			].join()
		);
	});
});
