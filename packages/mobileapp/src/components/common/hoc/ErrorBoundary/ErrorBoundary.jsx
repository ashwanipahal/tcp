import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorBoundaryFallBack from './ErrorBoundaryFallback.view';

const withErrorBoundary = Component => props => {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallBack}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;
