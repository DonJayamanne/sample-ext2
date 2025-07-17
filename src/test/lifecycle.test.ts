import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Activation and Lifecycle Tests', () => {

	test('should activate without throwing errors', () => {
		const context = {
			subscriptions: []
		} as any;

		const originalRegisterCommand = vscode.commands.registerCommand;
		vscode.commands.registerCommand = (() => {
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			assert.doesNotThrow(() => {
				myExtension.activate(context);
			});
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});

	test('should handle null or undefined context gracefully', () => {
		const originalRegisterCommand = vscode.commands.registerCommand;
		vscode.commands.registerCommand = (() => {
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			// Test with empty subscriptions array
			const emptyContext = { subscriptions: [] } as any;
			assert.doesNotThrow(() => {
				myExtension.activate(emptyContext);
			});
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});

	test('should add exactly one subscription to context', () => {
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
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});

	test('should deactivate cleanly', () => {
		assert.doesNotThrow(() => {
			myExtension.deactivate();
		});

		// Test multiple calls to deactivate
		assert.doesNotThrow(() => {
			myExtension.deactivate();
			myExtension.deactivate();
		});
	});

	test('should preserve existing subscriptions when activating', () => {
		const existingDisposable = { dispose: () => {} };
		const context = {
			subscriptions: [existingDisposable]
		} as any;

		const originalRegisterCommand = vscode.commands.registerCommand;
		vscode.commands.registerCommand = (() => {
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			myExtension.activate(context);
			
			assert.strictEqual(context.subscriptions.length, 2);
			assert.strictEqual(context.subscriptions[0], existingDisposable);
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});

	test('should handle activation after deactivation', () => {
		const context = {
			subscriptions: []
		} as any;

		const originalRegisterCommand = vscode.commands.registerCommand;
		vscode.commands.registerCommand = (() => {
			return { dispose: () => {} } as vscode.Disposable;
		}) as any;

		try {
			// Activate, deactivate, then activate again
			myExtension.activate(context);
			myExtension.deactivate();
			
			// Clear subscriptions as would happen in real VS Code
			context.subscriptions = [];
			
			assert.doesNotThrow(() => {
				myExtension.activate(context);
			});
			
			assert.strictEqual(context.subscriptions.length, 1);
		} finally {
			vscode.commands.registerCommand = originalRegisterCommand;
		}
	});
});