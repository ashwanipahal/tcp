// Disabling eslint for temporary fix
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@fabulas/astly';
import { useErrorReporter } from './ErrorReportProvider';

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { logger } = this.props;
    logger.report({ error });
    console.log('ERROR', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        // eslint-disable-next-line
        <Box style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Text>Oh no an error has occurred!</Text>
        </Box>
      );
    }
    return (
      // eslint-disable-next-line
      <Box style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>{children}</Box>
    );
  }
}

ErrorBoundary.propTypes = {
  logger: PropTypes.func.isRequired,
  children: PropTypes.node,
};
ErrorBoundary.defaultProps = {
  children: null,
};

export default props => {
  const error = useErrorReporter();
  // eslint-disable-next-line
  return <ErrorBoundary logger={error}>{props.children}</ErrorBoundary>;
};
