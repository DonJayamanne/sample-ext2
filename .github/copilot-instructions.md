# VS Code Extension Development Guide

## Project Architecture

This is a TypeScript-based VS Code extension using a dual-bundling approach:

- **ESBuild** for fast development builds (`npm run watch:esbuild`)
- **TypeScript compiler** for type checking (`npm run watch:tsc`)
- **Entry point**: `src/extension.ts` with `activate()` and `deactivate()` functions

## Copilot Coding Agent Instructions

If you are a Copilot coding agent you must follow these instructions:

- Use `npm run compile` to compile the extension
- Use `npm run test` to run the extension tests
- Always prefer to compile and run tests fefore committing changes
- Running tests can be slow as this requires downloading VS Code

## Development Workflow

### Build System

- Use `npm run watch:esbuild` for fast compilation during development
- Use `npm run watch:tsc` for continuous type checking
- Use `npm run compile` for builds on CI servers
- Both should run simultaneously - check the workspace has both tasks running
- ESBuild config is in `esbuild.js` - modify this for bundling changes

### Extension Structure

- All source code goes in `src/` directory
- Tests go in `src/test/` directory

### Testing from within VS Code

- Use `.vscode-test.mjs` for test configuration
- Run tests with F5 (Extension Development Host) or npm test commands
- Extension tests require special VS Code test runner setup

## Code Conventions

### Build Output

- Compiled output goes to `out/` directory (gitignored)
- ESBuild bundles everything into single file for production
- Use `npm run compile` for production builds
