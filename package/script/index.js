#!/usr/bin/env node
// Utilities for working with paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js API.
const { echo, exec, test } = require('shelljs');

// Contains arguments passed to the process.
const [, , name, ...args] = process.argv;

// Generate path to script using provided name.
const script = resolve(__dirname, name, 'index.js');

// Verify whether the script is exist.
test('-f', script)
  ? // Execute script using Node.js
    exec(`node ${script} ${args.join(' ')}`)
  : // Print an error message to stdout.
    echo('Please provide correct script name');
