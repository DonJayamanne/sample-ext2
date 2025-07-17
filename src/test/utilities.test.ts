import * as assert from 'assert';
import * as vscode from 'vscode';
import * as extension from '../extension';

suite('Extension Utilities', () => {
	
	suite('Version Management', () => {
		test('should return a valid version string', () => {
			const version = extension.getExtensionVersion();
			assert.ok(typeof version === 'string', 'Version should be a string');
			assert.ok(version.length > 0, 'Version should not be empty');
			assert.ok(/^\d+\.\d+\.\d+$/.test(version), 'Version should follow semantic versioning pattern');
		});

		test('should return consistent version across calls', () => {
			const version1 = extension.getExtensionVersion();
			const version2 = extension.getExtensionVersion();
			assert.strictEqual(version1, version2, 'Version should be consistent across calls');
		});
	});

	suite('Extension Status', () => {
		test('should check extension active status', () => {
			const isActive = extension.isExtensionActive();
			assert.ok(typeof isActive === 'boolean', 'isExtensionActive should return a boolean');
		});

		test('should handle extension not found gracefully', () => {
			// This test ensures the function doesn't throw when extension isn't found
			assert.doesNotThrow(() => {
				extension.isExtensionActive();
			}, 'isExtensionActive should not throw when extension is not found');
		});
	});

	suite('Workspace Information', () => {
		test('should return workspace info object', () => {
			const workspaceInfo = extension.getWorkspaceInfo();
			
			assert.ok(typeof workspaceInfo === 'object', 'getWorkspaceInfo should return an object');
			assert.ok('name' in workspaceInfo, 'Workspace info should have name property');
			assert.ok('folders' in workspaceInfo, 'Workspace info should have folders property');
		});

		test('should return valid folder count', () => {
			const workspaceInfo = extension.getWorkspaceInfo();
			
			assert.ok(typeof workspaceInfo.folders === 'number', 'Folders count should be a number');
			assert.ok(workspaceInfo.folders >= 0, 'Folders count should not be negative');
		});

		test('should handle workspace name correctly', () => {
			const workspaceInfo = extension.getWorkspaceInfo();
			
			// Name can be undefined or a string
			assert.ok(
				workspaceInfo.name === undefined || typeof workspaceInfo.name === 'string',
				'Workspace name should be undefined or a string'
			);
		});
	});

	suite('Mathematical Operations', () => {
		test('should perform basic addition correctly', () => {
			const result = extension.calculateSum(2, 3);
			assert.strictEqual(result, 5, 'calculateSum should correctly add two numbers');
		});

		test('should handle edge cases in addition', () => {
			assert.strictEqual(extension.calculateSum(0, 0), 0, 'Adding zeros should return zero');
			assert.strictEqual(extension.calculateSum(-1, 1), 0, 'Adding opposite numbers should return zero');
			assert.strictEqual(extension.calculateSum(1.5, 2.5), 4, 'Adding decimals should work correctly');
		});
	});

	suite('Async Operations', () => {
		test('should return a promise for async message', () => {
			const messagePromise = extension.getAsyncMessage();
			assert.ok(messagePromise instanceof Promise, 'getAsyncMessage should return a Promise');
		});

		test('should resolve async message', async () => {
			const message = await extension.getAsyncMessage();
			assert.ok(typeof message === 'string', 'Async message should be a string');
			assert.ok(message.length > 0, 'Async message should not be empty');
		});
	});

	suite('Integration Tests', () => {
		test('should work together in command context', () => {
			// Test that utility functions work properly when called together
			const version = extension.getExtensionVersion();
			const isActive = extension.isExtensionActive();
			const workspaceInfo = extension.getWorkspaceInfo();
			const sum = extension.calculateSum(1, 1);

			// All should succeed without throwing
			assert.ok(version, 'Version should be available');
			assert.ok(typeof isActive === 'boolean', 'Extension status should be boolean');
			assert.ok(workspaceInfo, 'Workspace info should be available');
			assert.strictEqual(sum, 2, 'Math operation should work correctly');
		});

		test('should handle mixed sync and async operations', async () => {
			// Test mixing synchronous and asynchronous operations
			const version = extension.getExtensionVersion();
			const message = await extension.getAsyncMessage();
			const sum = extension.calculateSum(5, 10);
			
			assert.ok(version, 'Sync version call should work');
			assert.ok(message, 'Async message call should work');
			assert.strictEqual(sum, 15, 'Sync math call should work');
		});
	});
});