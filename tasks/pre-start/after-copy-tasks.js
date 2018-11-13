const logs = require('../utils/logging');
const fse = require('fs-extra');
const consts = require('../utils/const');

const distFolder = consts.distFolder;
const sourceFolder = consts.defaultSource;

function copydebConf() {
    fse.copy(sourceFolder + '/configs/debConf.blank.js', distFolder + '/configs/debConf.js');
}

module.exports = [
    copydebConf,
];
