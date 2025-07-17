import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Command Tests', () => {
	
	test('should register sample-ext.helloWorld command', () => {
		const context = {
			subscriptions: []
		} as any;

		const originalRegisterCommand = vscode.commands.registerCommand;
		let registeredCommands: string[] = [];

		vscode.commands.registerCommand = ((command: string, handler: Function) => {
			registeredCommands.push(command);
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			myExtension.activate(context);
			assert.ok(registeredCommands.includes('sample-ext.helloWorld'));
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});

	test('should handle command execution without throwing errors', async () => {
		const context = {
			subscriptions: []
		} as any;

		let commandHandler: Function | undefined;
		const originalRegisterCommand = vscode.commands.registerCommand;
		const originalShowInformationMessage = vscode.window.showInformationMessage;

		vscode.commands.registerCommand = ((command: string, handler: Function) => {
			commandHandler = handler;
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		vscode.window.showInformationMessage = (() => {
			return Promise.resolve(undefined);
		}) as any;

		try {
			myExtension.activate(context);
			
			assert.doesNotThrow(async () => {
				if (commandHandler) {
					await commandHandler();
				}
			});
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
			vscode.window.showInformationMessage = originalShowInformationMessage;
		}
	});

	test('should handle multiple command executions', async () => {
		const context = {
			subscriptions: []
		} as any;

		let commandHandler: Function | undefined;
		let messageCount = 0;
		const originalRegisterCommand = vscode.commands.registerCommand;
		const originalShowInformationMessage = vscode.window.showInformationMessage;

		vscode.commands.registerCommand = ((command: string, handler: Function) => {
			commandHandler = handler;
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		vscode.window.showInformationMessage = (() => {
			messageCount++;
			return Promise.resolve(undefined);
		}) as any;

		try {
			myExtension.activate(context);
			
			// Execute command multiple times
			if (commandHandler) {
				await commandHandler();
				await commandHandler();
				await commandHandler();
			}

			assert.strictEqual(messageCount, 3);
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
			vscode.window.showInformationMessage = originalShowInformationMessage;
		}
	});
});