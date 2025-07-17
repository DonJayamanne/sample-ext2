import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
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

	test('Extension activate function should exist', () => {
		assert.ok(typeof myExtension.activate === 'function');
	});

	test('Extension deactivate function should exist', () => {
		assert.ok(typeof myExtension.deactivate === 'function');
	});
});
