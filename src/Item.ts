interface IItem {
	name: string;
	type: TItemType;
	description: string;
}

type TItemType = TTagType | TGlobalModifierType | TTagModifierType;

type TTagType = TBlockTagType | TFunctionTagType | "undefined";
type TBlockTagType = "block" | string;
type TFunctionTagType = "function" | string;

type TGlobalModifierType = "global" | string;
type TTagModifierType = "local" | string;

type TTagModifiers = {
	[name: string]: TagModifier;
};

export class Tag implements IItem {
	name: string;
	type: TTagType;
	description: string;
	url: string;
	modifiers: TTagModifiers;

	constructor(
		name: string,
		type: TTagType,
		description: string,
		url: string,
		modifiers: TTagModifiers
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
		modifiers: TTagModifiers
	) {
		super(name, "function", description, url, modifiers);
	}
}
export class BlockTag extends Tag {
	constructor(
		name: string,
		description: string,
		url: string,
		modifiers: TTagModifiers
	) {
		super(name, "block", description, url, modifiers);
	}
}
export class GlobalModifier implements IItem {
	name: string;
	type: TGlobalModifierType;
	description: string;
	url: string;
	constructor(name: string, description: string, url: string) {
		this.name = name;
		this.type = "global";
		this.description = description;
		this.url = url;
	}
}
export class TagModifier implements IItem {
	name: string;
	description: string;
	type: TTagModifierType;
	value: string;
	constructor(name: string, description: string, value: string) {
		this.name = name;
		this.type = "local";
		this.description = description;
		this.value = value;
	}
}

export type TItem = Tag | GlobalModifier;
export type TItems = [TTags, TGlobalModifiers];
export type TTags = {
	[name: string]: Tag;
};
export type TGlobalModifiers = {
	[name: string]: GlobalModifier;
};
export type TModifier = GlobalModifier | TagModifier;
