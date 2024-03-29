import * as path from "path";

import { runTests, downloadAndUnzipVSCode } from "@vscode/test-electron";

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, "../../");

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, "./suite/index");

		const testWorkspace = path.resolve(__dirname, "../../testFixture");
		const vscodeExecutablePath = await downloadAndUnzipVSCode("1.67.0");

		// Download VS Code, unzip it and run the integration test
		console.log("test start");
		await runTests({
			vscodeExecutablePath,
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs: [testWorkspace, "--disable-extensions"],
		});
	} catch (err) {
		console.error("Failed to run tests");
		process.exit(1);
	}
}

main();
