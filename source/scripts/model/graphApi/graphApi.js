import ApolloClient from 'apollo-boost';
import config from '../../../configs/config';

const initialToken = config.github.token;
let TOKEN = initialToken;

const client = new ApolloClient({
    uri: config.github.uri,
    request: (operation) => {
        operation.setContext({
            headers: {
                authorization: `bearer ${TOKEN}`,
            },
        });
    },
    fetchOptions: {
        credentials: 'include',
    },
});

const graphApi = {
    updateToken: function(val) {
        TOKEN = val || initialToken;
    },
    getApolloClient: function () {
        return client;
    },
};

export default graphApi;
