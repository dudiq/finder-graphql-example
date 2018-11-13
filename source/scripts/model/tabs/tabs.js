import storeFabric from '../../system/storeFabric';
import uuid from '../../utils/uuid';
import misc from './utils/misc';
import filterScheme from './utils/filterScheme';
import schemeUtils from '../scheme/schemeUtils';
import loadRepos from './utils/loadRepos';
import tabTypes from './utils/tabTypes';
import tabStatuses from './utils/tabStatuses';
import debounce from '../../utils/debounce';
import paging from './utils/paging';

const deb = debounce(2000);

const tabs = storeFabric({
    tabsList: [],
    currentTab: {},
}, {
    types: tabTypes,
    statuses: tabStatuses,
    selectTab: function (state, id) {
        const current = state.tabsList.filter(item => item.uuid == id)[0];
        if (current) {
            state.currentTab = current;
        }
        return state;
    },
    updateScheme: function(state, values, force){
        const currTab = state.currentTab;
        currTab.filtersContent = values;
        doRequest({
            id: currTab.uuid,
            values,
            searchText: currTab.searchText,
        }, currTab, force);
        return state;
    },
    setSearchText: function(state, val, force) {
        const currTab = state.currentTab;
        currTab.searchText = val;
        doRequest({
            id: currTab.uuid,
            values: currTab.filtersContent,
            searchText: val,
        }, currTab, force);
        return state;
    },
    updateContent: function(state, id, content, status) {
        const current = state.tabsList.filter(item => item.uuid == id)[0];
        
        if (current && (status != tabStatuses.error)) {
            if (current.startFromCursor) {
                // push
                current.content = current.content.concat(content.edges);
            } else {
                // initial
                current.content = content.edges;
            }
            const hasMore = (content.edges.length >= paging.MAX_PER_PAGE);
            current.hasMore = hasMore;
            const lastItem = content.edges[content.edges.length - 1];
            current.startFromCursor = (hasMore && lastItem) ? lastItem.cursor : '';
        }

        current.status = status;
        return state;
    },
    updateStatus: function(state, id, status) {
        const current = state.tabsList.filter(item => item.uuid == id)[0];
        if (current) {
            current.status = status;
        }
        return state;
    },
    loadNextPage: function(state) {
        const currTab = state.currentTab;

        if (currTab.hasMore) {
            // need load
            doRequest({
                id: currTab.uuid,
                values: currTab.filtersContent,
                searchText: currTab.searchText,
            }, currTab, true);
        }

        return state;
    },
    addTab: function (state, fields) {
        const name = misc.getNextName(state.tabsList, fields.name);
        const id = uuid();
        const filtersScheme = filterScheme(fields.type);
        const tab = {
            ...fields,
            filtersScheme,
            searchText: '',
            filtersContent: schemeUtils.getInitialValues(filtersScheme),

            hasMore: false,
            startFromCursor: '',

            content: [],
            status: tabStatuses.init,

            name,
            uuid: id,
        };
        state.tabsList.push(tab);
        state.currentTab = tab;
        return state;
    },
    removeTab: function (state, id) {
        const list = state.tabsList;
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].uuid == id) {
                list.splice(i, 1);
                if (state.currentTab.uuid == id) {
                    const nextTab = list[i] || list[i - 1] || {};
                    state.currentTab = nextTab;
                }
            }
        }
        return state;
    },
});

function doRequest(params, currTab, force) {
    if ((params.searchText + '').trim()) {
        //debounce
        if (force) {
            deb.stop();
            sendRequest(params, currTab);
        } else {
            deb(sendRequest, params, currTab);
        }
    }
}

const reqMap = {};
function sendRequest({id, values, searchText}, currTab) {
    const scheme = currTab.filtersScheme;
    const type = currTab.type;
    const startFromCursor = currTab.startFromCursor;

    let index = reqMap[id] = reqMap[id] || 1;
    index++;
    reqMap[id] = index;
    tabs.updateStatus(id, tabStatuses.loading);
    loadRepos(values, searchText, scheme, type, startFromCursor)
        .then((response) => {
            if (index == reqMap[id]) {
                delete reqMap[id];
                tabs.updateContent(id, response.data.search, tabStatuses.finish);
            }
        })
        .catch((error) => {
            if (index == reqMap[id]) {
                delete reqMap[id];
                tabs.updateContent(id, {}, tabStatuses.error);
            }
        });
}

export default tabs;
