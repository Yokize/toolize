#!/usr/bin/env node
const path = require('path');

// Execute across different OS.
const shelljs = require('shelljs');

// Execute linter for ts files.
shelljs.exec(`eslint -c ${path.resolve(__dirname, '.eslintrc.yml')} {lib,test}/**/*.ts`);
