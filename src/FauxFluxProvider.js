'use strict';

import React from 'react';
import defaultContextTypes from './defaultContextTypes';


class FauxFluxProvider extends React.Component {

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      ff: {
        store: this.props.FF.store,
        dispatch: this.props.FF.dispatch
      }
    }
  }

  render() {
    return this.props.children;
  }

}

FauxFluxProvider.childContextTypes = defaultContextTypes;

FauxFluxProvider.propTypes = {
  children: React.PropTypes.element.isRequired,
  FF: React.PropTypes.object.isRequired // The FauxFlux singleton.
};

export { FauxFluxProvider as default };
