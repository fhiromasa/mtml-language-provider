/**
 * vscode のワークスペースセッティングをラップするモジュール
 */
import { workspace } from "vscode";
import { TCms } from "./required";

const CONF = workspace.getConfiguration("mtml");

export class Hover {}

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
