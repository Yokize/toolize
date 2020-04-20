// Utilities to create and execute commands.
const { bin, exec, eslintConfig } = require('../exec');

// Execute the ESLint for source and test files.
exec('Linting', `${bin('eslint')} -c ${eslintConfig(__dirname)} {lib,test}/**/*.ts`);
