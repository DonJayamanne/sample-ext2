import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Lifecycle Test Suite', () => {
	let mockContext: vscode.ExtensionContext;

	setup(() => {
		// Create a mock extension context
		mockContext = {
			subscriptions: [],
			workspaceState: {
				get: () => undefined,
				update: () => Promise.resolve(),
				keys: () => []
			},
			globalState: {
				get: () => undefined,
				update: () => Promise.resolve(),
				keys: () => [],
				setKeysForSync: () => {}
			},
			extensionUri: vscode.Uri.file('/test'),
			extensionPath: '/test',
			asAbsolutePath: (relativePath: string) => '/test/' + relativePath,
			storageUri: vscode.Uri.file('/test/storage'),
			globalStorageUri: vscode.Uri.file('/test/globalStorage'),
			logUri: vscode.Uri.file('/test/log'),
			storagePath: '/test/storage',
			globalStoragePath: '/test/globalStorage', 
			logPath: '/test/log',
			extensionMode: vscode.ExtensionMode.Test,
			extension: {
				id: 'test.sample-ext',
				extensionUri: vscode.Uri.file('/test'),
				extensionPath: '/test',
				isActive: true,
				packageJSON: {},
				exports: undefined,
				activate: () => Promise.resolve(),
				extensionKind: vscode.ExtensionKind.Workspace
			},
			secrets: {
				get: () => Promise.resolve(undefined),
				store: () => Promise.resolve(),
				delete: () => Promise.resolve(),
				onDidChange: new vscode.EventEmitter().event
			},
			environmentVariableCollection: {
				persistent: true,
				get: () => undefined,
				forEach: () => {},
				replace: () => {},
				append: () => {},
				prepend: () => {},
				delete: () => {},
				clear: () => {},
				[Symbol.iterator]: function* () {}
			},
			languageModelAccessInformation: {
				onDidChange: new vscode.EventEmitter().event,
				canSendRequest: () => undefined
			}
		} as unknown as vscode.ExtensionContext;
	});

	test('Extension activation should register command', () => {
		const initialSubscriptionCount = mockContext.subscriptions.length;
		
		myExtension.activate(mockContext);
		
		// Should have added one subscription (the command)
		assert.strictEqual(mockContext.subscriptions.length, initialSubscriptionCount + 1);
	});

	test('Extension activation should not throw errors', () => {
		assert.doesNotThrow(() => {
			myExtension.activate(mockContext);
		});
	});

	test('Extension deactivation should not throw errors', () => {
		assert.doesNotThrow(() => {
			myExtension.deactivate();
		});
	});

	test('Multiple activations should not cause issues', () => {
		// First activation
		myExtension.activate(mockContext);
		const subscriptionCountAfterFirst = mockContext.subscriptions.length;
		
		// Second activation with new context
		const secondContext = { ...mockContext, subscriptions: [] };
		myExtension.activate(secondContext);
		
		// Both should have added subscriptions
		assert.ok(subscriptionCountAfterFirst > 0);
		assert.ok(secondContext.subscriptions.length > 0);
	});
});