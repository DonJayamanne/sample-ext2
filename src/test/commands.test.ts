import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Commands Test Suite', () => {
	test('Hello World command should be registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('sample-ext.helloWorld'));
	});

	test('Hello World command should execute without error', async () => {
		// This test verifies that the command can be executed
		// In a real VS Code environment, this would trigger the command
		try {
			await vscode.commands.executeCommand('sample-ext.helloWorld');
			// If we reach here, the command executed successfully
			assert.ok(true);
		} catch (error) {
			assert.fail(`Command execution failed: ${error}`);
		}
	});

	test('Command should show information message', async () => {
		// Mock the showInformationMessage to verify it's called
		let messageShown = false;
		let originalShowInformationMessage = vscode.window.showInformationMessage;
		
		// Create a mock function
		vscode.window.showInformationMessage = (message: string) => {
			messageShown = true;
			assert.strictEqual(message, 'Hello World from sample-ext!');
			return originalShowInformationMessage(message);
		};

		try {
			await vscode.commands.executeCommand('sample-ext.helloWorld');
			assert.ok(messageShown, 'Information message should have been shown');
		} finally {
			// Restore original function
			vscode.window.showInformationMessage = originalShowInformationMessage;
		}
	});
});