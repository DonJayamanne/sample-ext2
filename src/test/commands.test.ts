import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Command Tests', () => {
	
	suite('Hello World Command', () => {
		test('should be available in command palette', async () => {
			const commands = await vscode.commands.getCommands(true);
			const hasHelloWorld = commands.some(cmd => cmd === 'sample-ext.helloWorld');
			assert.ok(hasHelloWorld, 'sample-ext.helloWorld command should be available');
		});

		test('should execute without throwing errors', async () => {
			let executionSucceeded = false;
			try {
				await vscode.commands.executeCommand('sample-ext.helloWorld');
				executionSucceeded = true;
			} catch (error) {
				assert.fail(`Command execution should not throw: ${error}`);
			}
			assert.ok(executionSucceeded, 'Command should execute successfully');
		});
	});

	suite('Extension Commands Registry', () => {
		test('should not register duplicate commands', async () => {
			const commands = await vscode.commands.getCommands(true);
			const helloWorldCommands = commands.filter(cmd => cmd === 'sample-ext.helloWorld');
			assert.strictEqual(helloWorldCommands.length, 1, 'Should only have one instance of the command');
		});

		test('should have commands with proper naming convention', async () => {
			const commands = await vscode.commands.getCommands(true);
			const extensionCommands = commands.filter(cmd => cmd.startsWith('sample-ext.'));
			
			extensionCommands.forEach(cmd => {
				assert.ok(cmd.includes('.'), 'Extension commands should use dot notation');
				assert.ok(cmd.startsWith('sample-ext.'), 'Extension commands should start with extension name');
			});
		});
	});
});