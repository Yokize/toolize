// Utilities to create and execute commands.
const { bin, exec, tsConfig } = require('../exec');

// Execute the TypeDoc compiler with configs.
exec('Documenting', `${bin('typeDoc')} --tsconfig ${tsConfig()} --logger none`);
