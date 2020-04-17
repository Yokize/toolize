#!/usr/bin/env node
// Utilities for working with file and directory paths, which
// depends on the operating system where Node.js is running.
const { resolve } = require('path');

// ANSI escape code are standard for in-band signaling to control
// the colors and other options on text terminals.
const { red } = require('ansi-colors');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { echo, test } = require('shelljs');

// The `process.argv` returns an array containing the command line
// arguments passed when the Node.js process was launched.
const [, , name] = process.argv;

// Create an absolute path to the script with the given name, which
// is part of the current package.
const scriptPath = resolve(__dirname, name, 'index.js');

// Ensure the existence of the script, which can be executed by Node.js.
test('-f', scriptPath)
  ? // Execute the script using Node.js module system.
    require(scriptPath)
  : // Inform the developer that there is no such script.
    echo(red('Please specify the correct script name'));
