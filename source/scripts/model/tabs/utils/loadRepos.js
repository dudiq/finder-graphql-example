import repoQuery from '../query/repoQuery';
import userQuery from '../query/userQuery';
import graphApi from '../../graphApi';
import tabTypes from './tabTypes';
import paging from './paging';
import queryType from './queryType';

const queryByType = {
    [tabTypes.repo]: repoQuery,
    [tabTypes.user]: userQuery,
};

export default function loadRepos(filters, searchText, scheme, type, startFromCursor) {
    const list = [searchText];

    const queries = queryByType[type];
    let query = queries[queryType.initialQuery];
    if (startFromCursor) {
        query = queries[queryType.pagingQuery];
    }

    for (const key in scheme) {
        const val = filters[key];
        const pass = scheme[key].key;
        list.push(pass + val);
    }

    const str = list.join(' ');

    const client = graphApi.getApolloClient();
    return client
        .query({
            query,
            variables: {
                str,
                type,
                perPage: paging.MAX_PER_PAGE,
                startFromCursor,
            },
        });
}
