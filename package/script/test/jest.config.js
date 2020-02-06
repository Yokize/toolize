// Portable (Windows/Linux/OS X) implementation of Unix shell
// commands on top of the Node.js API.
const { pwd, test } = require('shelljs');

// Preset that is used as a base for Jest's configuration. tsJest will take
// care of .ts and .tsx files only, leaving JavaScript files as-is.
const { defaults: tsPreset } = require('ts-jest/presets');

// Setup before tests.
let setupFilesAfterEnv = [];

// Module name mapper.
let moduleNameMapper = {};

// Execution working directory.
const rootDir = pwd().toString();

// Path to tsconfig.json used for tests.
const tsConfigPath = `test/tsconfig.json`;

// Verify whether need to setup before tests.
if (test('-f', `${rootDir}/test/setup.ts`)) {
  setupFilesAfterEnv = ['<rootDir>/test/setup.ts'];
}

// Verify whether need to setup typescript mapper.
if (test('-f', `${rootDir}/${tsConfigPath}`)) {
  // Ts compiler configuration.
  const { compilerOptions } = require(`${rootDir}/${tsConfigPath}`);

  // Transform the mapping from tsconfig to Jest config format.
  const { pathsToModuleNameMapper } = require('ts-jest/utils');

  // Jest module mapper configuration.
  moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  });
}

// Delightful JavaScript Testing Framework with a focus on simplicity.
// © Jest <https://jestjs.io>
module.exports = {
  // Root directory to scan for tests and modules.
  rootDir,

  // Indicates whether the coverage information should
  // be collected while executing the test.
  collectCoverage: true,

  // Patterns to detect files for which coverage information
  // should be collected.
  collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],

  // Global variables available in all test environments.
  globals: {
    // tsJest configuration.
    'ts-jest': {
      // Compile files separately.
      isolatedModules: true,
      // tsConfig used to compile test files.
      tsConfig: `<rootDir>/${tsConfigPath}`,
      // Package.json used by tsJest.
      packageJson: '<rootDir>/package.json'
    }
  },

  // Map from regular expressions to module names that
  // allow to stub out resources.
  moduleNameMapper,

  // Automatically reset mock state between every test.
  resetMocks: true,

  // Automatically reset module registry for every test file.
  resetModules: true,

  // Run code to configure the testing before each test.
  setupFilesAfterEnv,

  // Synchronous function for transforming source files.
  transform: tsPreset.transform,

  // Patterns to detect test files.
  testRegex: ['/test/(unit|e2e)/.*\\.ts$']
};
