#!/usr/bin/env node
// The built-in module provides utilities for working with paths.
const { resolve } = require('path');

// Portable (Windows/Linux/OS X) implementation of Unix shell
// commands on top of the Node.js API.
const { echo, exec } = require('shelljs');

// Print a message to stdout.
echo('Execution: Lint');

// Execute linter for ts files.
exec(`eslint -c ${resolve(__dirname, '.eslintrc.yml')} {lib,test}/**/*.ts`);
