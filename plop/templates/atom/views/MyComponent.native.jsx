import React from 'react';
import PropTypes from 'prop-types';
import MyComponentRoot from '../styles/MyComponent.style.native';

const MyComponent = ({ children }) => <MyComponentRoot>{children}</MyComponentRoot>;

MyComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

MyComponent.defaultProps = {
  children: null,
};

export default MyComponent;
