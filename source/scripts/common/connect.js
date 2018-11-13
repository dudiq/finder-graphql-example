import React, {Component} from 'react';
import log from './log';

const logger = log('connect.js');

export default function (WrappedComponent, propsMap) {
    class Wrap extends Component {

        constructor(props) {
            super(props);
            if (!props.store) {
                logger.error('not defined store for connect!!!');
            }
            const storeState = props.store.getState();
            this.state = {
                wrapProps: propsMap ? propsMap(storeState) : storeState,
            };
        }

        componentDidMount() {
            this.props.store.subscribe(this.onEvent);
        }

        componentWillUnmount() {
            this.props.store.unsubscribe(this.onEvent);
        }

        onEvent = (state) => {
            this.setState({
                wrapProps: propsMap ? propsMap(state) : state,
            });
        };

        render() {
            const {wrapProps} = this.state;

            return (
                <WrappedComponent
                    {...this.props}
                    {...wrapProps}
                />
            );
        }
    }

    return Wrap;
}
