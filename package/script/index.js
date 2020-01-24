#!/usr/bin/env node
const { resolve } = require('path');

// Execute across OS.
const { echo, exec } = require('shelljs');

// Script and cli args.
const [, , script, ...args] = process.argv;

// Verify whether name is provided.
if (!script) return echo('Please specify script');

// Execute script using the Node.js
exec(`node ${resolve(__dirname, script)} ${args.join(' ')}`);
