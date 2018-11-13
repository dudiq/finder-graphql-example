import tabTypes from './tabTypes';
import fieldTypes from '../../scheme/fieldTypes';

const types = {
    [tabTypes.repo]: function () {
        return {
            minStars: {
                key: 'stars:>',
                type: fieldTypes.input,
                fieldType: 'number',
                default: 100,
            },
            minForks: {
                key: 'forks:>',
                type: fieldTypes.input,
                fieldType: 'number',
                default: 100,
                disabledOn: {
                    field: 'forks',
                    value: 'no',
                },
            },
            forks: {
                key: 'fork:',
                type: fieldTypes.radio,
                default: 'true',
                values: ['true', 'false', 'only'],
            },
        };
    },
    [tabTypes.user]: function () {
        return {
            maxFollowers: {
                key: 'followers:<',
                type: fieldTypes.input,
                fieldType: 'number',
                default: 10,
            },
            maxRepos: {
                key: 'repos:<',
                type: fieldTypes.input,
                fieldType: 'number',
                default: 10,
            },
        };
    },
};

export default function defineFilters(type) {
    const method = types[type];
    return method ? method() : {};
}
