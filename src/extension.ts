// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/**
 * Utility function to get the extension version
 */
export function getExtensionVersion(): string {
	return '0.0.1';
}

/**
 * Utility function to check if the extension is active
 */
export function isExtensionActive(): boolean {
	const extension = vscode.extensions.getExtension('undefined_publisher.sample-ext');
	return extension?.isActive ?? false;
}

/**
 * Utility function to get current workspace information
 */
export function getWorkspaceInfo(): { name: string | undefined; folders: number } {
	const workspace = vscode.workspace;
	return {
		name: workspace.name,
		folders: workspace.workspaceFolders?.length ?? 0
	};
}

/**
 * Utility function to calculate a simple sum (for testing purposes)
 */
export function calculateSum(a: number, b: number): number {
	return a + b;
}

/**
 * Async utility function for demonstration
 */
export async function getAsyncMessage(): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('Async operation completed!');
		}, 100);
	});
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sample-ext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('sample-ext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const workspaceInfo = getWorkspaceInfo();
		const message = `Hello World from sample-ext! (Version: ${getExtensionVersion()})`;
		vscode.window.showInformationMessage(message);
		
		// Log some workspace info
		console.log(`Workspace: ${workspaceInfo.name}, Folders: ${workspaceInfo.folders}`);
	});

	// Register an additional command for testing async behavior
	const asyncDisposable = vscode.commands.registerCommand('sample-ext.asyncTest', async () => {
		try {
			const message = await getAsyncMessage();
			vscode.window.showInformationMessage(`Async Test: ${message}`);
		} catch (error) {
			vscode.window.showErrorMessage(`Async Test failed: ${error}`);
		}
	});

	context.subscriptions.push(disposable, asyncDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('Extension "sample-ext" is now deactivated.');
}
