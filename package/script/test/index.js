#!/usr/bin/env node
const { resolve } = require('path');

// Execute across OS.
const { echo, exec } = require('shelljs');

// Jest cli configuration.
const [, , ...args] = process.argv;

// Notify at console.
echo('Execution: Test');

// Execute jest with cli args.
exec(`jest -c ${resolve(__dirname, 'jest.config.js')} ${args.length ? args.join(' ') : ''}`);
