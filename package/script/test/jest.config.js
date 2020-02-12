// Unix shell commands on top of Node.js API.
const { pwd, test } = require('shelljs');

// Preset used as base for Jest's configuration.
const { defaults: tsPreset } = require('ts-jest/presets');

// Module name mapper.
let moduleNameMapper = {};

// Setup before tests.
let setupFilesAfterEnv = [];

// Execution working directory.
const rootDir = pwd().toString();

// Setup file executed before tests.
const setupFile = 'test/setup.ts';

// tsconfig.json used for typescript.
const tsConfig = 'test/tsconfig.json';

// Verify whether execute setup file before tests.
if (test('-f', `${rootDir}/${setupFile}`)) {
  setupFilesAfterEnv = [`<rootDir>/${setupFile}`];
}

// Verify whether need to setup typescript mapper.
if (test('-f', `${rootDir}/${tsConfig}`)) {
  // Typescript compiler options.
  const { compilerOptions } = require(`${rootDir}/${tsConfig}`);

  // Transformer to Jest config format.
  const { pathsToModuleNameMapper } = require('ts-jest/utils');

  // Jest module mapper configuration.
  moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  });
}

// Delightful JavaScript Testing Framework with focus on simplicity.
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
      tsConfig: `<rootDir>/${tsConfig}`,
      // Package.json used by tsJest.
      packageJson: '<rootDir>/package.json'
    }
  },

  // Map from regular expressions to module names that allow
  // to stub out resources.
  moduleNameMapper,

  // Automatically reset mock state between every test.
  resetMocks: true,

  // Automatically reset module registry for every test file.
  resetModules: true,

  // Run code to setup the testing before each test.
  setupFilesAfterEnv,

  // Transforming source files.
  transform: tsPreset.transform,

  // Patterns to detect test files.
  testRegex: ['/test/(unit|e2e)/.*\\.ts$']
};
