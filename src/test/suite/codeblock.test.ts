import * as assert from "assert";
import * as Codeblock from "../../utilities/codeblock";

import {
	BlockTag,
	FunctionTag,
	GlobalModifier,
	LocalModifier,
	TLocalModifiers,
} from "../../data/item";
// import * as myExtension from '../../extension';

suite("codeBlock Test Suite", () => {
	test("func codeBlock() function tag", () => {
		// prepare
		const tag = new FunctionTag(
			"FunctionTag",
			"function tag description",
			"https://example.com/",
			{}
		);
		const expected = `<mt:${tag.name}>`;
		// execute
		const actual = Codeblock.codeblock(tag);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func codeBlock() block tag", () => {
		// prepare
		const tag = new BlockTag(
			"BlockTag",
			"Block tag description",
			"https://example.com/",
			{}
		);
		const expected = `<mt:${tag.name}></mt:${tag.name}>`;
		// execute
		const actual = Codeblock.codeblock(tag);
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
		const actual = Codeblock.withRequiredModifiers(tag);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("func withRequiredModifiers() with required modifier", () => {
		// prepare
		const requierdModifier = new LocalModifier("require", "必須です。", "");
		const tag = new BlockTag(
			"BlockTag",
			"Block tag description",
			"https://example.com/",
			{ require: requierdModifier }
		);
		const expected = `<mt:${tag.name} ${requierdModifier.name}="${requierdModifier.value}"></mt:${tag.name}>`;
		// execute
		const actual = Codeblock.withRequiredModifiers(tag);
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
		const actual = Codeblock.withGlobalModifier(tag, globalModifier);
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
		const actual = Codeblock.globalModifier(globalModifier);
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
		const actual1 = Codeblock.globalModifier(globalModifier1);
		const actual2 = Codeblock.globalModifier(globalModifier2);
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
		const actual = Codeblock.localModifier(localModifier);
		// assert
		assert.strictEqual(actual, expected);
	});

	test("test localModifiersToMarkdownList()", () => {
		// prepare
		const modifiers: TLocalModifiers = {
			one: new LocalModifier("one", "one description", "one | val"),
			two: new LocalModifier("two", "two description", "two | val"),
			three: new LocalModifier("three", "three description", "three | val"),
			four: new LocalModifier("four", "four description", "four | val"),
		};
		const expected = [
			`- ${modifiers.one.name}`,
			`  - ${modifiers.one.description}`,
			`- ${modifiers.two.name}`,
			`  - ${modifiers.two.description}`,
			`- ${modifiers.three.name}`,
			`  - ${modifiers.three.description}`,
			`- ${modifiers.four.name}`,
			`  - ${modifiers.four.description}`,
		].join("\n");
		// execute
		const actual = Codeblock.localModifiersToMarkdownList(modifiers);
		// assert
		assert.strictEqual(actual, expected);
	});
});
