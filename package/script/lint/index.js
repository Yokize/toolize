// Utilities to manipulate paths.
const { resolve } = require('path');

// Unix shell commands on top of Node.js
const { exec } = require('shelljs');

// Execute linter for TypeScript files.
exec(`eslint -c ${resolve(__dirname, '.eslintrc.yml')} {lib,test}/**/*.ts`);
