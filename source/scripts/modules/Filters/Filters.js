import React, {Component} from 'react';
import propTypes from 'prop-types';
import connect from '../../common/connect';

import SchemeFilters from './components/SchemeFilters';
import i18n from '../../common/i18n';
import langs from './filters.langs';
import Form from '../../ui-kit/Form';

i18n.addBlock(langs);

class Block extends Component {
    static propTypes = {
        currentTab: propTypes.object,
    };

    static contextTypes = {
        tabs: propTypes.object,
    };

    onFilter = (schemeValues) => {
        this.context.tabs.updateScheme(schemeValues);
    };

    onSubmit = () => {
        this.context.tabs.updateScheme(this.props.currentTab.filtersContent, true);
    };

    render() {
        const currentTab = this.props.currentTab;

        return (currentTab && currentTab.uuid)
            ? (
                <div>
                    <div>{i18n('filters.t')}</div>
                    <Form onSubmit={this.onSubmit}>
                        <SchemeFilters
                            uuid={currentTab.uuid}
                            scheme={currentTab.filtersScheme}
                            content={currentTab.filtersContent}
                            onChange={this.onFilter}
                        />
                    </Form>
                </div>
            )
            : null;
    }
}

const Filters = connect(Block);
export default Filters;
