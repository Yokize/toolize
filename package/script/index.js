#!/usr/bin/env node
// The built-in module provides utilities for working with paths.
const { resolve } = require('path');

// Portable (Windows/Linux/OS X) implementation of Unix shell
// commands on top of the Node.js API.
const { echo, exec, test } = require('shelljs');

// The process.argv property returns an array containing the command
// line arguments passed when the Node.js process was launched.
const [, , name, ...args] = process.argv;

// Generate the path to script using the name specified in process.argv.
const scriptPath = resolve(__dirname, name, 'index.js');

// Verify whether the script is exist.
test('-f', scriptPath)
  ? // Execute script using the Node.js
    exec(`node ${scriptPath} ${args.join(' ')}`)
  : // Print an error message to stdout.
    echo('Please specify correct script name');
