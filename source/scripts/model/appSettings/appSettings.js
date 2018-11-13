import storeFabric from '../../system/storeFabric';
import methods from './methods';

const appSettings = storeFabric({
    theme: methods.theme(),
    lang: methods.lang(),
}, {
    lang: function (state, val) {
        state.lang = methods.lang(val);
        return state;
    },
});

export default appSettings;
