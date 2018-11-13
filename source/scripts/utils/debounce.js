const DEFAULT_TIMEOUT = 200;

export default function debounce(timeout = DEFAULT_TIMEOUT) {
    const map = {};
    const func = function (id, cb, params, val) {
        if (typeof id == "function") {
            val = params;
            params = cb;
            cb = id;
            id = undefined;
        }
        clearTimeout(map[id]);
        map[id] = setTimeout(function () {
            cb(params, val);
        }, timeout);
    };
    func.stop = function (id) {
        clearTimeout(map[id]);
    };
    return func;
}
