#!/usr/bin/env node
const path = require('path');

// ShellJS used to execute commands across OS.
const shelljs = require('shelljs');

// Jest cli configuration.
const [, , ...args] = process.argv;

// Cli args.
let cliArgs = args.length ? args.join(' ') : '';

// Execute jest with cli args.
shelljs.exec(`jest -c ${path.resolve(__dirname, 'jest.config.js')} ${cliArgs}`);
