import React from 'react';
import PropTypes from 'prop-types';
import LeftNavigationRoot from '../styles/LeftNavigation.style.native';

const LeftNavigation = ({ children }) => <LeftNavigationRoot>{children}</LeftNavigationRoot>;

LeftNavigation.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

LeftNavigation.defaultProps = {
  children: null,
};

export default LeftNavigation;
