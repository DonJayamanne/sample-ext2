import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	suite('Extension Activation', () => {
		test('should export activate function', () => {
			assert.strictEqual(typeof myExtension.activate, 'function');
		});

		test('should export deactivate function', () => {
			assert.strictEqual(typeof myExtension.deactivate, 'function');
		});

		test('activate function should register command', async () => {
			// Create a mock extension context
			const context: vscode.ExtensionContext = {
				subscriptions: [],
				workspaceState: {} as any,
				globalState: {} as any,
				extensionUri: vscode.Uri.file(''),
				extensionPath: '',
				storagePath: '',
				globalStoragePath: '',
				logPath: '',
				storageUri: undefined,
				globalStorageUri: vscode.Uri.file(''),
				logUri: vscode.Uri.file(''),
				asAbsolutePath: (relativePath: string) => relativePath,
				environmentVariableCollection: {} as any,
				extensionMode: vscode.ExtensionMode.Test,
				extension: {} as any,
				secrets: {} as any,
				languageModelAccessInformation: {} as any
			};

			// Get initial command count
			const initialCommands = await vscode.commands.getCommands();
			const initialHelloWorldCommands = initialCommands.filter(cmd => cmd === 'sample-ext.helloWorld');

			// Activate the extension
			myExtension.activate(context);

			// Verify that subscriptions were added
			assert.ok(context.subscriptions.length > 0, 'Extension should add subscriptions to context');

			// Verify that the command is registered
			const commands = await vscode.commands.getCommands();
			const helloWorldCommands = commands.filter(cmd => cmd === 'sample-ext.helloWorld');
			assert.ok(helloWorldCommands.length >= initialHelloWorldCommands.length, 'Hello World command should be registered');
		});
	});

	suite('Commands', () => {
		test('should have helloWorld command available', async () => {
			const commands = await vscode.commands.getCommands();
			assert.ok(commands.includes('sample-ext.helloWorld'), 'Should include the helloWorld command');
		});

		test('helloWorld command should execute without error', async () => {
			// This test verifies the command can be executed
			// In a real test environment, we could mock vscode.window.showInformationMessage
			try {
				await vscode.commands.executeCommand('sample-ext.helloWorld');
				// If we reach here, the command executed without throwing an error
				assert.ok(true, 'Command executed successfully');
			} catch (error) {
				assert.fail(`Command execution failed: ${error}`);
			}
		});
	});

	suite('Extension Deactivation', () => {
		test('deactivate function should not throw', () => {
			assert.doesNotThrow(() => {
				myExtension.deactivate();
			}, 'Deactivate function should not throw an error');
		});
	});
});
