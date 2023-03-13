import movabletypeItems from "./data/movabletype.json";
import movabletype_netItems from "./data/movabletype_net.json";
import powercmsItems from "./data/powercms.json";
import powercms_xItems from "./data/powercms_x.json";

const MOVABLETYPE_ITEMS: TItems = movabletypeItems;
const MOVABLETYPE_NET_ITEMS: TItems = movabletype_netItems;
const POWERCMS_ITEMS: TItems = powercmsItems;
const POWERCMS_X_ITEMS: TItems = powercms_xItems;

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

type TItems = {
	[string: string]: TItem;
};
export type TItem = {
	name: string;
	url: string;
	type: string;
	description: string;
	modifiers: TModifiers;
};
type TModifiers = {
	[string: string]: TModifier;
};
export type TModifier = {
	name: string;
	type: string;
	value: string;
	description: string;
	url: string;
};

export const makeDummyItem = (name?: string): TItem => {
	return {
		name: name || "",
		url: "",
		type: "",
		description: "This tag is not included in the reference.",
		modifiers: {},
	};
};
