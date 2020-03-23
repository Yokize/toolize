// Terminal output style.
const { red } = require('chalk');

// Utilities to manipulate paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js
const { echo, exec, pwd, test } = require('shelljs');

// Path to configs based on the working directory.
const tsConfigPath = resolve(pwd().toString(), 'tsconfig.json');

// Ensure the existence of the configs file.
test('-f', tsConfigPath)
  ? // Execute the compiler with configs.
    exec(`tsc -p ${tsConfigPath}`)
  : // Print an error message to stdout.
    echo(red('The project directory does not contain tsconfig'));
