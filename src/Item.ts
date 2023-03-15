interface IItem {
	name: string;
	type: TItemType | string;
	description: string;
}

type TItemType = TTagType | TGlobalModifierType | TTagModifierType;

type TTagType = TBlockTagType | TFunctionTagType | "undefined";
type TBlockTagType = "block";
type TFunctionTagType = "function";

type TGlobalModifierType = "global";
type TTagModifierType = "local";

type TLocalModifiers = {
	[name: string]: LocalModifier;
};

export class Tag implements IItem {
	name: string;
	type: TTagType | string;
	description: string;
	url: string;
	modifiers: TLocalModifiers;

	constructor(
		name: string,
		type: TTagType,
		description: string,
		url: string,
		modifiers: TLocalModifiers
	) {
		this.name = name;
		this.type = type;
		this.description = description;
		this.url = url;
		this.modifiers = modifiers;
	}
}

export class FunctionTag extends Tag {
	constructor(
		name: string,
		description: string,
		url: string,
		modifiers: TLocalModifiers
	) {
		super(name, "function", description, url, modifiers);
	}
}
export class BlockTag extends Tag {
	constructor(
		name: string,
		description: string,
		url: string,
		modifiers: TLocalModifiers
	) {
		super(name, "block", description, url, modifiers);
	}
}
export class GlobalModifier implements IItem {
	name: string;
	type: TGlobalModifierType | string;
	description: string;
	url: string;
	constructor(name: string, description: string, url: string) {
		this.name = name;
		this.type = "global";
		this.description = description;
		this.url = url;
	}
}
export class LocalModifier implements IItem {
	name: string;
	description: string;
	type: TTagModifierType | string;
	value: string;
	constructor(name: string, description: string, value: string) {
		this.name = name;
		this.type = "local";
		this.description = description;
		this.value = value;
	}
}

export type TItem = Tag | GlobalModifier;
export type TTags = {
	[name: string]: Tag;
};
export type TGlobalModifiers = {
	[name: string]: GlobalModifier;
};
export type TModifier = GlobalModifier | LocalModifier;
