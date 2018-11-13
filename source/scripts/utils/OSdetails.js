const userAgent = (navigator.userAgent).toLowerCase();

let osType = '';
// let osVersion = '';

const OSdetails = {
    TYPE_NOT_DEFINED: 'not-defined',
    TYPE_IOS: 'ios',
    TYPE_ANDROID: 'android',
    OStype: function () {
        !osType && defineOsType();
        return osType;
    },
};

const osTypes = {
    android: OSdetails.TYPE_ANDROID,
    'iphone|ipad|ipod': OSdetails.TYPE_IOS,
    '(mac os)|(mac_powerpc)|(macintosh)': OSdetails.TYPE_IOS,
};

function defineOsType() {
    osType = OSdetails.TYPE_NOT_DEFINED;
    let reg;
    for (const key in osTypes) {
        const type = osTypes[key];
        reg = new RegExp(key, 'i');
        if (reg.test(userAgent)) {
            osType = type;
            break;
        }
    }

    reg = null;
}


export default OSdetails;
