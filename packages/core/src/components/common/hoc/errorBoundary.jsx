import React, { PureComponent } from 'react';
import ErrorFallBack from 'react-ssr-error-boundary';
import { BodyCopy } from '../atoms';

const fallbackMessage = () => {
  return (
    <BodyCopy fontSize="fs18" textAlign="center">
      Error happened for this module.
    </BodyCopy>
  );
};

export default function(WrappedComponent) {
  return class errorBoundaryComponent extends PureComponent {
    render() {
      return (
        <ErrorFallBack fallBack={fallbackMessage}>
          <WrappedComponent {...this.props} />
        </ErrorFallBack>
      );
    }
  };
}
