import movabletypeTag from "./data/movabletype/tag.json";
import movabletypeModifier from "./data/movabletype/modifier.json";
import movabletype_netTag from "./data/movabletype_net/tag.json";
import movabletype_netModifier from "./data/movabletype_net/modifier.json";
import powercmsTag from "./data/powercms/tag.json";
import powercmsModifier from "./data/powercms/modifier.json";
import powercms_xTag from "./data/powercms_x/tag.json";
import powercms_xModifier from "./data/powercms_x/modifier.json";
import { TTags, TGlobalModifiers } from "./data/item";
import * as Config from "./config";
import * as CodeBlock from "./codeBlock";

/**
 * code blockを生成するモジュール
 */
export const codeBlock = CodeBlock;

export const config = Config;

export const getCmsItems = (): [TTags, TGlobalModifiers] => {
	const cmsName = Config.CMS.getName();
	switch (cmsName) {
		case "Movable Type.net":
			return [movabletype_netTag, movabletype_netModifier];
		case "PowerCMS":
			return [powercmsTag, powercmsModifier];
		case "PowerCMS X":
			return [powercms_xTag, powercms_xModifier];
		default:
			return [movabletypeTag, movabletypeModifier];
	}
};

// 正規表現だと改行を取れないらしい
export const tagRegex = /<\$?mt(app)?:?[^>]+/i;
