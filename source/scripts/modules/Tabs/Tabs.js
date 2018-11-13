import React, {Component} from 'react';
import propTypes from 'prop-types';
import connect from '../../common/connect';
import TabItem from './component/TabItem';

import scss from './tabs.scss';

class List extends Component {

    static contextTypes = {
        tabs: propTypes.object,
    };

    onSelect = (ev) => {
        const uuid = ev.target.getAttribute('data-value');
        this.context.tabs.selectTab(uuid);
    };

    onRemove = (ev) => {
        const uuid = ev.target.getAttribute('data-value');
        this.context.tabs.removeTab(uuid);
    };

    renderItem = (item) => {
        const isActive = (this.props.currentTab.uuid == item.uuid);
        return (<TabItem
            key={item.uuid}
            {...item}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
            isActive={isActive}
        />);
    };

    render() {
        return (
            <div className={scss.tabs}>
                {this.props.tabsList.map(this.renderItem)}
            </div>
        );
    }
}

const Tabs = connect(List);
export default Tabs;
