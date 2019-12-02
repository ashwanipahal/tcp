import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getAPIConfig } from '@tcp/core/src/utils';
import ErrorMessageWrapper from './ErrorBoundaryFallback.style';

const ErrorBoundaryFallBack = ({ error }) => {
  const { enableErrorBoundary } = getAPIConfig();
  return enableErrorBoundary === 'true' ? (
    <ErrorMessageWrapper>
      <BodyCopy color="red.500" text="Some Error Occurred" />
      <BodyCopy color="red.500" text={error.toString()} />
    </ErrorMessageWrapper>
  ) : null;
};

ErrorBoundaryFallBack.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorBoundaryFallBack;
