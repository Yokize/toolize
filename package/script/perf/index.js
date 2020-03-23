// Terminal output style.
const { red } = require('chalk');

// Utilities to search files.
const globby = require('globby');

// Utilities to manipulate paths.
const { resolve } = require('path');

// Executor and REPL for Node.js
const tsExecutor = require('ts-node');

// Loader to support the ts paths.
const tsLoader = require('tsconfig-paths');

// Unix shell commands on top of Node.js
const { echo, pwd, test } = require('shelljs');

// Path to performance testing directory.
const testDir = `${pwd().toString()}/test`;

// Path to configs used by the compiler.
const tsConfigPath = resolve(testDir, 'tsconfig.json');

// Ensure the existence of TypeScript configs.
if (test('-f', tsConfigPath)) {
  // Compiler configuration.
  const tsConfig = tsLoader.loadConfig(tsConfigPath);

  // Register loader as part of Node.js process.
  tsLoader.register({
    paths: tsConfig.paths,
    baseUrl: tsConfig.absoluteBaseUrl
  });

  // Register executor as part of Node.js process.
  tsExecutor.register({ project: tsConfigPath });

  // Find all the performance tests.
  const files = globby.sync(resolve(testDir, 'perf', '*.ts'));

  // Ensure the performance tests are found.
  files.length
    ? // Load and execute synchronously tests.
      files.forEach(require)
    : // Print the message to stdout.
      echo('There are no performance tests to run');
}
// Print an error message to stdout.
else echo(red('Testing directory does not contain tsconfig.json'));
