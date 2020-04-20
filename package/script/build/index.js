// Utilities to create and execute commands.
const { bin, exec, tsConfig } = require('../exec');

// Execute the TypeScript compiler with configs.
exec('Building', `${bin('tsc')} --project ${tsConfig()}`);
