/**
 * vscode のワークスペースセッティングをラップするモジュール
 */
import { workspace } from "vscode";
import type { TCms } from "./constant";

const CONF = workspace.getConfiguration("mtml");

export const Hover = {};

export const Completion = {
	isEnable: () => {
		return CONF.get<boolean>("completion.enable", true);
	},
};
export const Definition = {
	isEnable: () => {
		return CONF.get<boolean>("definition.enable", true);
	},
};

export const CMS = {
	getName: () => {
		return CONF.get<TCms>("cms.name", "Movable Type");
	},
};
