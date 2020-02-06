#!/usr/bin/env node
// The built-in module provides utilities for working with paths.
const { resolve } = require('path');

// Portable (Windows/Linux/OS X) implementation of Unix shell
// commands on top of the Node.js API.
const { echo, exec, pwd, test } = require('shelljs');

// Generate a path to tsconfig.json based on the working directory.
const tsConfigPath = resolve(pwd().toString(), 'tsconfig.json');

// Print a message to stdout.
echo('Execution: Build');

// Verify whether tsconfig.json exist.
test('-f', tsConfigPath)
  ? // Execute typescript compiler.
    exec(`tsc -p ${tsConfigPath}`)
  : // Print an error message to stdout.
    echo('Project directory do not contain tsconfig.json');
