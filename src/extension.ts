// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
	type DocumentSelector,
	type ExtensionContext,
	languages,
	workspace,
} from "vscode";
import {
	ModifierCompletion,
	ModifierValueCompletion,
	TagCompletion,
	VariablesCompletion,
} from "./providers/completionItemProvider";
import MTMLDefinitionProvider from "./providers/definitionProvider";
import MTMLHoverProvider from "./providers/hoverProvider";
import { Setting } from "./utils";

const SEL: DocumentSelector = { scheme: "file", language: "mtml" };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext): void {
	// hover機能の提供開始
	context.subscriptions.push(
		languages.registerHoverProvider(SEL, new MTMLHoverProvider()),
	);

	// Provide Completion
	if (Setting.Completion.isEnable()) {
		context.subscriptions.push(
			languages.registerCompletionItemProvider(SEL, new TagCompletion()),
			languages.registerCompletionItemProvider(
				SEL,
				new ModifierCompletion(),
				" ",
			),
			languages.registerCompletionItemProvider(
				SEL,
				new ModifierValueCompletion(),
				"=",
			),
			languages.registerCompletionItemProvider(
				SEL,
				new VariablesCompletion(),
				"=",
				"$",
			),
		);
	}

	// Provide Definition
	if (workspace.getConfiguration("mtml").get<boolean>("definition.enable")) {
		context.subscriptions.push(
			languages.registerDefinitionProvider(SEL, new MTMLDefinitionProvider()),
		);
	}
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
