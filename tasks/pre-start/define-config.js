const fs = require('fs');
const logs = require('../utils/logging');
const argvOpt = require('../utils/get-argv-options');
const sourcePath = require('../utils/get-source');

const config = sourcePath + 'configs/config.js';
const configDev = sourcePath + 'configs/config.dev.js';
const configlocal = sourcePath + 'configs/config.local.js';

const confName = argvOpt['--conf'] || '';

if (confName) {
    const newName = `${sourcePath}configs/config.${confName}.js`;
    fs.writeFileSync(config, fs.readFileSync(newName));
    logs.done(`using [${confName}] config`);
} else {
    if (!fs.existsSync(config)){
        // as dev way
        if (fs.existsSync(configlocal)){
            // from LOCAL config
            fs.writeFileSync(config, fs.readFileSync(configlocal));
            logs.done(`using [LOCAL] config`);
        } else {
            // from DEV config
            fs.writeFileSync(config, fs.readFileSync(configDev));
            logs.done(`using [DEV] config`);
        }
    }
}
