#!/usr/bin/env node
// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { test } = require('shelljs');

// Utilities for working with file and directory paths, which vary
// depending on the operating system where Node.js is running.
const { resolve } = require('path');

// Utility to immediately stop the running process with a non-zero
// code and print out the specified message to stdout.
const { throwError } = require('./exec');

// The `process.argv` returns an array containing the command line
// arguments passed when the Node.js process was launched.
const [, , name] = process.argv;

// Create an absolute path to the root file of the script by using
// the name specified in the process arguments.
const script = resolve(__dirname, name, 'index.js');

// Ensure the existence of the script, which is part of the current
// node package and can be executed by Node.js.
test('-f', script)
  ? // Execute the script via Node.js module system.
    require(script)
  : // Inform the developer that there is no such script.
    throwError('Please specify the correct script name');
