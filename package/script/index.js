#!/usr/bin/env node
// Terminal output style.
const { red } = require('chalk');

// Utilities to manipulate paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js.
const { echo, test } = require('shelljs');

// Arguments passed to the Node.js process.
const [, , name] = process.argv;

// Path to the script using given name.
const script = resolve(__dirname, name, 'index.js');

// Ensure the existence of the executable script.
test('-f', script)
  ? // Execute the script using Node.js
    require(script)
  : // Print an error message to stdout.
    echo(red('Please specify the correct script name'));
