import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Lifecycle Tests', () => {
	test('Extension exports correct functions', () => {
		// Verify required exports exist
		assert.ok(myExtension.activate, 'Extension should export activate function');
		assert.ok(myExtension.deactivate, 'Extension should export deactivate function');
		
		// Verify function types
		assert.strictEqual(typeof myExtension.activate, 'function', 'activate should be a function');
		assert.strictEqual(typeof myExtension.deactivate, 'function', 'deactivate should be a function');
	});

	test('Extension context handling', () => {
		// Create a mock context for testing
		const mockContext: vscode.ExtensionContext = {
			subscriptions: [],
			workspaceState: {} as any,
			globalState: {} as any,
			extensionPath: '/mock/path',
			extensionUri: vscode.Uri.file('/mock/path'),
			environmentVariableCollection: {} as any,
			asAbsolutePath: (relativePath: string) => `/mock/path/${relativePath}`,
			storageUri: undefined,
			globalStorageUri: vscode.Uri.file('/mock/global'),
			logUri: vscode.Uri.file('/mock/log'),
			secrets: {} as any,
			extension: {} as any,
			globalStoragePath: '/mock/global',
			logPath: '/mock/log',
			storagePath: undefined,
			extensionMode: vscode.ExtensionMode.Test,
			languageModelAccessInformation: {} as any
		};

		// Test that activate function accepts context
		assert.doesNotThrow(() => {
			myExtension.activate(mockContext);
		}, 'activate function should accept extension context without throwing');

		// Verify subscriptions array is available
		assert.ok(Array.isArray(mockContext.subscriptions), 'Context should have subscriptions array');
	});

	test('Extension deactivation', () => {
		// Test that deactivate function can be called
		assert.doesNotThrow(() => {
			const result = myExtension.deactivate();
			// deactivate should return void or Thenable<void>, but we'll just verify it doesn't throw
			assert.ok(result === undefined || result !== null, 'deactivate should complete successfully');
		}, 'deactivate function should not throw');
	});
});

suite('Utility Function Tests', () => {
	test('String manipulation utilities', () => {
		const testCases = [
			{ input: 'hello', expected: 5 },
			{ input: '', expected: 0 },
			{ input: 'Hello World from sample-ext!', expected: 29 }
		];

		testCases.forEach(testCase => {
			assert.strictEqual(testCase.input.length, testCase.expected, 
				`String "${testCase.input}" should have length ${testCase.expected}`);
		});
	});

	test('Array operations', () => {
		const numbers = [1, 2, 3, 4, 5];
		
		// Test basic operations
		assert.strictEqual(numbers.length, 5, 'Array should have 5 elements');
		assert.ok(numbers.includes(3), 'Array should contain 3');
		assert.ok(!numbers.includes(6), 'Array should not contain 6');
		
		// Test array methods
		const doubled = numbers.map(n => n * 2);
		assert.deepStrictEqual(doubled, [2, 4, 6, 8, 10], 'Doubled array should be correct');
		
		const sum = numbers.reduce((a, b) => a + b, 0);
		assert.strictEqual(sum, 15, 'Sum should be 15');
	});

	test('Object validation', () => {
		const testObject = {
			name: 'sample-ext',
			version: '0.0.1',
			active: true
		};

		assert.ok(typeof testObject === 'object', 'Should be an object');
		assert.ok(testObject.name, 'Should have name property');
		assert.ok(testObject.version, 'Should have version property');
		assert.strictEqual(testObject.active, true, 'Active should be true');
		
		// Test property access
		assert.strictEqual(testObject['name'], 'sample-ext', 'Bracket notation should work');
		assert.ok('name' in testObject, 'Property should exist using in operator');
	});

	test('Error handling patterns', () => {
		// Test that we can handle various error scenarios
		assert.throws(() => {
			throw new Error('Test error');
		}, Error, 'Should properly throw and catch errors');

		// Test try-catch patterns
		let errorCaught = false;
		try {
			throw new Error('Intentional error');
		} catch (error) {
			errorCaught = true;
			assert.ok(error instanceof Error, 'Caught error should be Error instance');
		}
		assert.ok(errorCaught, 'Error should have been caught');
	});
});