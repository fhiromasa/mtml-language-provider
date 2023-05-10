/**
 * vscode のワークスペースセッティングをラップするモジュール
 */
import { workspace } from "vscode";

const CONF = workspace.getConfiguration("mtml");

export class Hover {
	static isEnable(): boolean {
		return CONF.get<boolean>("hover.enable", true);
	}
}

export class Completion {
	static isEnable() {
		return CONF.get<boolean>("completion.enable", true);
	}
}
export class Definition {
	static isEnable() {
		return CONF.get<boolean>("definition.enable", true);
	}
}

export class CMS {
	static getName() {
		return CONF.get<TCms>("cms.name", "Movable Type");
	}
}

export type TCms =
	| "Movable Type"
	| "Movable Type.net"
	| "PowerCMS"
	| "PowerCMS X";
