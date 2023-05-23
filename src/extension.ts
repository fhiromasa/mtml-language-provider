// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
	workspace,
	DocumentSelector,
	ExtensionContext,
	languages,
} from "vscode";
import MTMLHoverProvider from "./providers/hoverProvider";
import {
	TagCompletion,
	ModifierCompletion,
	ModifierValueCompletion,
	VariablesCompletion,
} from "./providers/completionItemProvider";
import MTMLDefinitionProvider from "./providers/definitionProvider";
import { Setting } from "./utils";

const SEL: DocumentSelector = { scheme: "file", language: "mtml" };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext): void {
	// hover機能の提供開始
	context.subscriptions.push(
		languages.registerHoverProvider(SEL, new MTMLHoverProvider())
	);

	// Provide Completion
	if (Setting.Completion.isEnable()) {
		context.subscriptions.push(
			languages.registerCompletionItemProvider(SEL, new TagCompletion()),
			languages.registerCompletionItemProvider(SEL, new ModifierCompletion(), " "),
			languages.registerCompletionItemProvider(SEL, new ModifierValueCompletion(), "="),
			languages.registerCompletionItemProvider(SEL, new VariablesCompletion(), "=","$")
		);
	}

	// Provide Definition
	if (workspace.getConfiguration("mtml").get<Boolean>("definition.enable")) {
		context.subscriptions.push(
			languages.registerDefinitionProvider(SEL, new MTMLDefinitionProvider())
		);
	}
}

// this method is called when your extension is deactivated
export function deactivate(): void {}
