import movabletypeTag from "../data/movabletype/tag.json";
import movabletypeModifier from "../data/movabletype/modifier.json";
import movabletype_netTag from "../data/movabletype_net/tag.json";
import movabletype_netModifier from "../data/movabletype_net/modifier.json";
import powercmsTag from "../data/powercms/tag.json";
import powercmsModifier from "../data/powercms/modifier.json";
import powercms_xTag from "../data/powercms_x/tag.json";
import powercms_xModifier from "../data/powercms_x/modifier.json";
import { TTags, TGlobalModifiers, Tag, GlobalModifier } from "../data/item";
import { TCms } from "./constant";

/**
 * 設定からCMSを読み取って、それのデータを返す
 * @returns
 */
export const getCmsItems = (cmsName: TCms): [TTags, TGlobalModifiers] => {
	return [getTagItems(cmsName), getGlobalModifierItems(cmsName)];
};

/**
 * 設定からCMSを読み取って、それのデータを返す
 * @returns
 */
export const getTagItems = (cmsName: TCms): TTags => {
	switch (cmsName) {
		case "Movable Type.net":
			return movabletype_netTag;
		case "PowerCMS":
			return powercmsTag;
		case "PowerCMS X":
			return powercms_xTag;
		default:
			return movabletypeTag;
	}
};

/**
 * 設定からCMSを読み取って、それのデータを返す
 * @returns
 */
export const getGlobalModifierItems = (cmsName: TCms): TGlobalModifiers => {
	switch (cmsName) {
		case "Movable Type.net":
			return movabletype_netModifier;
		case "PowerCMS":
			return powercmsModifier;
		case "PowerCMS X":
			return powercms_xModifier;
		default:
			return movabletypeModifier;
	}
};

/**
 * リファレンスにないタグのダミーアイテムを作る。
 * @param id タグのID <mt:TagName> の "TagName"
 * @returns
 */
export const makeUndefinedTag = (id: string): Tag => {
	return new Tag(
		id,
		"undefined",
		"This tag is not included in the reference.",
		"",
		{}
	);
};

/**
 * IDからリファレンスのタグを取得する。
 * リファレンスにないものだった場合{@link makeUndefinedTag}を返す。
 * @param id タグのID <mt:TagName> の "TagName"
 * @returns
 */
export const getTagById = (id: string, cmsName: TCms): Tag => {
	const TAGS = getTagItems(cmsName);
	const lowerId = id.toLowerCase();
	return TAGS[lowerId] || makeUndefinedTag(id);
};

/**
 * IDからグローバルモディファイアを取得する。
 * IDがグローバルモディファイアにない場合は{undefined}を返す。
 * 引数に"="が含まれるときはエスケープする。
 * @param id モディファイアのID <mt:TagName mod=""> の "mod"
 * @returns
 */
export const getGlobalModifierById = (
	id: string,
	cmsName: TCms
): GlobalModifier | undefined => {
	const MODIFIERS = getGlobalModifierItems(cmsName);
	const lowerId = id.toLowerCase().replace(/=.*/g, "");
	return MODIFIERS[lowerId] || undefined;
};
