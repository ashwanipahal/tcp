import React from 'react';
import { Box, Text } from '@fabulas/astly';
import { useErrorReporter } from './ErrorReportProvider';

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // log the error to an error reporting service
    console.log('ERROR', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Text>Oh no an error has occurred!</Text>
        </Box>
      );
    } else {
      return (
        <Box style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          {this.props.children}
        </Box>
      );
    }
  }
}

export default props => {
  const error = useErrorReporter();
  console.log(error);
  return <ErrorBoundary>{props.children}</ErrorBoundary>;
};
