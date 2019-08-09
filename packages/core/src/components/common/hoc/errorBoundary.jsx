import React, { PureComponent } from 'react';

export default function(WrappedComponent) {
  return class errorBoundaryComponent extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
