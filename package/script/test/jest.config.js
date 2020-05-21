// Utilities for working with file and directory paths, which vary
// depending on the operating system where Node.js is running.
const { resolve } = require('path');

// Implementation of Unix shell commands on top of Node.js, which
// eliminates shell script's dependency on Unix while keeping its
// familiar and powerful commands.
const { pwd, test } = require('shelljs');

// Utilities replicating TypeScript's default behaviour to resolve,
// read and parse tsconfig.json (support `extends` field).
const { tsconfigResolverSync } = require('tsconfig-resolver');

// Utility to transform configured path mapping from TypeScript
// configuration to the Jest module name mapper format.
const { pathsToModuleNameMapper } = require('ts-jest/utils');

// Utility to create an absolute path to TypeScript configuration
// and verify its existence in the specified directory.
const { tsConfig } = require('../exec');

// The directory from which the current process (script) have been
// started and used to search for other files and configurations.
const rootDir = pwd().toString();

// Create an absolute path to the default directory which contains
// test specifications. Path created based on the root directory.
const testDir = `${rootDir}/test`;

// Create an absolute path to the TypeScript configuration, which
// is located under the default testing directory. During path
// creation, the existence of the file will be verified.
const tsConfigPath = tsConfig(testDir);

// Create an absolute path to the environment setup script, which
// is located under the default testing directory.
const setupScript = resolve(testDir, 'setup.ts');

// Defined compiler options which are used by `ts-jest' and Jest
// to support test specifications with Typescript syntax.
const { compilerOptions } = tsconfigResolverSync(tsConfigPath).config;

// Delightful JavaScript Testing Framework with focus on simplicity.
// © Jest <https://jestjs.io>
module.exports = {
  // Root directory to search for modules to be tested and test
  // specifications to be executed.
  rootDir,

  // Indicates whether the test coverage information should be
  // collected and reported in the output.
  collectCoverage: true,

  // A glob pattern relative to matching the files that coverage
  // info needs to be collected from.
  collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],

  // A set of global variables that should be available in all
  // test environments and can be used to configure plugins.
  globals: {
    'ts-jest': {
      // tsconfig.json used to compile test specifications.
      tsConfig: tsConfigPath,
      // Compile each file separately without type-checking.
      isolatedModules: true,
      // package.json used by tsJest to get package metadata.
      packageJson: '<rootDir>/package.json'
    }
  },

  // Automatically reset mock state before every test. Equivalent
  // to calling jest.resetAllMocks() before each test. This will
  // lead to any mocks having their fake implementations removed
  // but does not restore their initial implementation.
  resetMocks: true,

  // Each test file gets its own independent module registry.
  // Enabling resetModules goes a step further and resets the module
  // registry before running each individual test. This is useful
  // to isolate modules for every test so that local module state
  // doesn't conflict between tests.
  resetModules: true,

  // Configuration option to add custom reporters to Jest. A custom
  // reporter is a class that implements onRunStart, onTestStart,
  // onTestResult, onRunComplete methods that will be called when
  // any of those events occurs.
  reporters: ['jest-standard-reporter'],

  // Transformer is a module which provides a synchronous function
  // for transforming source files and test specifications.
  transform: require('ts-jest/presets').defaults.transform,

  // List of paths to modules that run code to configure or set up
  // the testing framework before each test file in the suite is
  // executed.
  setupFilesAfterEnv: test('-f', setupScript) ? [setupScript] : [],

  // Map from regular expressions to module names, which allow to
  // stub out resources or support the aliases.
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>'
  })
};
