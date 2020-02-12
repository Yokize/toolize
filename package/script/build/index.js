#!/usr/bin/env node
// Utilities for working with paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js API.
const { echo, exec, pwd, test } = require('shelljs');

// Generate path to tsconfig.json based on working directory.
const tsConfigPath = resolve(pwd().toString(), 'tsconfig.json');

// Print an informative message to stdout.
echo('Execution: Build');

// Verify whether tsconfig.json exist.
test('-f', tsConfigPath)
  ? // Execute typescript compiler.
    exec(`tsc -p ${tsConfigPath}`)
  : // Print an error message to stdout.
    echo('Project directory do not contain tsconfig.json');
