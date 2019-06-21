import React, { Component } from 'react';

export default function(WrappedComponent) {
  return class errorBoundaryComponent extends Component {
    componentDidCatch(error, info) {
      console.error('error', JSON.stringify(`App failed to load with errors: ${error}`));
      console.info('info', JSON.stringify(info));
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
