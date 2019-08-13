import React from 'react';
import PropTypes from 'prop-types';
import loaderStyles from '../Loader.style';

const { LoaderLoyalty } = loaderStyles;

const Loader = props => {
  const { loaderState } = props;
  if (loaderState) {
    return (
      <LoaderLoyalty className="loaderWrapper">
        <span>{}</span>
      </LoaderLoyalty>
    );
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
