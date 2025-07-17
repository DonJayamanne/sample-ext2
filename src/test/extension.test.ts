import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('undefined_publisher.sample-ext'));
	});

	test('Extension should have activate function', () => {
		assert.ok(typeof myExtension.activate === 'function');
	});

	test('Extension should have deactivate function', () => {
		assert.ok(typeof myExtension.deactivate === 'function');
	});

	test('Activate function should register command', async () => {
		const context = {
			subscriptions: []
		} as any;

		// Mock vscode.commands.registerCommand
		const originalRegisterCommand = vscode.commands.registerCommand;
		let registeredCommand: string | undefined;
		let registeredHandler: Function | undefined;

		vscode.commands.registerCommand = ((command: string, handler: Function) => {
			registeredCommand = command;
			registeredHandler = handler;
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			myExtension.activate(context);

			assert.strictEqual(registeredCommand, 'sample-ext.helloWorld');
			assert.ok(typeof registeredHandler === 'function');
			assert.strictEqual(context.subscriptions.length, 1);
		} finally {
			// Restore original function
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});

	test('Hello World command should show information message', async () => {
		const context = {
			subscriptions: []
		} as any;

		// Mock vscode.window.showInformationMessage
		const originalShowInformationMessage = vscode.window.showInformationMessage;
		let shownMessage: string | undefined;

		vscode.window.showInformationMessage = ((message: string) => {
			shownMessage = message;
			return Promise.resolve(undefined);
		}) as any;

		// Mock vscode.commands.registerCommand to capture the handler
		const originalRegisterCommand = vscode.commands.registerCommand;
		let commandHandler: Function | undefined;

		vscode.commands.registerCommand = ((command: string, handler: Function) => {
			commandHandler = handler;
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			myExtension.activate(context);
			
			// Execute the command handler
			if (commandHandler) {
				await commandHandler();
			}

			assert.strictEqual(shownMessage, 'Hello World from sample-ext!');
		} finally {
			// Restore original functions
			vscode.window.showInformationMessage = originalShowInformationMessage;
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});

	test('Deactivate function should complete without error', () => {
		assert.doesNotThrow(() => {
			myExtension.deactivate();
		});
	});

	test('Context subscriptions should contain disposable after activation', () => {
		const context = {
			subscriptions: []
		} as any;

		const originalRegisterCommand = vscode.commands.registerCommand;
		vscode.commands.registerCommand = (() => {
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			myExtension.activate(context);
			assert.strictEqual(context.subscriptions.length, 1);
			assert.ok(typeof context.subscriptions[0].dispose === 'function');
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});
});
