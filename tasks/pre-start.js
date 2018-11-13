const runScripts = require('./utils/run-script-list');

runScripts([
    'pre-start/prepare-folders',
    'pre-start/define-config',
    'pre-start/clean-generated',
    'pre-start/version',
]);
