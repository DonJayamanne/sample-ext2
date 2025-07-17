import * as assert from 'assert';
import * as vscode from 'vscode';
import * as extension from '../extension';

suite('Async and Mathematical Operations', () => {
	
	suite('Mathematical Utilities', () => {
		test('should correctly calculate sum of positive numbers', () => {
			const result = extension.calculateSum(5, 3);
			assert.strictEqual(result, 8, 'Sum of 5 and 3 should be 8');
		});

		test('should correctly calculate sum of negative numbers', () => {
			const result = extension.calculateSum(-5, -3);
			assert.strictEqual(result, -8, 'Sum of -5 and -3 should be -8');
		});

		test('should correctly calculate sum of mixed positive and negative numbers', () => {
			const result = extension.calculateSum(-5, 10);
			assert.strictEqual(result, 5, 'Sum of -5 and 10 should be 5');
		});

		test('should handle zero correctly', () => {
			const result1 = extension.calculateSum(0, 5);
			const result2 = extension.calculateSum(5, 0);
			const result3 = extension.calculateSum(0, 0);
			
			assert.strictEqual(result1, 5, 'Sum of 0 and 5 should be 5');
			assert.strictEqual(result2, 5, 'Sum of 5 and 0 should be 5');
			assert.strictEqual(result3, 0, 'Sum of 0 and 0 should be 0');
		});

		test('should handle decimal numbers correctly', () => {
			const result = extension.calculateSum(2.5, 3.7);
			assert.strictEqual(result, 6.2, 'Sum of 2.5 and 3.7 should be 6.2');
		});
	});

	suite('Async Operations', () => {
		test('should resolve async message correctly', async () => {
			const message = await extension.getAsyncMessage();
			assert.strictEqual(typeof message, 'string', 'Async message should be a string');
			assert.ok(message.length > 0, 'Async message should not be empty');
			assert.strictEqual(message, 'Async operation completed!', 'Should return expected message');
		});

		test('should handle multiple concurrent async calls', async () => {
			const promises = Array.from({ length: 5 }, () => extension.getAsyncMessage());
			const results = await Promise.all(promises);
			
			assert.strictEqual(results.length, 5, 'Should return 5 results');
			results.forEach((result, index) => {
				assert.strictEqual(result, 'Async operation completed!', `Result ${index} should match expected message`);
			});
		});

		test('should complete async operation within reasonable time', async () => {
			const start = Date.now();
			const message = await extension.getAsyncMessage();
			const duration = Date.now() - start;
			
			assert.ok(duration >= 100, 'Should take at least 100ms (simulated delay)');
			assert.ok(duration < 200, 'Should complete within 200ms');
			assert.strictEqual(message, 'Async operation completed!', 'Should return correct message');
		});
	});

	suite('Async Command Tests', () => {
		test('should execute async command without errors', async () => {
			try {
				await vscode.commands.executeCommand('sample-ext.asyncTest');
				assert.ok(true, 'Async command should execute successfully');
			} catch (error) {
				assert.fail(`Async command execution should not fail: ${error}`);
			}
		});

		test('should handle rapid async command executions', async () => {
			const promises: Promise<unknown>[] = [];
			
			// Execute the async command multiple times
			for (let i = 0; i < 3; i++) {
				promises.push(Promise.resolve(vscode.commands.executeCommand('sample-ext.asyncTest')));
			}
			
			try {
				await Promise.all(promises);
				assert.ok(true, 'Multiple async command executions should not cause errors');
			} catch (error) {
				assert.fail(`Rapid async command execution should not fail: ${error}`);
			}
		});
	});

	suite('Integration Tests for Async and Math', () => {
		test('should use math utilities in async context', async () => {
			// Simulate using math utilities within an async operation
			const asyncCalculation = async (): Promise<number> => {
				await extension.getAsyncMessage(); // Wait for async operation
				return extension.calculateSum(10, 20); // Then do calculation
			};

			const result = await asyncCalculation();
			assert.strictEqual(result, 30, 'Async calculation should return correct result');
		});

		test('should handle errors in async operations gracefully', async () => {
			// Create a custom async function that might throw
			const riskyAsyncOperation = async (): Promise<string> => {
				const message = await extension.getAsyncMessage();
				if (message.length === 0) {
					throw new Error('Empty message received');
				}
				return message;
			};

			try {
				const result = await riskyAsyncOperation();
				assert.ok(result, 'Risky async operation should succeed with valid message');
			} catch (error) {
				assert.fail(`Risky async operation should not fail with valid implementation: ${error}`);
			}
		});
	});
});