// Customizable spinner for use in the terminal, which notifies
// about the start and progress of child processes.
const ora = require('ora');

// Locate the executable of the node module, which is installed
// in the local `node_modules/.bin` or parent directory.
const which = require('npm-which');

// Utilities for working with file and directory paths, which
// depends on the operating system where Node.js is running.
const { resolve } = require('path');

// ANSI escape code are standard for in-band signaling to control
// the colors and other options on text terminals.
const { red } = require('ansi-colors');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { exec, pwd, test } = require('shelljs');

// The default execution options and callback used to start the
// child process, configure it and manage the result.
const { execOptions, execCallback } = require('../exec');

// Create and start the spinner, which informs the developers
// about the start and completion of the child process.
const notify = ora('Doc').start();

// Create an absolute path to the command executable, which is
// installed in the local or global directory.
const typeDoc = which(__dirname).sync('typeDoc');

// Create an absolute path to TypeScript configuration based on
// the current working directory.
const tsConfigPath = resolve(pwd().toString(), 'tsconfig.json');

// Ensure the existence of TypeScript configuration.
test('-f', tsConfigPath)
  ? // Execute the typeDoc with configuration.
    exec(typeDoc, execOptions, execCallback(notify))
  : // Inform the developer about the missing tsconfig.
    notify.fail(red('The project directory does not contain tsconfig'));
