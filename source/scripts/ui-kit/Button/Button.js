import React, {Component} from 'react';

import scss from './button.scss';

class Button extends Component {

    onKeyUp = (ev) => {
        if (ev.keyCode == 13) {
            this.onClick(ev);
        }
    };

    onClick = (ev) => {
        const {disabled, onClick} = this.props;
        if (!disabled) {
            onClick && onClick(ev);
        }
    };

    render() {
        const {
            children, disabled,
            onClick, // drop props
            ...etc
        } = this.props;
        return (
            <div
                className={`${scss.btn} ${disabled ? scss.btnDisabled : ''}`}
                tabIndex="0"
                onClick={this.onClick}
                onKeyUp={this.onKeyUp}
                disabled={disabled}
                {...etc}
                >
                <div className={scss.btnWrap}>
                    <div className={scss.btnContent}>
                        {children}
                    </div>
                </div>
                <div className={scss.btnRipple}/>
            </div>
        );
    }
}

export default Button;
