#!/usr/bin/env node
const path = require('path');

// ShellJS used to execute commands across OS.
const shelljs = require('shelljs');

// Execute linter for all ts files.
shelljs.exec(`eslint -c ${path.resolve(__dirname, '.eslintrc.yml')} **/*.ts`);
