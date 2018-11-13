const childProcess = require('child_process');

const argv = process.argv.slice(2);

function runScript(scriptPath) {
    return new Promise(function (resolve, reject) {
        // keep track of whether callback has been invoked to prevent multiple invocations
        let invoked = false;

        const process = childProcess.fork(scriptPath, argv);

        // listen for errors as they may prevent the exit event from firing
        process.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            err ?
                resolve() :
                reject(err);
        });

        // execute the callback once the process has finished running
        process.on('exit', function (code) {
            if (invoked) return;
            invoked = true;
            const isErr = (code === 0);
            const err = isErr ? null : new Error('exit code ' + code);
            isErr ?
                resolve() :
                reject(err);
        });
    });
}


function batch(scripts) {
    if (scripts.length) {
        let scriptPath = scripts.splice(0, 1);
        if (scriptPath) {
            scriptPath = './tasks/' + scriptPath + '.js';
            runScript(scriptPath)
                .then(function () {
                    batch(scripts);
                });
        }
    }
}

module.exports = batch;
