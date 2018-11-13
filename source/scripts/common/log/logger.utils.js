const isClient = (typeof window === 'object');

const MS_SEC = 1000;
const MS_MIN = MS_SEC * 60;
const MS_HOUR = MS_MIN * 60;

function getTimeNow() {
    return (new Date()).getTime();
}

const loggerUtils = {
    isClient,
    getTimeNow,
    getFormattedTime: function (opt, prevTime, nowTime) {
        let ret = '';
        if (opt.timeAsNow) {
            const date = new Date(nowTime);
            const h = date.getHours();
            const m = date.getMinutes();
            const s = date.getSeconds();
            const ms = date.getMilliseconds();
            ret = `${h}:${m}:${s}.${ms}`;
        } else {
            // as default
            ret = loggerUtils.getTimeInterval(prevTime, nowTime);
        }

        return ret;
    },
    getTimeInterval: function (start, end) {
        const dx = end - start;
        let time = dx;
        if (dx < MS_SEC) {
            time = dx + ' ms';
        } else if (dx < MS_MIN) {
            time = (Math.floor((dx / MS_SEC) * 100) / 100) + 's';
        } else if (dx < MS_HOUR) {
            time = (Math.floor((dx / MS_MIN) * 100) / 100) + 'm';
        } else {
            time = (Math.floor((dx / MS_HOUR) * 100) / 100) + 'h';
        }
        return time;
    },
    consoleObjLink: (() => {
        let ret = {};
        let cons = ret;

        if (typeof console == 'object') {
            cons = console;
        }
        if (!isClient) {
            ret = {};
            for (let key in Logger) {
                (function (ret, key, cons) {
                    ret[key] = function () {
                        return cons.log.apply(cons, arguments);
                    };
                })(ret, key, cons);
            }
        } else {
            ret = cons;
        }

        return ret;

    })(),
};

export default loggerUtils;
