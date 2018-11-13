import React from 'react';

export default function Form({children, onSubmit, notAutocomplete, ...etc}) {
    return (
        <form onSubmit={(ev) => {
            ev.preventDefault();
            onSubmit && onSubmit(ev);
            return false;
        }} autoComplete={notAutocomplete ? 'off' : undefined} {...etc}>
            {notAutocomplete && <input type="hidden" autoComplete="false" name="hidden" style="display:none;"/>}
            {children}
            <button type="submit" style={{display: 'none'}}/>
        </form>
    );
}
