import utils from './logger.utils';

const isClient = utils.isClient;
const RUN_PLACE_PREFIX = isClient ? '^' : '_';
const LOG_PREFIX = '#';
const getTimeNow = utils.getTimeNow;
const consoleObjLink = utils.consoleObjLink;

let prevTime = getTimeNow();
let isOnlyOne = false;
let canUse = defaultCanUse;

function canFalse() {
    return false;
}

class Log {
    constructor(name, opt = {}) {
        this.pos = 0;
        this.name = name;
        this.opt = opt;
    }

    isMain(val) {
        this.isMeOnly = val;
        isOnlyOne = val;
    }

    error() {
        showData.call(this, arguments, consoleObjLink.error);
    }

    log() {
        if (canUse.call(this)) {
            showData.call(this, arguments, consoleObjLink.log);
        }
    }

    warn() {
        if (canUse.call(this)) {
            showData.call(this, arguments, consoleObjLink.warn);
        }
    }

    info() {
        if (canUse.call(this)) {
            showData.call(this, arguments, consoleObjLink.info);
        }
    }

    dir() {
        if (canUse.call(this)) {
            showData.call(this, arguments, consoleObjLink.dir);
        }
    }
}


function showData(args, method) {
    const opt = this.opt;
    if (opt.enable === false) {
        return;
    }

    const nowTime = getTimeNow();

    const firstArg =
        RUN_PLACE_PREFIX +
        LOG_PREFIX +
        this.name + ' [' + utils.getFormattedTime(opt, prevTime, nowTime) + ']: ';

    prevTime = nowTime;

    let showArgs = [firstArg];
    for (let i = 0, l = args.length; i < l; i++) {
        const item = args[i];
        let setItem = item;
        const typeItem = typeof item;
        if (typeItem == 'string') {
            this.pos = i;
            setItem = replaceItem.call(this, item, args, i);
            i = this.pos;

        } else if (typeItem == 'object') {
            if (opt.needStringify) {
                setItem = JSON.stringify(item);
            }
        }
        showArgs.push(setItem);
    }
    args = null;

    method && method.apply(consoleObjLink, showArgs);

    showArgs.length = 0;
    showArgs = null;

}

function replaceItem(item, args, pos) {
    if (item.indexOf('%s') !== -1) {
        pos++;
        this.pos = pos;
        const val = args[pos];
        item = item.replace('%s', val);
        item = replaceItem.call(this, item, args, pos);
    }
    return item;
}

function defaultCanUse() {
    const isMe = (!isOnlyOne || (isOnlyOne && this.isMeOnly));
    if (this.opt.enable === true && isMe) {
        return true;
    }
    return isMe;
}

function log(name, opt) {
    return new Log(name, opt);
}

log.disable = function () {
    canUse = canFalse;
};


export default log;
