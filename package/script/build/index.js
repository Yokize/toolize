#!/usr/bin/env node
const { resolve } = require('path');

// Execute across OS.
const { echo, exec, pwd } = require('shelljs');

// Notify at console.
echo('Execution: Build');

// Execute typescript compiler.
exec(`tsc -p ${resolve(pwd().toString(), 'tsconfig.json')}`);
