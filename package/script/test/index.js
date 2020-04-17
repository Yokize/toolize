// Customizable spinner for use in the terminal, which notifies
// about the start and progress of child processes.
const ora = require('ora');

// Locate the executable of the node module, which is installed
// in the local `node_modules/.bin` or parent directory.
const which = require('npm-which');

// Utilities for working with file and directory paths, which
// depends on the operating system where Node.js is running.
const { resolve } = require('path');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { exec, echo } = require('shelljs');

// The default execution options and callback used to start the
// child process, configure it and manage the result.
const { execOptions, execCallback } = require('../exec');

// Create and start the spinner, which informs the developers
// about the start and completion of the child process.
const notify = ora('Testing').start();

// The `process.argv` returns an array containing the command line
// arguments passed when the Node.js process was launched.
const [, , ...args] = process.argv;

// Create an absolute path to the command executable, which is
// installed in the local or global directory.
const jest = which(__dirname).sync('jest');

// Create an absolute path to Jest configuration, which is part of
// the current package.
const jestConfigPath = resolve(__dirname, 'jest.config.js');

// The execution callback which receives the child process exit code,
// stdout, stderr and informs the testing results.
const jestCallback = (code, stdout, stderr) => {
  // The default execution callback with exit code, stdout & stderr.
  execCallback(notify)(code, stdout, stderr);

  // After a successful completion, print the reporter's output.
  if (code === 0) echo(stdout);
};

// Execute Jest with the command line arguments.
exec(`${jest} -c ${jestConfigPath} ${args.join(' ')}`, execOptions, jestCallback);
