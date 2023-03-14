import movabletypeTag from "./data/movabletype/tag.json";
import movabletypeModifier from "./data/movabletype/modifier.json";
import movabletype_netTag from "./data/movabletype_net/tag.json";
import movabletype_netModifier from "./data/movabletype_net/modifier.json";
import powercmsTag from "./data/powercms/tag.json";
import powercmsModifier from "./data/powercms/modifier.json";
import powercms_xTag from "./data/powercms_x/tag.json";
import powercms_xModifier from "./data/powercms_x/modifier.json";
import { TItems, Tag } from "./Item";

const MOVABLETYPE_ITEMS: TItems = [movabletypeTag, movabletypeModifier];
const MOVABLETYPE_NET_ITEMS: TItems = [
	movabletype_netTag,
	movabletype_netModifier,
];
const POWERCMS_ITEMS: TItems = [powercmsTag, powercmsModifier];
const POWERCMS_X_ITEMS: TItems = [powercms_xTag, powercms_xModifier];

export const getCmsItems = (cmsName: TCms): TItems => {
	switch (cmsName) {
		case "Movable Type.net":
			return MOVABLETYPE_NET_ITEMS;
		case "PowerCMS":
			return POWERCMS_ITEMS;
		case "PowerCMS X":
			return POWERCMS_X_ITEMS;
		default:
			return MOVABLETYPE_ITEMS;
	}
};

export type TCms =
	| "Movable Type"
	| "Movable Type.net"
	| "PowerCMS"
	| "PowerCMS X";

export const makeDummyTag = (name?: string): Tag => {
	return new Tag(name || "", "undefined", "", "", {});
};
