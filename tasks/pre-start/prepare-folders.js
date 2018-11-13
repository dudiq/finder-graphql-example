const fs = require('fs');
const argvOpt = require('../utils/get-argv-options');
const cleanFolder = require('../utils/clean-folder');
const logs = require('../utils/logging');
const fse = require('fs-extra');
const consts = require('../utils/const');
const afterCopyList = require('./after-copy-tasks');

const distFolder = consts.distFolder;
const sourceFolder = consts.defaultSource;
const buildFolder = consts.buildFolder;

cleanFolder(consts.cache, function () {
    //done
    logs.done('./cache is clean');

    cleanFolder(distFolder, function(){

        logs.done(distFolder + ' is clean');
        // prepare bundle, dist folders
        if (argvOpt.isProd) {
            fse.copySync(sourceFolder, distFolder);

            cleanFolder(buildFolder, function(){
                logs.done(buildFolder + ' is clean');
                afterCopyList.forEach((item) => {
                    item();
                });
            }, function (e) {
                logs.fail('something wrong with cleaning "./bundle" folder');
                process.exit(1);
            });
        }

    }, function (e) {
        logs.fail('something wrong with cleaning "./dist" folder');
        process.exit(1);
    });

}, function (e) {
    logs.fail('something wrong with cleaning "./cache" folder');
    process.exit(1);
});
