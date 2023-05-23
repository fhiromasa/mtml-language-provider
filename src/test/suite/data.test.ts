import * as assert from "assert";
import * as Data from "../../utilities/data";

import { TCms } from "../../utilities/constant";

const host = (cms: TCms) => {
	switch (cms) {
		case "Movable Type":
			return "movabletype.jp";
		case "Movable Type.net":
			return "movabletype.net";
		case "PowerCMS":
			return "www.powercms.jp";
		case "PowerCMS X":
			return "powercmsx.jp";
	}
};

suite("data Test Suite", () => {
	/**
	 * getCmsItemsのテストをまとめた関数
	 * @param cmsName
	 */
	function testGetCmsItems(cmsName: TCms) {
		// execute
		const [tag, gMod] = Data.getCmsItems(cmsName);

		// assert
		assert.match(tag["mtvar"].url, new RegExp(host(cmsName)));
		assert.match(gMod["setvar"].url, new RegExp(host(cmsName)));
	}

	/**
	 * getTagItems, getGlobalModifierItems を一緒にテストする
	 * テストの内容： cms 種別によって取得するものがちゃんと変わっているかどうか
	 */
	test("getCmsItems MovableType", () => {
		// execute
		testGetCmsItems("Movable Type");
	});

	test("getCmsItems MovableType.Net", () => {
		// execute
		testGetCmsItems("Movable Type.net");
	});

	test("getCmsItems PowerCMS", () => {
		// execute
		testGetCmsItems("PowerCMS");
	});

	test("getCmsItems PowerCMS X", () => {
		// execute
		testGetCmsItems("PowerCMS X");
	});

	test("makeUndefinedTag", () => {
		// prepare
		const id = "NoExistingTag";

		// execute
		const actual = Data.makeUndefinedTag(id);

		// assert
		assert.strictEqual(actual.name, id);
		assert.strictEqual(actual.url, "");
		assert.strictEqual(actual.type, "undefined");
		assert.deepStrictEqual(actual.modifiers, {});
	});

	test("getTagById", () => {
		// prepare
		const id = "MTVar";

		// execute
		const actual = Data.getTagById(id, "Movable Type");

		// assert
		assert.strictEqual(actual.name, id);
		assert.strictEqual(
			actual.url,
			"https://movabletype.jp/documentation/appendices/tags/var.html"
		);
		assert.strictEqual(actual.type, "function");
		assert.deepStrictEqual(Object.keys(actual.modifiers), [
			"name",
			"var",
			"value",
			"op ",
			"index ",
			"key ",
			"function ",
		]);
	});

	test("getTagById not exist", () => {
		// prepare
		const id = "NoExistingTag";

		// execute
		const actual = Data.getTagById(id, "Movable Type");

		// assert
		assert.strictEqual(actual.name, id);
		assert.strictEqual(actual.url, "");
		assert.strictEqual(actual.type, "undefined");
		assert.deepStrictEqual(actual.modifiers, {});
	});

	test("getGlobalModifierById", () => {
		// prepare
		const id = "replace";

		// execute
		const actual = Data.getGlobalModifierById(id, "Movable Type");

		// assert
		if (!actual) {
			assert.fail();
		}
		assert.strictEqual(actual.name, id);
		assert.strictEqual(
			actual.url,
			"https://www.movabletype.jp/documentation/appendices/modifiers/replace.html"
		);
		assert.strictEqual(actual.type, "global");
	});

	test("getGlobalModifierById not exist", () => {
		// prepare
		const id = `no_exist="modifier | value"`;

		// execute
		const actual = Data.getGlobalModifierById(id, "Movable Type");

		// assert
		assert.equal(actual, undefined);
	});
});
