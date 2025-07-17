import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('DonJayamanne.sample-ext'));
	});

	test('Extension activation function exists', () => {
		assert.ok(myExtension.activate);
		assert.strictEqual(typeof myExtension.activate, 'function');
	});

	test('Extension deactivation function exists', () => {
		assert.ok(myExtension.deactivate);
		assert.strictEqual(typeof myExtension.deactivate, 'function');
	});

	test('Hello World command should be available', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('sample-ext.helloWorld'));
	});

	test('Extension should activate without errors', async () => {
		const ext = vscode.extensions.getExtension('DonJayamanne.sample-ext');
		if (ext) {
			await ext.activate();
			assert.ok(ext.isActive);
		}
	});

	test('Hello World command should execute without errors', async () => {
		let commandExecuted = false;
		try {
			await vscode.commands.executeCommand('sample-ext.helloWorld');
			commandExecuted = true;
		} catch (error) {
			assert.fail(`Command execution failed: ${error}`);
		}
		assert.ok(commandExecuted, 'Hello World command should execute successfully');
	});
});

suite('Extension Utility Tests', () => {
	test('Array indexOf behavior', () => {
		const testArray = [1, 2, 3, 4, 5];
		assert.strictEqual(testArray.indexOf(3), 2);
		assert.strictEqual(testArray.indexOf(6), -1);
		assert.strictEqual(testArray.indexOf(1), 0);
	});

	test('String operations', () => {
		const testString = 'Hello World from sample-ext!';
		assert.ok(testString.includes('Hello'));
		assert.ok(testString.includes('sample-ext'));
		assert.strictEqual(testString.split(' ').length, 4);
	});

	test('Extension context mock', () => {
		const mockContext = {
			subscriptions: [],
			workspaceState: undefined,
			globalState: undefined,
			extensionPath: '/mock/path'
		};
		assert.ok(Array.isArray(mockContext.subscriptions));
		assert.strictEqual(mockContext.subscriptions.length, 0);
	});
});

suite('Edge Cases and Error Handling', () => {
	test('Command with invalid name should not exist', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(!commands.includes('sample-ext.invalidCommand'));
		assert.ok(!commands.includes(''));
	});

	test('Extension namespace validation', () => {
		// Test that our extension follows naming conventions
		const extensionId = 'DonJayamanne.sample-ext';
		assert.ok(extensionId.includes('.'));
		assert.ok(extensionId.split('.').length === 2);
		assert.ok(extensionId.split('.')[1] === 'sample-ext');
	});

	test('Array edge cases', () => {
		const emptyArray: number[] = [];
		assert.strictEqual(emptyArray.indexOf(1), -1);
		assert.strictEqual(emptyArray.length, 0);
		
		const singleItemArray = [42];
		assert.strictEqual(singleItemArray.indexOf(42), 0);
		assert.strictEqual(singleItemArray.indexOf(43), -1);
	});
});
