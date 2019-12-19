#!/usr/bin/env node
const path = require('path');

// Execute across different OS.
const shelljs = require('shelljs');

// Jest cli configuration.
const [, , ...args] = process.argv;

// Execute jest with cli args.
shelljs.exec(`jest -c ${path.resolve(__dirname, 'jest.config.js')} ${args.length ? args.join(' ') : ''}`);
