// read `git.commit` file, if .git is not available

const fs = require('fs');
const cp = require('child_process');
const logs = require('../utils/logging');
const pkg = require('../../package');
const sourcePath = require('../utils/get-source');

function getChangeset(str) {
    const lines = str.split("\n");
    let changeset = '';
    for (let i = 0, l = lines.length; i < l; i++) {
        let item = lines[i];
        if (item.indexOf('commit') === 0) {
            let sets = item.split(" ");
            changeset = sets[sets.length - 1];
            break;
        }
    }
    return changeset;
}

function emptyWrite() {
    logs.done('change set is not found, writing empty change set');
    writeBuildModule('');
}

function writeBuildModule(changeset) {
    const buildTime = new Date();
    const content =

        `// //autogenerated by /version.js PLEASE, DO NOT MODIFY!!!
const buildVersion = {
    version: '${pkg.version}',
    changeset: '${changeset}',
    buildTime: new Date(${buildTime.getTime()}), // '${buildTime.toString()}',   
};
export default buildVersion;

`;

    fs.writeFile(sourcePath + 'generated/build.version.auto.js', content, (err) => {
        if (!err) {
            logs.done(sourcePath + 'generated/build.version.auto.js is created');
        } else {
            logs.fail("can't create source/build.version.auto.js, something goes wrong...");
            console.error(err);
            process.exit(1);
        }
    });

}

function readCommitFile() {
    fs.readFile('./git.commit', (err, data) => {
        if (err) {
            emptyWrite();
        } else {
            const value = data.toString();
            const str = getChangeset(value);
            logs.done(`using git.commit file. changeset: ${str}`);
            writeBuildModule(str);
        }
    });
}

function getBuildInfo() {
    // git log -1 | head -n 1 | sed 's/commit //'
    let dataProcess = cp.spawn('git', ['log', '-1'], {
        silent: false,
    });

    dataProcess.stdout.on('data', (data) => {
        const str = data.toString();
        const changeset = getChangeset(str);
        logs.done(`using git cli. changeset: ${changeset}`);
        writeBuildModule(changeset);
    });

    // process default error
    dataProcess.stderr.on('data', (data) => {
        // no git, or error processed
        // try read defined file
        readCommitFile();
    });
}

getBuildInfo();
