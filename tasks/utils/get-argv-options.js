
const opt = process.argv.slice(2).reduce(function (obj, key) {
    const values = key.split("=");
    obj[values[0]] = values[1];
    return obj;
}, {});

opt.isProd = opt.hasOwnProperty('--is-prod');

module.exports = opt;
