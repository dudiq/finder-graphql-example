import React from 'react';

import scss from './input.scss';
import utilsStyles from '../../../styles/utils-styles.scss';

let id = 1;

export default function Input(props) {
    const {
        label, setRef, type, disabled,
        ref,
        ...etcProps
    } = props;
    setRef && (etcProps.ref = setRef);
    etcProps.disabled = disabled;
    const haveLabel = !!label;

    id++;
    const setId = 'inp-' + id;
    return (
        <div
            className={`${scss.fieldInput} ${disabled ? scss.isDisabled : ''}`}
        >
            {haveLabel && <label htmlFor={setId} className={utilsStyles.isLabel}>{label}</label>}
            <input id={setId} type={type} {...etcProps} />
        </div>

    );
}
