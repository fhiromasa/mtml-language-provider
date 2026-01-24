import { deepStrictEqual, equal, fail, match, strictEqual } from "node:assert";
import type { TCms } from "../../utilities/constant";
import * as Data from "../../utilities/data";

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
		match(tag["mtvar"].url, new RegExp(host(cmsName)));
		match(gMod["setvar"].url, new RegExp(host(cmsName)));
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
		strictEqual(actual.name, id);
		strictEqual(actual.url, "");
		strictEqual(actual.type, "undefined");
		deepStrictEqual(actual.modifiers, {});
	});

	test("getTagById", () => {
		// prepare
		const id = "MTVar";

		// execute
		const actual = Data.getTagById(id, "Movable Type");

		// assert
		strictEqual(actual.name, id);
		strictEqual(
			actual.url,
			"https://movabletype.jp/documentation/appendices/tags/var.html",
		);
		strictEqual(actual.type, "function");
		deepStrictEqual(Object.keys(actual.modifiers), [
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
		strictEqual(actual.name, id);
		strictEqual(actual.url, "");
		strictEqual(actual.type, "undefined");
		deepStrictEqual(actual.modifiers, {});
	});

	test("getGlobalModifierById", () => {
		// prepare
		const id = "replace";

		// execute
		const actual = Data.getGlobalModifierById(id, "Movable Type");

		// assert
		if (!actual) {
			fail();
		}
		strictEqual(actual.name, id);
		strictEqual(
			actual.url,
			"https://movabletype.jp/documentation/appendices/modifiers/replace.html",
		);
		strictEqual(actual.type, "global");
	});

	test("getGlobalModifierById not exist", () => {
		// prepare
		const id = `no_exist="modifier | value"`;

		// execute
		const actual = Data.getGlobalModifierById(id, "Movable Type");

		// assert
		equal(actual, undefined);
	});
});
