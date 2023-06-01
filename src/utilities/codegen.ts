import {
	Tag,
	LocalModifier,
	GlobalModifier,
	TLocalModifiers,
} from "../data/item";

/**
 * @param tag
 * @param modifierString
 * @returns <mt:TagName ${modifierString}>
 */
export const generate = (tag: Tag, modifierString?: string): string => {
	const prefix = tag.name.search(/mtapp/i) < 0 ? "mt:" : "mtapp:";
	const tagName = tag.name.replace(/^mt(app)?:?/i, "");
	const completeTagName = prefix + tagName;

	const blockClosingTag = tag.type === "block" ? `</${completeTagName}>` : "";
	const modifierStr = modifierString ? ` ${modifierString}` : "";

	return `<${completeTagName}${modifierStr}>${blockClosingTag}`;
};

/**
 * @param tag
 * @returns <mt:TagName required1="value" required2="value">
 */
export const withRequiredModifiers = (tag: Tag): string => {
	const requiredModifierArr: LocalModifier[] = [];
	Object.values(tag.modifiers).forEach((modifier) => {
		if (modifier.description.search("必須です") >= 0) {
			requiredModifierArr.push(modifier);
		}
	});
	const modifierString = requiredModifierArr
		.map((modifier): string => {
			return `${localModifier(modifier)}`;
		})
		.join(" ");
	return generate(tag, modifierString);
};

/**
 * @param tag
 * @param modifier
 * @returns <mt:TagName global="">
 */
export const withGlobalModifier = (
	tag: Tag,
	modifier: GlobalModifier
): string => {
	return generate(tag, globalModifier(modifier));
};

/**
 * @param modifier
 * @returns global=""
 */
export const globalModifier = (modifier: GlobalModifier): string => {
	return (
		`${modifier.name}=""` + (modifier.name.search("replace") >= 0 ? ',""' : "")
	);
};

/**
 * @param modifier
 * @returns local="value"
 */
export const localModifier = (modifier: LocalModifier): string => {
	return `${modifier.name}="${modifier.value}"`;
};

/**
 * マークダウン形式のリストとして返す
 *
 * ex)
 * ```
 * - key
 *   - description
 * - key
 *   - description
 * ```
 *
 * @param modifiers
 * @returns
 */
export const localModifiersToMarkdownList = (
	modifiers: TLocalModifiers
): string => {
	const modifierArr = Object.values(modifiers);
	const modifierStringArr = modifierArr.map((modifier) => {
		return [
			`- ${modifier.name}`,
			`  - ${modifier.description || "no description"}`,
		].join("\n");
	});
	return modifierStringArr.join("\n");
};
