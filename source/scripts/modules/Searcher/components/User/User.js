import React, {Component} from 'react';
import propTypes from 'prop-types';

import scss from './user.scss';

class User extends Component {
    static propTypes = {
        item: propTypes.object,
    };

    render() {
        const {item} = this.props;
        const node = item.node;

        return (
            <div className={scss.repo}>
                <div>{node.name}</div>
                <div className={scss.avatar}><img src={node.avatarUrl}/></div>
                <div>{(new Date(node.createdAt)).toLocaleString()}</div>
                <div>{node.bio}</div>
                <div>{node.company}</div>
                <div>{node.location}</div>
                <div>{node.followers.totalCount}</div>
                <div>{node.watching.totalCount}</div>
            </div>
        );
    }
}

export default User;
