// Customizable spinner for use in the terminal, which notifies
// about the start and progress of child process.
const ora = require('ora');

// Utility to locate the module executable, which is installed in
// the local `node_modules/.bin` or parent directory.
const which = require('npm-which');

// Utilities for working with file and directory paths, which vary
// depending on the operating system where Node.js is running.
const { resolve } = require('path');

// ANSI escape code are standard for in-band signaling to control
// the colors, cursor and other options on text terminals.
const { red, green } = require('ansi-colors');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { echo, exec, pwd, test } = require('shelljs');

// The `process.env' can contain CI or SILENT environment variable
// which disable output of completed process to stdout.
const isSilent = process.env.CI || process.env.SILENT;

// The default execution callback which receives the child process
// exit code, stdout, stderr and informs about the status and output.
const execCallback = (notify, callback) => (code, stdout, stderr) => {
  // Based on the exit code of the completed child process, informs
  // developers about successful or failed execution of the command.
  if (notify) code === 0 ? notify.succeed(green(notify.text)) : notify.fail(red(notify.text));

  // In case the child process terminated with non-zero code, print
  // out the error and exit the script with the same code.
  if (code > 0) echo(stderr || stdout) && process.exit(code);

  // In case the child process was successfully completed and output
  // was not disabled by environment variable, print output to stdout.
  if (code === 0 && !isSilent) echo(stdout);

  // In case the callback is provided, execute it with the exit code,
  // stdout, stderr at the completion of the child process.
  if (callback) callback(code, stdout, stderr);
};

// Create a path to the file based on the provided directory path and
// file name with additional verification of its existence.
const filePath = (dir, file) => {
  // Resolve the path using the provided or defaulted directory path.
  const path = resolve(dir || pwd().toString(), file);

  // Returns the created path in case the file exists, in another
  // case informs the developers about the invalid file path.
  return test('-f', path) ? path : throwError(`The directory does not contain ${file}`);
};

// Create an absolute path to the executable module of the command,
// which is installed in the local or global directory.
exports.bin = (name) => which(__dirname).sync(name);

// Run the provided command asynchronously, monitor and inform about
// the progress and outcome of its execution.
exports.exec = (name, command, callback) => {
  // Create and start the spinner, which informs the developers
  // about the start and completion of the command.
  const notify = isSilent ? null : ora(`${name}\n`).start();

  // Spawns a shell then executes the command within that shell,
  // buffering any generated output.
  exec(command, { async: true, silent: true }, execCallback(notify, callback));
};

// Create an absolute path to TypeScript configs file and verify
// its existence in the specified or default directory.
exports.tsConfig = (dir) => filePath(dir, 'tsconfig.json');

// Create an absolute path to Jest configs file and verify its
// existence in the specified or default directory.
exports.jestConfig = (dir) => filePath(dir, 'jest.config.js');

// Create an absolute path to ESLint configs file and verify its
// existence in the specified or default directory.
exports.eslintConfig = (dir) => filePath(dir, '.eslintrc.yml', dir);

// Immediately stop the running process with a non-zero code and
// print out the specified message to stdout.
exports.throwError = (message) => {
  // Print the colorful error message to stdout.
  echo(red(message));

  // Immediately exit process with a non-zero code.
  process.exit(1);
};
