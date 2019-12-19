#!/usr/bin/env node
const path = require('path');

// Execute across different OS.
const shelljs = require('shelljs');

// Execute typescript compiler.
shelljs.exec(`tsc -p ${path.resolve(shelljs.pwd().toString(), 'tsconfig.json')}`);
