#!/usr/bin/env node
const path = require('path');

// ShellJS used to execute commands across OS.
const shelljs = require('shelljs');

// Script name and cli arguments.
const [, , script, ...args] = process.argv;

// Script name is mandatory.
if (!script) {
  throw new Error('Please specify script');
}

// Execute script using node.
shelljs.exec(`node ${path.resolve(__dirname, script)} ${args.join(' ')}`);
