module.exports = {
    done: function (...args) {
        args.splice(0, 0, ' \x1b[33m%s\x1b[0m', '[ok]');
        args.push('\x1b[0m');
        console.log.apply(console, args);
    },
    fail: function (...args) {
        args.splice(0, 0, ' \x1b[41m', '[fail]');
        args.push('\x1b[0m');
        console.log.apply(console, args);
    },
};
