import React from 'react';
import PropTypes from 'prop-types';

const FallbackErrorComponent = ({ errorMessage, componentName }) => (
  <aside role="alert">
    Something went wrong in--
    <span>
      <strong>{componentName}</strong>
    </span>
    Component.
    <p>{errorMessage}</p>
  </aside>
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
