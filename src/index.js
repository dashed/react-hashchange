// 3rd-party imports

import React, { Component } from "react";
import PropTypes from "prop-types";

// helpers

const getLocationHash = () => {
    return window.location.hash;
};

// component

export default class HashChange extends Component {
    static propTypes = {
        render: PropTypes.func,
        onChange: PropTypes.func,
        getLocationHash: PropTypes.func,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.func
        ])
    };

    static defaultProps = {
        render: null,
        onChange: () => {},
        getLocationHash: getLocationHash
    };

    state = {
        hash: this.props.getLocationHash()
    };

    componentDidMount() {
        window.addEventListener("hashchange", this.handleHashChange, false);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.handleHashChange, false);
    }

    handleHashChange = () => {
        const hash = this.props.getLocationHash();

        this.props.onChange({ hash });
        this.setState({ hash });
    };

    render() {
        const { children, render } = this.props;

        if (render) {
            return render(this.state);
        }

        if (children) {
            if (typeof children === "function") {
                return children(this.state);
            }

            return React.Children.only(children)(this.state);
        }

        return null;
    }
}
