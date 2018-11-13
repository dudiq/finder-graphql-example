import React, {Component} from 'react';
import propTypes from 'prop-types';

import scss from './navi.scss';
import Button from '../../ui-kit/Button';
import Tabs from '../Tabs';
import langs from './navi.langs';
import i18n from '../../common/i18n';

i18n.addBlock(langs);

export default class Navi extends Component {
    static contextTypes = {
        tabs: propTypes.object,
    };

    onCreateUser = () => {
        const tabs = this.context.tabs;
        tabs.addTab({
            name: i18n('navi.tab'),
            type: tabs.types.user,
        });
    };

    onCreateRepo = () => {
        const tabs = this.context.tabs;
        tabs.addTab({
            name: i18n('navi.tab'),
            type: tabs.types.repo,
        });
    };

    render() {
        return (
            <div className={scss.navi}>
                <div className={scss.buttons}>
                    <Button onClick={this.onCreateUser}>{i18n('navi.user')}</Button>
                    <Button onClick={this.onCreateRepo}>{i18n('navi.repo')}</Button>
                </div>
                <div className={scss.tabs}>
                    <Tabs store={this.context.tabs.getStore()}/>
                </div>
            </div>
        );
    }
}
