import React, {Component} from 'react';

import scss from './layout.scss';
import Navi from '../Navi';
import Filters from '../Filters';
import Searcher from '../Searcher';
import Settings from '../Settings';
import propTypes from 'prop-types';

export default class Layout extends Component {
    static contextTypes = {
        appSettings: propTypes.object,
        tabs: propTypes.object,
    };

    render() {
        return (
            <div className={scss.layout}>
                <div className={scss.header}>
                    <Navi/>
                </div>
                <div className={scss.content}>
                    <div className={scss.leftPanel}>
                        <div className={scss.offset}>
                            <Filters store={this.context.tabs.getStore()}/>
                            <Settings store={this.context.appSettings.getStore()}/>
                        </div>
                    </div>
                    <div className={scss.centerPanel}>
                        <div className={scss.offset}>
                            <Searcher store={this.context.tabs.getStore()}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
