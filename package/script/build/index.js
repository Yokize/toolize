#!/usr/bin/env node
const path = require('path');

// ShellJS used to execute commands across OS.
const shelljs = require('shelljs');

// Execute TS compiler.
shelljs.exec(`tsc -p ${path.resolve(shelljs.pwd().toString(), 'tsconfig.json')}`);
