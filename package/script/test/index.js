#!/usr/bin/env node
// Utilities for working with paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js API.
const { echo, exec } = require('shelljs');

// Contains the arguments passed to the process.
const [, , ...args] = process.argv;

// Print an informative message to stdout.
echo('Execution: Test');

// Execute jest with cli args.
exec(`jest -c ${resolve(__dirname, 'jest.config.js')} ${args.length ? args.join(' ') : ''}`);
