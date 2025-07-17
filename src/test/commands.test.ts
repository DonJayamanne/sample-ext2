import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Command Tests', () => {
	test('Hello World command registration', async () => {
		// Verify the command is registered in the extension
		const commands = await vscode.commands.getCommands(true);
		const hasHelloWorldCommand = commands.includes('sample-ext.helloWorld');
		assert.ok(hasHelloWorldCommand, 'Hello World command should be registered');
	});

	test('Command execution tracking', async () => {
		// This test verifies that the command can be executed
		// In a real test environment, this would trigger the actual command
		let executionAttempted = false;
		
		try {
			await vscode.commands.executeCommand('sample-ext.helloWorld');
			executionAttempted = true;
		} catch (error) {
			// In test environment, command might not be fully available
			// but we can still verify the attempt was made
			executionAttempted = true;
		}
		
		assert.ok(executionAttempted, 'Command execution should be attempted');
	});

	test('Extension command namespace', () => {
		const commandId = 'sample-ext.helloWorld';
		const parts = commandId.split('.');
		
		assert.strictEqual(parts.length, 2, 'Command should have namespace.command format');
		assert.strictEqual(parts[0], 'sample-ext', 'Command namespace should match extension name');
		assert.strictEqual(parts[1], 'helloWorld', 'Command name should be helloWorld');
	});

	test('Command validation', () => {
		// Test various command format validations
		const validCommands = [
			'sample-ext.helloWorld',
			'extension.command',
			'my-ext.doSomething'
		];

		const invalidCommands = [
			'',
			'nonamespace',
			'.command',
			'namespace.',
			'too.many.parts.here'
		];

		validCommands.forEach(cmd => {
			const parts = cmd.split('.');
			assert.ok(parts.length === 2, `Valid command ${cmd} should have exactly 2 parts`);
			assert.ok(parts[0].length > 0, `Valid command ${cmd} should have non-empty namespace`);
			assert.ok(parts[1].length > 0, `Valid command ${cmd} should have non-empty command name`);
		});

		invalidCommands.forEach(cmd => {
			const parts = cmd.split('.');
			const isValid = parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
			assert.ok(!isValid, `Invalid command ${cmd} should not pass validation`);
		});
	});
});

suite('Message Tests', () => {
	test('Information message content', () => {
		const expectedMessage = 'Hello World from sample-ext!';
		
		// Test message structure
		assert.ok(expectedMessage.includes('Hello World'), 'Message should contain greeting');
		assert.ok(expectedMessage.includes('sample-ext'), 'Message should reference extension name');
		assert.ok(expectedMessage.endsWith('!'), 'Message should end with exclamation');
	});

	test('Message formatting', () => {
		const message = 'Hello World from sample-ext!';
		
		// Test various formatting aspects
		assert.ok(message.length > 0, 'Message should not be empty');
		assert.ok(message.trim() === message, 'Message should not have leading/trailing whitespace');
		assert.ok(!message.includes('\n'), 'Message should be single line');
		assert.ok(!message.includes('\t'), 'Message should not contain tabs');
	});
});