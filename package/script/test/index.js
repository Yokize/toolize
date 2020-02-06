#!/usr/bin/env node
// The built-in module provides utilities for working with paths.
const { resolve } = require('path');

// Portable (Windows/Linux/OS X) implementation of Unix shell
// commands on top of the Node.js API.
const { exec, echo } = require('shelljs');

// The process.argv property returns an array containing the command
// line arguments passed when the Node.js process was launched.
const [, , ...args] = process.argv;

// Print a message to stdout.
echo('Execution: Test');

// Execute jest with cli args.
exec(`jest -c ${resolve(__dirname, 'jest.config.js')} ${args.length ? args.join(' ') : ''}`);
