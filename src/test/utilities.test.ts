import * as assert from 'assert';

suite('Utility Tests', () => {

	test('should handle array operations correctly', () => {
		// Test various array operations to ensure basic functionality
		const testArray = [1, 2, 3, 4, 5];
		
		assert.strictEqual(testArray.indexOf(3), 2);
		assert.strictEqual(testArray.indexOf(10), -1);
		assert.ok(testArray.includes(4));
		assert.ok(!testArray.includes(10));
	});

	test('should handle string operations correctly', () => {
		const testString = 'Hello World from sample-ext!';
		
		assert.ok(testString.includes('Hello'));
		assert.ok(testString.includes('sample-ext'));
		assert.ok(!testString.includes('unknown'));
		assert.strictEqual(testString.toLowerCase().indexOf('world'), 6);
	});

	test('should handle edge cases for arrays', () => {
		const emptyArray: number[] = [];
		const nullArray = [null, undefined, 0, '', false];
		
		assert.strictEqual(emptyArray.indexOf(1), -1);
		assert.strictEqual(emptyArray.length, 0);
		
		assert.strictEqual(nullArray.indexOf(null), 0);
		assert.strictEqual(nullArray.indexOf(undefined), 1);
		assert.strictEqual(nullArray.indexOf(0), 2);
		assert.strictEqual(nullArray.indexOf(''), 3);
		assert.strictEqual(nullArray.indexOf(false), 4);
	});

	test('should validate object properties', () => {
		const testObject = {
			name: 'sample-ext',
			version: '0.0.1',
			active: true
		};

		assert.ok(Object.hasOwnProperty.call(testObject, 'name'));
		assert.ok(Object.hasOwnProperty.call(testObject, 'version'));
		assert.ok(Object.hasOwnProperty.call(testObject, 'active'));
		assert.ok(!Object.hasOwnProperty.call(testObject, 'unknown'));

		assert.strictEqual(testObject.name, 'sample-ext');
		assert.strictEqual(testObject.version, '0.0.1');
		assert.strictEqual(testObject.active, true);
	});

	test('should handle promise-like operations', async () => {
		const promise = Promise.resolve('test value');
		const result = await promise;
		
		assert.strictEqual(result, 'test value');
	});

	test('should handle error conditions gracefully', () => {
		assert.throws(() => {
			throw new Error('Test error');
		}, Error);

		assert.throws(() => {
			JSON.parse('invalid json');
		}, SyntaxError);
	});

	test('should validate type checking', () => {
		const stringValue = 'test';
		const numberValue = 42;
		const booleanValue = true;
		const objectValue = {};
		const arrayValue: any[] = [];
		const undefinedValue = undefined;
		const nullValue = null;

		assert.strictEqual(typeof stringValue, 'string');
		assert.strictEqual(typeof numberValue, 'number');
		assert.strictEqual(typeof booleanValue, 'boolean');
		assert.strictEqual(typeof objectValue, 'object');
		assert.strictEqual(typeof arrayValue, 'object');
		assert.strictEqual(typeof undefinedValue, 'undefined');
		assert.strictEqual(typeof nullValue, 'object');

		assert.ok(Array.isArray(arrayValue));
		assert.ok(!Array.isArray(objectValue));
	});
});