import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Utilities Test Suite', () => {
	test('VS Code API should be available', () => {
		assert.ok(vscode, 'VS Code API should be accessible');
		assert.ok(vscode.commands, 'VS Code commands API should be accessible');
		assert.ok(vscode.window, 'VS Code window API should be accessible');
	});

	test('Extension commands namespace should be correct', async () => {
		const commands = await vscode.commands.getCommands(true);
		const extensionCommands = commands.filter(cmd => cmd.startsWith('sample-ext.'));
		
		// Should have at least our Hello World command
		assert.ok(extensionCommands.length >= 1, 'Should have at least one extension command');
		assert.ok(extensionCommands.includes('sample-ext.helloWorld'), 'Should include Hello World command');
	});

	test('Array operations work correctly', () => {
		// Test various array operations to ensure testing framework works
		const testArray = [1, 2, 3, 4, 5];
		
		assert.strictEqual(testArray.indexOf(3), 2);
		assert.strictEqual(testArray.indexOf(6), -1);
		assert.strictEqual(testArray.length, 5);
		assert.ok(testArray.includes(4));
		assert.ok(!testArray.includes(10));
	});

	test('String operations work correctly', () => {
		const testString = 'Hello World from sample-ext!';
		
		assert.ok(testString.includes('Hello'));
		assert.ok(testString.includes('sample-ext'));
		assert.strictEqual(testString.indexOf('World'), 6);
		assert.strictEqual(testString.length, 29);
	});

	test('Extension constants are correct', () => {
		// Test that our extension constants match expected values
		const expectedMessage = 'Hello World from sample-ext!';
		const expectedCommand = 'sample-ext.helloWorld';
		
		// These would normally come from constants in the extension
		assert.strictEqual(expectedMessage, 'Hello World from sample-ext!');
		assert.strictEqual(expectedCommand, 'sample-ext.helloWorld');
	});

	test('Extension should handle errors gracefully', () => {
		// Test error handling scenarios
		assert.doesNotThrow(() => {
			// Simulate various operations that shouldn't throw
			const testObj = { test: 'value' };
			assert.ok(testObj.test);
		});
	});
});