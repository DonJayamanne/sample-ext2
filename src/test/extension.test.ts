import * as assert from 'assert';
import * as vscode from 'vscode';
import * as extension from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	suite('Extension Activation', () => {
		test('should activate extension', () => {
			// Create a mock context
			const context: vscode.ExtensionContext = {
				subscriptions: [],
				workspaceState: {} as any,
				globalState: {} as any,
				secrets: {} as any,
				storageUri: undefined,
				storagePath: undefined,
				globalStorageUri: vscode.Uri.parse('file:///test/global'),
				globalStoragePath: '/test/global',
				logUri: vscode.Uri.parse('file:///test/log'),
				logPath: '/test/log',
				extensionUri: vscode.Uri.parse('file:///test'),
				extensionPath: '/test',
				asAbsolutePath: (relativePath: string) => '/test/' + relativePath,
				environmentVariableCollection: {} as any,
				extension: {} as any,
				extensionMode: vscode.ExtensionMode.Test,
				languageModelAccessInformation: {} as any
			};

			// Test that activation doesn't throw
			assert.doesNotThrow(() => {
				extension.activate(context);
			});

			// Test that a subscription was added (the command registration)
			assert.strictEqual(context.subscriptions.length, 1);
		});

		test('should register hello world command', async () => {
			// Get all available commands
			const commands = await vscode.commands.getCommands();
			
			// Check if our command is registered
			assert.ok(commands.includes('sample-ext.helloWorld'), 'Hello World command should be registered');
		});
	});

	suite('Extension Deactivation', () => {
		test('should deactivate without errors', () => {
			// Test that deactivation doesn't throw
			assert.doesNotThrow(() => {
				extension.deactivate();
			});
		});
	});

	suite('Command Execution', () => {
		test('should execute hello world command without errors', async () => {
			// Execute the command and ensure it doesn't throw
			try {
				await vscode.commands.executeCommand('sample-ext.helloWorld');
				assert.ok(true, 'Command executed successfully');
			} catch (error) {
				assert.fail(`Command execution failed: ${error}`);
			}
		});
	});
});
