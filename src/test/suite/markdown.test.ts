import * as assert from "assert";
import * as Markdown from "../../utilities/markdown";
import {
	GlobalModifier,
	LocalModifier,
	TLocalModifiers,
	Tag,
} from "../../data/item";

suite("Markdown test suite", () => {
	test("globalModifierHover test, passed undefined", () => {
		// prepare
		const item = new Tag("TagName", "block", "", "", {});
		const expected = "";

		// execute
		const actual = Markdown.globalModifierHover(item, undefined);

		// assert
		assert.equal(actual, expected);
	});

	test("codeblock test", () => {
		// prepare
		const generatedCode = "<mt:TagName>";
		const expected = "```\n<mt:TagName>\n```\n";

		// execute
		const actual = Markdown.codeblock(generatedCode);

		// assert
		assert.equal(actual, expected);
	});

	test("description test", () => {
		// prepare
		const item = new Tag(
			"TagName",
			"block",
			"description\n text\n with\n crlf.",
			"",
			{}
		);
		const expected = "description\n text\n with\n crlf.\n";

		// execute
		const actual = Markdown.description(item);

		// assert
		assert.equal(actual, expected);
	});

	test("anchor test, Tag has empty url", () => {
		// prepare
		const item = new Tag("TagName", "block", "", "", {});
		const expected = "";

		// execute
		const actual = Markdown.anchor(item);

		// assert
		assert.equal(actual, expected);
	});

	test("anchor test, Tag has valid url", () => {
		// prepare
		const item = new Tag("TagName", "block", "", "https://example.com/", {});
		const expected = "[TagName](https://example.com/)\n";

		// execute
		const actual = Markdown.anchor(item);

		// assert
		assert.equal(actual, expected);
	});

	test("anchor test, GlobalModifier has empty url", () => {
		// prepare
		const item = new GlobalModifier("TagName", "", "");
		const expected = "";

		// execute
		const actual = Markdown.anchor(item);

		// assert
		assert.equal(actual, expected);
	});

	test("anchor test, GlobalModifier has valid url", () => {
		// prepare
		const item = new GlobalModifier("global", "", "https://example.com/");
		const expected = "[global](https://example.com/)\n";

		// execute
		const actual = Markdown.anchor(item);

		// assert
		assert.equal(actual, expected);
	});

	test("localModifiers length 0", () => {
		// prepare
		const mods: TLocalModifiers = {};
		const expected = "";

		// execute
		const actual = Markdown.localModifiersList(mods);

		// assert
		assert.equal(actual, expected);
	});

	test("localModifiers length 2", () => {
		// prepare
		const mods: TLocalModifiers = {
			mdo1: new LocalModifier("mod1", "description1", ""),
			mdo2: new LocalModifier("mod2", "description2", "val1 | val2"),
		};
		const expected = [
			"モディファイア\n",
			"- mod1",
			"  - description1",
			"- mod2",
			"  - description2",
		].join("\n");

		// execute
		const actual = Markdown.localModifiersList(mods);

		// assert
		assert.equal(actual, expected);
	});
});
