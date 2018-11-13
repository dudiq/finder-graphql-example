import React, {Component} from 'react';
import propTypes from 'prop-types';
import log from '../../../common/log';
import fieldTypes from '../../../model/scheme/fieldTypes';
import Radio from '../../../ui-kit/Radio';
import Input from '../../../ui-kit/Input';
import i18n from '../../../common/i18n';

const logger = log('Filters:SchemeFilters.js');
import utilsStyles from '../../../../styles/utils-styles.scss';


const fields = {
    [fieldTypes.radio]: function (props, scheme) {
        return (
            <div key={props.name}>
                <label className={utilsStyles.isLabel}>{props.label}</label>
                {scheme.values.map((val) => {
                    return (<Radio
                        {...props}
                        checked={props.value == val}
                        key={val}
                        value={val}
                    >{i18n('filters.radio.' + val)}
                    </Radio>);
                })}
            </div>
        );
    },
    [fieldTypes.input]: function (props, scheme) {
        return <Input {...props} type={scheme.fieldType}/>;
    },
};

export default class SchemeFilters extends Component {
    static propTypes = {
        uuid: propTypes.string.isRequired,
        scheme: propTypes.object,
        content: propTypes.object,
        onChange: propTypes.func,
    };

    onChange = (ev) => {
        const t = ev.target;
        const name = t.name;
        const val = t.value;
        if (name && val !== undefined) {
            const contentValues = this.props.content;
            this.props.onChange({
                ...contentValues,
                [name]: val,
            });
        }
    };

    makeFields(scheme) {
        const ret = [];
        const contentValues = this.props.content;
        for (const key in scheme) {
            const item = scheme[key];
            const method = fields[item.type];
            const value = contentValues[key];
            const disabledOn = item.disabledOn;
            let disabled = false;
            if (disabledOn) {
                disabled = contentValues[disabledOn.field] == disabledOn.value;
            }
            const cmp = method(
                {
                    key,
                    disabled,
                    label: i18n('filters.fields.' + key),
                    name: key,
                    value: (value !== undefined) ? value : item.default,
                    onChange: this.onChange,
                },
                item,
            );
            cmp && ret.push(cmp);
        }
        return ret;
    }

    render() {
        const {scheme, content} = this.props;
        logger.log('scheme', scheme);
        return this.makeFields(scheme, content);
    }
}
