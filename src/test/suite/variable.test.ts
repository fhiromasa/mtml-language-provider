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
				"setvarsname1",
				"setvarsname2",
				"setvarsname3",
				"setvarsname4",
				"setvar_modifier",
				"varname",
				"setvarname",
				"getvarname",
				"setvarblockname",
				"setvartemplatename",
				"vararr",
				"sethashvarname",
				"sethashvarname2",
				"hashkey",
				"arrindex",
			].join()
		);
	});
});
