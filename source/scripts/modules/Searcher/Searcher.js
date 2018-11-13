import React, {Component} from 'react';
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import connect from '../../common/connect';
import Input from '../../ui-kit/Input';
import i18n from '../../common/i18n';
import Form from '../../ui-kit/Form';
import tabStatuses from '../../model/tabs/utils/tabStatuses';
import tabTypes from '../../model/tabs/utils/tabTypes';
import Repo from './components/Repo';
import User from './components/User';

import scss from './searcher.scss';

const components = {
    [tabTypes.user]: User,
    [tabTypes.repo]: Repo,
};

class Block extends Component {
    static propTypes = {
        currentTab: propTypes.object,
    };

    static contextTypes = {
        tabs: propTypes.object,
    };

    onChange = (ev) => {
        const val = ev.target.value;
        this.context.tabs.setSearchText(val);
    };

    onLoadMore = () => {
        this.context.tabs.loadNextPage();
    };

    onSubmit = () => {
        this.context.tabs.setSearchText(this.props.currentTab.searchText, true);
    };

    renderItem = (item, index) => {
        const currentTab = this.props.currentTab;
        const Cmp = components[currentTab.type];

        return <Cmp key={item.node.id} item={item}/>;
    };

    render() {
        const currentTab = this.props.currentTab;
        const haveCurrent = !!currentTab.uuid;

        const initialLoading = (currentTab.status == tabStatuses.loading && (currentTab.content.length == 0));
        const isError = (currentTab.status == tabStatuses.error);

        return haveCurrent
            ? (
                <div>
                    <Form onSubmit={this.onSubmit}>
                        <Input value={currentTab.searchText} onChange={this.onChange}/>
                    </Form>
                    {isError && i18n('errorHappen')}
                    {initialLoading && i18n('loading')}

                    <div className={scss.scrolledContent}>
                        {!isError && <InfiniteScroll
                            initialLoad={false}
                            loadMore={this.onLoadMore}
                            hasMore={currentTab.hasMore}
                            loader={<div key={0}>{i18n('loading')}</div>}
                        >
                            {currentTab.content.map(this.renderItem)}
                        </InfiniteScroll>}
                    </div>
                </div>
            )
            : (
                <div>
                    {i18n('emptyTabs')}
                </div>
            );
    }
}

const Searcher = connect(Block);
export default Searcher;
