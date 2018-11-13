const log = require('../utils/logging');
const clearFolder = require('../utils/clean-folder');
const sourcePath = require('../utils/get-source');

const dir = sourcePath + 'generated';

clearFolder(dir, function () {
    log.done('generated folder is clean');
}, function () {
    log.done('nothing to clean');
});
