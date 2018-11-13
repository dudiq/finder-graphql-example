import theme from '../../common/theme';
import i18n from '../../common/i18n/i18n';
import env from '../../system/env';

const prefix = 'app-settings.';

const KEY_THEME = 'theme';
const KEY_LANG = 'lang';

function envValue(key, val) {
    const fullKey = prefix + key;
    const ret = env(fullKey, val);
    return ret;
}

const methods = {
    theme: function (name) {
        if (name !== undefined) {
            envValue(KEY_THEME, name);
            theme(name);
        }
        return theme.getCurrent();
    },
    lang: function (val) {
        if (val !== undefined && (val != i18n.getLang())) {
            envValue(KEY_LANG, val);
            i18n.setLang(val);
        }
        return i18n.getLang();
    },
};

function init() {
    const firstTheme = envValue(KEY_THEME);
    firstTheme && methods.theme(firstTheme);
    const firstLang = envValue(KEY_LANG);
    firstLang && methods.lang(firstLang);
}

init();

export default methods;
