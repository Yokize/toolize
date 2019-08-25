#!/usr/bin/env node
const path = require('path');

// ShellJS used to execute commands across OS.
const shelljs = require('shelljs');

// Jest cli configuration.
const [, , ...args] = process.argv;

// Cli default args.
let cliArgs = `-c ${path.resolve(__dirname, 'jest.config.js')}`;

// Override cli args in case it's specified.
if (args.length) {
  cliArgs = args.join(' ');
}

// Execute jest with cli args.
shelljs.exec(`jest ${cliArgs}`);
