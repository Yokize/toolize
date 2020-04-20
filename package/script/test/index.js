// Utilities to create and execute commands.
const { bin, exec, jestConfig } = require('../exec');

// The `process.argv` returns an array containing the command line
// arguments passed when the Node.js process was launched.
const [, , ...args] = process.argv;

// Execute the Jest with the default configs and command line arguments.
exec('Testing', `${bin('jest')} -c ${jestConfig(__dirname)} ${args.join(' ')}`);
