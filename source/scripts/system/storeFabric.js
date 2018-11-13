import createStore from 'unistore';

function storeFabric(state, actions) {
    const store = createStore(state);

    const ret = {
        getStore: function () {
            return store;
        },
    };
    for (let key in actions) {
        if (typeof actions[key] == "function"){
            (function (key) {
                ret[key] = function (val1, val2, val3) {
                    const newState = actions[key](store.getState(), val1, val2, val3);
                    newState && store.setState(newState);
                };
            })(key);
        } else {
            ret[key] = actions[key];
        }
    }

    return ret;
}

export default storeFabric;
