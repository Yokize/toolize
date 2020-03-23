// Utilities to manipulate paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js.
const { pwd, test } = require('shelljs');

// Module name mapper.
let moduleNameMapper = {};

// Setting up before testing.
let setupFilesAfterEnv = [];

// Path to testing directory.
const testDir = `${pwd().toString()}/test`;

// Path to setup file which is executed before testing.
const setupFile = resolve(testDir, 'setup.ts');

// Confirm the need to run setup file based on its existence.
if (test('-f', setupFile)) setupFilesAfterEnv = [setupFile];

// Path to configs used by the TypeScript compiler.
const tsConfigPath = resolve(testDir, 'tsconfig.json');

// Confirm the need to setup compiler based on configs existence.
if (test('-f', tsConfigPath)) {
  // Defined options used by the compiler.
  const { compilerOptions } = require(tsConfigPath);

  // Transform TypeScript paths to Jest mapper.
  const { pathsToModuleNameMapper } = require('ts-jest/utils');

  // Jest module mapper with the rootDir prefix.
  moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  });
}

// Delightful JavaScript Testing Framework with focus on simplicity.
// © Jest <https://jestjs.io>
module.exports = {
  // Root directory to scan tests and modules.
  rootDir: pwd().toString(),

  // Indicates whether coverage should be collected during testing.
  collectCoverage: true,

  // Patterns to detect files for which coverage needs to be collected.
  collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],

  // Global variables available in all test environments.
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

  // Module name mapper that allow to stub out resources.
  moduleNameMapper,

  // Automatically reset mock state between each test.
  resetMocks: true,

  // Automatically reset module registry for each test file.
  resetModules: true,

  // Run the code to setup testing before each test.
  setupFilesAfterEnv,

  // Patterns to detect test files.
  testRegex: ['/test/(unit|e2e)/.*\\.ts$'],

  // Synchronous function for transforming source files.
  transform: require('ts-jest/presets').defaults.transform
};
