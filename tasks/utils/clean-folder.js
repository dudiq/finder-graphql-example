const fs = require('fs');
const fse = require('fs-extra');

module.exports = function (path, onDone, onError) {
    fse.emptyDir(path, function (err) {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        if (!err) {
            onDone && onDone();
        } else {
            onError && onError();
        }
    });

};
