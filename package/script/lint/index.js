#!/usr/bin/env node
const { resolve } = require('path');

// Execute across OS.
const { echo, exec } = require('shelljs');

// Notify at console.
echo('Execution: Lint');

// Execute linter for ts files.
exec(`eslint -c ${resolve(__dirname, '.eslintrc.yml')} {lib,test}/**/*.ts`);
