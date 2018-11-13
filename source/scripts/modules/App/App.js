import React, {Component} from 'react';
import propTypes from 'prop-types';
import {ApolloProvider} from 'react-apollo';

import i18n from '../../common/i18n/i18n';
import langs from '../basic.langs';
import appSettings from '../../model/appSettings';
import tabs from '../../model/tabs/tabs';
import Layout from '../Layout/Layout';
import connect from '../../common/connect';
import graphApi from '../../model/graphApi/graphApi';

i18n.addBlock(langs);

class BasicApp extends Component {

    static childContextTypes = {
        appSettings: propTypes.object,
        tabs: propTypes.object,
        graphApi: propTypes.object,
    };

    getChildContext() {
        return {
            appSettings,
            tabs,
            graphApi,
        };
    }

    render() {
        return (
            <ApolloProvider client={graphApi.getApolloClient()}>
                <div className="app-place">
                    <Layout/>
                </div>
            </ApolloProvider>
        );
    }
}

const Wrap = connect(BasicApp);

export default class App extends Component {
    render() {
        return (
            <Wrap store={appSettings.getStore()}/>
        );
    }
}
