import React from 'react';
import {render} from 'react-dom';
import i18n from '../common/i18n';
import App from '../modules/App/App';

function stepSecond() {
    document.title = i18n('title');
    render(<App/>, document.getElementById('root-place'));
}

export default stepSecond;
