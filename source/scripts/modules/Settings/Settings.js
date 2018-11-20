import React, {Component} from 'react';
import propTypes from 'prop-types';
import connect from '../../common/connect';

import scss from './settings.scss';
import Input from '../../ui-kit/Input';
import config from '../../../configs/config';
import Button from '../../ui-kit/Button';
import i18n from '../../common/i18n';

class Wrap extends Component {

    static propTypes = {
        lang: propTypes.string,
    };

    static contextTypes = {
        appSettings: propTypes.object,
        graphApi: propTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            token: config.github.token,
        };
    }

    onChangeToken = (ev) => {
        const val = ev.target.value;
        this.setState({
            token: val,
        });
        this.context.graphApi.updateToken(val);
    };

    onLangChange = () => {
        const currLang = this.props.lang;
        this.context.appSettings.lang(currLang == 'en' ? 'ru' : 'en');
    };

    render() {
        const {token} = this.state;
        const {lang} = this.props;
        return (
            <div className={scss.settings}>
                <Input label={i18n('tokenAuth')} value={token} onChange={this.onChangeToken}/>
                <Button onClick={this.onLangChange}>
                    {i18n('lang.t')} : {i18n('lang.' + lang)}
                </Button>
            </div>
        );
    }
}

const Settings = connect(Wrap);
export default Settings;
