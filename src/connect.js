'use strict';

import { observer } from 'mobx-react';
import defaultContextTypes from './defaultContextTypes';


function connect(Component) {
  // Turn the Component into an observed component.
  let NewObservedComponent = observer(Component);
  // Monkey patch the componentWillMount method so we can set
  // this.store and this.dispatch in our components.
  // http://me.dt.in.th/page/JavaScript-override/
  let originalComponentWillMount = NewObservedComponent.prototype.componentWillMount || function() {};
  NewObservedComponent.prototype.componentWillMount = function componentWillMount() {
    this.store = this.context.ff.store;
    this.dispatch = this.context.ff.dispatch;
    this.mobx = this.context.ff.mobx;
    originalComponentWillMount.apply(this, arguments);
  };
  // Declare the fauxflux (ff) context on this component so we can use it throughout the methods
  // like the componentWillMount method we monkey patch above. Extend it with the components original contextTypes.
  let originalContextTypes = NewObservedComponent.contextTypes || {};
  originalContextTypes.ff = defaultContextTypes.ff;
  NewObservedComponent.contextTypes = originalContextTypes;
  // Return the niffty new component.
  return NewObservedComponent;
};


export { connect as default };
