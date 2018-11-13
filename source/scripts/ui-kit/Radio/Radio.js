import React from 'react';

import scss from './radio.scss';

let idKey = 1;

const Radio = (props) => {
    const {children, id, type, label, ...etcProps} = props;
    idKey++;
    const setId = 'rad-' + idKey;
    return (
        <div
            className={scss.fieldRadio}
        >
            <input id={setId} type="radio" {...etcProps} />
            <label htmlFor={setId}>{children}</label>
        </div>

    );
};

export default Radio;
