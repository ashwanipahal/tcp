import React from 'react';
import PropTypes from 'prop-types';

const FallbackErrorComponent = ({ errorMessage, componentName }) => (
  <h1>
    Something went wrong in--
    <span>{componentName}</span>
    Component.
    <p>{errorMessage}</p>
  </h1>
);

FallbackErrorComponent.propTypes = {
  errorMessage: PropTypes.string,
  componentName: PropTypes.string,
};

FallbackErrorComponent.defaultProps = {
  errorMessage: '',
  componentName: '',
};

export default FallbackErrorComponent;
