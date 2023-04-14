import movabletypeTag from "./data/movabletype/tag.json";
import movabletypeModifier from "./data/movabletype/modifier.json";
import movabletype_netTag from "./data/movabletype_net/tag.json";
import movabletype_netModifier from "./data/movabletype_net/modifier.json";
import powercmsTag from "./data/powercms/tag.json";
import powercmsModifier from "./data/powercms/modifier.json";
import powercms_xTag from "./data/powercms_x/tag.json";
import powercms_xModifier from "./data/powercms_x/modifier.json";
import { TTags, TGlobalModifiers } from "./data/item";

export const getCmsItems = (cmsName: TCms): [TTags, TGlobalModifiers] => {
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

export type TCms =
	| "Movable Type"
	| "Movable Type.net"
	| "PowerCMS"
	| "PowerCMS X";

// 正規表現だと改行を取れないらしい
export const tagRegex = /<\$?mt(app)?:?[^>]+/i;
