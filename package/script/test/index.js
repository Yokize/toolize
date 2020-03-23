// Utilities to manipulate paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js
const { exec } = require('shelljs');

// Arguments passed to the Node.js process.
const [, , ...args] = process.argv;

// Execute Jest with the cli arguments.
exec(`jest -c ${resolve(__dirname, 'jest.config.js')} ${args.length ? args.join(' ') : ''}`);
