#!/usr/bin/env node
// Utilities for working with paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js API.
const { echo, exec } = require('shelljs');

// Print an informative message to stdout.
echo('Execution: Lint');

// Execute linter for typescript files.
exec(`eslint -c ${resolve(__dirname, '.eslintrc.yml')} {lib,test}/**/*.ts`);
