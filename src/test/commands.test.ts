import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Commands Test Suite', () => {
	
	suite('Command Registration', () => {
		test('all expected commands should be registered', async () => {
			const commands = await vscode.commands.getCommands();
			const expectedCommands = ['sample-ext.helloWorld'];
			
			for (const expectedCommand of expectedCommands) {
				assert.ok(
					commands.includes(expectedCommand), 
					`Command ${expectedCommand} should be registered`
				);
			}
		});

		test('registered commands should have valid names', async () => {
			const commands = await vscode.commands.getCommands();
			const extensionCommands = commands.filter(cmd => cmd.startsWith('sample-ext.'));
			
			for (const command of extensionCommands) {
				assert.ok(command.length > 'sample-ext.'.length, 'Command should have a name after the prefix');
				assert.ok(!command.includes(' '), 'Command names should not contain spaces');
			}
		});
	});

	suite('Command Execution', () => {
		test('commands should execute without throwing errors', async () => {
			const extensionCommands = ['sample-ext.helloWorld'];
			
			for (const command of extensionCommands) {
				try {
					await vscode.commands.executeCommand(command);
					assert.ok(true, `Command ${command} executed successfully`);
				} catch (error) {
					assert.fail(`Command ${command} failed to execute: ${error}`);
				}
			}
		});

		test('hello world command should be available in command palette', async () => {
			// This test ensures the command is properly registered for the command palette
			const commands = await vscode.commands.getCommands(true); // Include built-in commands
			assert.ok(
				commands.includes('sample-ext.helloWorld'),
				'Hello World command should be available in command palette'
			);
		});
	});
});