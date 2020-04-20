// Utility to search for existing paths by comparing the glob-style
// patterns against directories and files.
const globby = require('globby');

// Utilities for working with various asynchronous operations in
// the straight forward approach, similar to `lodash`.
const each = require('async/each');

// Utilities for working with file and directory paths, which vary
// depending on the operating system where Node.js is running.
const { resolve } = require('path');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { echo, pwd } = require('shelljs');

// Utilities to create and verify an absolute path to the configs,
// find the executable of the module and execute the command.
const { bin, exec, tsConfig } = require('../exec');

// Create an absolute path to the default directory which contains
// test specifications. The path created based on the `pwd`.
const testDir = `${pwd().toString()}/test`;

// Search for all performance test specifications by pattern, which
// is located under the default testing directory.
const perf = globby.sync(resolve(testDir, 'perf', '*.ts'));

// Create the command which execute the individual performance test
// using `ts-node` with support of TypeScript paths.
const command = (path) => `${bin('ts-node')} -r tsconfig-paths/register\
  --project ${tsConfig(testDir)} ${path}`;

// Ensure there is at least one test that can be executed by Node.js
perf.length
  ? // Iterate the found tests and execute them sequentially.
    each(perf, (path, callback) => exec('Performance', command(path), callback))
  : // Inform the developer about the missing performance tests.
    echo('There are no performance tests to run');
