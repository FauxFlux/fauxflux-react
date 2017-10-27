'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import defaultContextTypes from './defaultContextTypes';


class FauxFluxProvider extends React.Component {

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      ff: {
        store: this.props.FF.store,
        dispatch: this.props.FF.dispatch,
        mobx: this.props.FF.mobx
      }
    }
  }

  render() {
    return this.props.children;
  }

}

FauxFluxProvider.childContextTypes = defaultContextTypes;

FauxFluxProvider.propTypes = {
  children: PropTypes.element.isRequired,
  FF: PropTypes.object.isRequired // The FauxFlux singleton.
};

export { FauxFluxProvider as default };
