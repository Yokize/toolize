// Utilities for working with file and directory paths, which
// depends on the operating system where Node.js is running.
const { resolve } = require('path');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { pwd, test } = require('shelljs');

// A map from regular expressions to module names that allow to stub
// out resources and support aliases. Modules that are mapped to an
// alias are unmocked by default, regardless of whether automocking
// is enabled or not.
let moduleNameMapper = {};

// A list of paths to modules that run code to configure or set up
// the testing framework before running each test file.
let setupFilesAfterEnv = [];

// The default directory where tests are located based on the current
// working directory.
const testDir = `${pwd().toString()}/test`;

// The default path to the setup file which will be executed before
// each test file.
const setupFile = resolve(testDir, 'setup.ts');

// Confirm the need to run the setup file depending on its existence.
if (test('-f', setupFile)) setupFilesAfterEnv = [setupFile];

// Create an absolute path to TypeScript configuration based on the
// current working directory.
const tsConfigPath = resolve(testDir, 'tsconfig.json');

// Confirm the need to setup the compiler depending on configs existence.
if (test('-f', tsConfigPath)) {
  // Options defined by the developer and used with the compiler.
  const { compilerOptions } = require(tsConfigPath);

  // A helper to convert TypeScript aliases to Jest mapper.
  const { pathsToModuleNameMapper } = require('ts-jest/utils');

  // Convert aliases to Jest mapper with the rootDir prefix.
  moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  });
}

// Delightful JavaScript Testing Framework with focus on simplicity.
// © Jest <https://jestjs.io>
module.exports = {
  // Root directory to search for tests and modules.
  rootDir: pwd().toString(),

  // Indicates whether the coverage should be collected during the testing.
  collectCoverage: true,

  // Patterns to detect files for which coverage needs to be collected.
  collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],

  // Global variables that are available in all test environments.
  globals: {
    'ts-jest': {
      // tsConfig used by tsJest.
      tsConfig: tsConfigPath,
      // Compile the files separately.
      isolatedModules: true,
      // Package.json used by tsJest.
      packageJson: '<rootDir>/package.json'
    }
  },

  // Module name mapper that allows to support aliases and
  // stub out resources.
  moduleNameMapper,

  // Automatically reset mock state between each test.
  resetMocks: true,

  // Automatically reset module registry for each test file.
  resetModules: true,

  // Run the code to setup testing before each test.
  setupFilesAfterEnv,

  // Patterns to detect test files to be executed.
  testRegex: ['/test/(unit|e2e)/.*\\.ts$'],

  // Synchronous function for source file transformation.
  transform: require('ts-jest/presets').defaults.transform
};
