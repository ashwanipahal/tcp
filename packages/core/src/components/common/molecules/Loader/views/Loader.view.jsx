import React from 'react';
import PropTypes from 'prop-types';
import SpinnerOverlay from '@tcp/core/src/components/common/atoms/SpinnerOverlay';

const Loader = props => {
  const { loaderState } = props;
  if (loaderState) {
    return <SpinnerOverlay />;
  }
  return null;
};

Loader.propTypes = {
  loaderState: PropTypes.bool,
};

Loader.defaultProps = {
  loaderState: false,
};

export default Loader;
