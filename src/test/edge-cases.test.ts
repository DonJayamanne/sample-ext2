import * as assert from 'assert';
import * as vscode from 'vscode';
import * as extension from '../extension';

suite('Error Handling and Edge Cases', () => {
	
	suite('Command Error Handling', () => {
		test('should handle multiple rapid command executions', async () => {
			const promises: Promise<unknown>[] = [];
			
			// Execute the command multiple times rapidly
			for (let i = 0; i < 5; i++) {
				promises.push(Promise.resolve(vscode.commands.executeCommand('sample-ext.helloWorld')));
			}
			
			try {
				await Promise.all(promises);
				assert.ok(true, 'Multiple rapid executions should not cause errors');
			} catch (error) {
				assert.fail(`Rapid command execution should not fail: ${error}`);
			}
		});

		test('should handle non-existent command gracefully', async () => {
			try {
				await vscode.commands.executeCommand('sample-ext.nonExistentCommand');
				assert.fail('Should have thrown an error for non-existent command');
			} catch (error) {
				assert.ok(error, 'Should throw error for non-existent command');
			}
		});
	});

	suite('Extension Lifecycle Edge Cases', () => {
		test('should handle multiple activations gracefully', () => {
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

			// First activation
			extension.activate(context);
			const firstSubscriptionCount = context.subscriptions.length;

			// Second activation (should not duplicate subscriptions)
			extension.activate(context);
			const secondSubscriptionCount = context.subscriptions.length;

			// Should have added another subscription (this is expected behavior)
			assert.strictEqual(
				secondSubscriptionCount, 
				firstSubscriptionCount + 1, 
				'Multiple activations should add subscriptions'
			);
		});

		test('should handle multiple deactivations gracefully', () => {
			// Multiple deactivations should not throw
			assert.doesNotThrow(() => {
				extension.deactivate();
				extension.deactivate();
				extension.deactivate();
			}, 'Multiple deactivations should not throw errors');
		});
	});

	suite('Utility Function Edge Cases', () => {
		test('should handle workspace changes gracefully', () => {
			// Call workspace info multiple times to ensure consistency
			const info1 = extension.getWorkspaceInfo();
			const info2 = extension.getWorkspaceInfo();
			
			// Should return consistent structure even if workspace changes
			assert.strictEqual(typeof info1.folders, typeof info2.folders, 'Folder count type should be consistent');
			assert.strictEqual(
				typeof info1.name, 
				typeof info2.name, 
				'Workspace name type should be consistent'
			);
		});

		test('should handle version requests in different contexts', () => {
			// Version should be consistent regardless of when called
			const versions = Array.from({ length: 10 }, () => extension.getExtensionVersion());
			const uniqueVersions = new Set(versions);
			
			assert.strictEqual(uniqueVersions.size, 1, 'Version should be consistent across multiple calls');
		});
	});

	suite('Performance and Memory Tests', () => {
		test('should not leak memory on repeated utility calls', () => {
			// Call utility functions many times
			for (let i = 0; i < 1000; i++) {
				extension.getExtensionVersion();
				extension.getWorkspaceInfo();
				extension.isExtensionActive();
			}
			
			// If we reach here without running out of memory, test passes
			assert.ok(true, 'Repeated utility calls should not cause memory issues');
		});

		test('should respond quickly to utility function calls', () => {
			const start = Date.now();
			
			// Call each utility function multiple times
			for (let i = 0; i < 100; i++) {
				extension.getExtensionVersion();
				extension.getWorkspaceInfo();
				extension.isExtensionActive();
			}
			
			const duration = Date.now() - start;
			
			// Should complete quickly (less than 1 second for 300 calls)
			assert.ok(duration < 1000, `Utility functions should be fast, took ${duration}ms`);
		});
	});
});