import React, {Component} from 'react';
import propTypes from 'prop-types';

import scss from './repo.scss';

class Repo extends Component {
    static propTypes = {
        item: propTypes.object,
    };

    render() {
        const {item} = this.props;
        const node = item.node;

        return (
            <div className={scss.repo}>
                <div>{node.name}</div>
                <div>{node.description}</div>
                <div>{(new Date(node.createdAt)).toLocaleString()}</div>
                <div>{node.forkCount}</div>
                <div>{node.stargazers.totalCount}</div>
            </div>
        );
    }
}

export default Repo;
