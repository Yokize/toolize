// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { echo } = require('shelljs');

// ANSI escape code are standard for in-band signaling to control
// the colors and other options on text terminals.
const { red, green } = require('ansi-colors');

// The default execution options to run the command asynchronously,
// without blocking the Node.js event loop, and prevent any output
// to the console.
exports.execOptions = { async: true, silent: true };

// The default execution callback which receives the child process
// exit code, stdout, stderr and informs the developer the completion
// status and result.
exports.execCallback = (notify) => (code, stdout, stderr) => {
  // Based on the exit code, inform the developer about successful or
  // failed execution of the command.
  code === 0 ? notify.succeed(green(notify.text)) : notify.fail(red(notify.text));

  // In case the child process fails, print the output to the console
  // and exit with the same code.
  if (code > 0) echo(stderr || stdout) && process.exit(code);
};
