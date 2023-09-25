import * as assert from "assert";
import * as Codegen from "../../utilities/codegen";

import {
	BlockTag,
	FunctionTag,
	GlobalModifier,
	LocalModifier,
} from "../../data/item";
// import * as myExtension from '../../extension';

suite("Codegen Test Suite", () => {
	test("func generate() function tag", () => {
		// prepare
		const tag = new FunctionTag(
			"FunctionTag",
			"function tag description",
			"https://example.com/",
			{}
		);
		const expected = `<mt:${tag.name} />`;
		// execute
		const actual = Codegen.generate(tag);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func generate() block tag", () => {
		// prepare
		const tag = new BlockTag(
			"BlockTag",
			"Block tag description",
			"https://example.com/",
			{}
		);
		const expected = `<mt:${tag.name}></mt:${tag.name}>`;
		// execute
		const actual = Codegen.generate(tag);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func withRequiredModifiers() without required modifier", () => {
		// prepare
		const notRequiredModifier = new LocalModifier(
			"notrequire",
			"not required",
			""
		);
		const tag = new BlockTag(
			"BlockTag",
			"Block tag description",
			"https://example.com/",
			{ notrequire: notRequiredModifier }
		);
		const expected = `<mt:${tag.name}></mt:${tag.name}>`;
		// execute
		const actual = Codegen.withRequiredModifiers(tag);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func withRequiredModifiers() with required modifier", () => {
		// prepare
		const requiredModifier = new LocalModifier("require", "必須です。", "");
		const tag = new BlockTag(
			"BlockTag",
			"Block tag description",
			"https://example.com/",
			{ require: requiredModifier }
		);
		const expected = `<mt:${tag.name} ${requiredModifier.name}="${requiredModifier.value}"></mt:${tag.name}>`;
		// execute
		const actual = Codegen.withRequiredModifiers(tag);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func withGlobalModifier()", () => {
		// prepare
		const globalModifier = new GlobalModifier(
			"global",
			"global modifier description",
			"http://example.com/"
		);
		const tag = new BlockTag(
			"BlockTag",
			"Block tag description",
			"https://example.com/",
			{}
		);
		const expected = `<mt:${tag.name} ${globalModifier.name}=""></mt:${tag.name}>`;
		// execute
		const actual = Codegen.withGlobalModifier(tag, globalModifier);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func globalModifier()", () => {
		// prepare
		const globalModifier = new GlobalModifier(
			"global",
			"global modifier description",
			"http://example.com/"
		);
		const expected = `${globalModifier.name}=""`;
		// execute
		const actual = Codegen.globalModifier(globalModifier);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func globalModifier() with replace", () => {
		// prepare
		const globalModifier1 = new GlobalModifier(
			"replace",
			"global modifier description",
			"http://example.com/"
		);
		const globalModifier2 = new GlobalModifier(
			"regex_replace",
			"global modifier description",
			"http://example.com/"
		);
		const expected1 = `${globalModifier1.name}="",""`;
		const expected2 = `${globalModifier2.name}="",""`;
		// execute
		const actual1 = Codegen.globalModifier(globalModifier1);
		const actual2 = Codegen.globalModifier(globalModifier2);
		// assert
		assert.strictEqual(actual1, expected1);
		assert.strictEqual(actual2, expected2);
	});

	test("func localModifier()", () => {
		// prepare
		const localModifier = new LocalModifier(
			"local",
			"local modifier description",
			"local | modifier | value"
		);
		const expected = `${localModifier.name}="${localModifier.value}"`;
		// execute
		const actual = Codegen.localModifier(localModifier);
		// assert
		assert.strictEqual(actual, expected);
	});
});
