const argvOpt = require('./get-argv-options');
const consts = require('./const');

let source = consts.defaultSource;

if (argvOpt.hasOwnProperty('--is-prod')) {
    source = consts.distFolder;
}
module.exports = source;
