// Utilities for searching files by pattern.
const globby = require('globby');

// Utilities for working with file and directory paths, which
// depends on the operating system where Node.js is running.
const { resolve } = require('path');

// Executor and REPL for Node.js. TsNode will resolve the compiler
// from `cwd` before checking relative to its own installation.
const tsExecutor = require('ts-node');

// ANSI escape code are standard for in-band signaling to control
// the colors and other options on text terminals.
const { red } = require('ansi-colors');

// Load modules at runtime whose location is specified in the path
// section of tsconfig.json
const tsLoader = require('tsconfig-paths');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { echo, pwd, test } = require('shelljs');

// The default directory where performance tests are located based
// on the current working directory
const testDir = `${pwd().toString()}/test`;

// Create the path to TypeScript configuration based on the testing
// directory and use it in context of testing.
const tsConfigPath = resolve(testDir, 'tsconfig.json');

// Ensure the existence of TypeScript configuration.
if (test('-f', tsConfigPath)) {
  // Load the compiler configuration.
  const tsConfig = tsLoader.loadConfig(tsConfigPath);

  // Register the loader as part of Node.js process.
  tsLoader.register({
    paths: tsConfig.paths,
    baseUrl: tsConfig.absoluteBaseUrl
  });

  // Register the executor as part of Node.js process.
  tsExecutor.register({ project: tsConfigPath });

  // Find all the performance tests in the testing directory.
  const files = globby.sync(resolve(testDir, 'perf', '*.ts'));

  // Ensure that at least one performance test is found.
  files.length
    ? // Load and launch all tests synchronously.
      files.forEach(require)
    : // Inform the developer about the missing tests.
      echo('There are no performance tests to run');
}
// Inform the developer about the missing tsconfig.
else echo(red('Testing directory does not contain tsconfig.json'));
