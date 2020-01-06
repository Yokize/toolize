// Execute across OS.
const { pwd, test } = require('shelljs');

// Module name mapper.
let moduleNameMapper = {};

// Setup executed before tests.
let setupFilesAfterEnv = [];

// Execution working directory.
const rootDir = pwd().toString();

// Determine whether need to setup tests.
if (test('-f', `${rootDir}/test/setup.ts`)) {
  setupFilesAfterEnv = ['<rootDir>/test/setup.ts'];
}

// Determine whether need to setup typescript.
if (test('-f', `${rootDir}/test/tsconfig.json`)) {
  // Ts compiler configuration.
  const { compilerOptions } = require(`${rootDir}/test/tsconfig.json`);

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
    'ts-jest': {
      // tsConfig used to compile test files.
      tsConfig: '<rootDir>/test/tsconfig.json'
    }
  },

  // Map from regular expressions to module names that
  // allow to stub out resources.
  moduleNameMapper,

  // Preset used as a base configuration.
  preset: 'ts-jest',

  // Automatically reset mock state between every test.
  resetMocks: true,

  // Automatically reset module registry for every test file.
  resetModules: true,

  // Patterns to detect test files.
  testRegex: ['/test/(unit|e2e)/.*\\.ts$'],

  // Run code to configure or set up the testing framework before each test.
  setupFilesAfterEnv
};
