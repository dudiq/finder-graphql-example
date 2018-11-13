const schemeUtils = {
    getInitialValues: function (scheme) {
        const ret = {};
        for (let key in scheme) {
            ret[key] = scheme[key].default || '';
        }
        return ret;
    },
};

export default schemeUtils;
