import React, {Component} from 'react';

import scss from './tab-item.scss';

export default function TabItem(props) {
    return (
        <div className={`${scss.tabItem} ${props.isActive ? scss.isActive : ''}`}>
            <span className={scss.name} onClick={props.onSelect} data-value={props.uuid}>{props.name}</span>
            <span className={scss.close} onClick={props.onRemove} data-value={props.uuid}>x</span>
        </div>
    );
}
