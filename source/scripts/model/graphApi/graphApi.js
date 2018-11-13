import ApolloClient from 'apollo-boost';
import config from '../../../configs/config';

const TOKEN = config.github.token;

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
    getApolloClient: function () {
        return client;
    },
};

export default graphApi;
