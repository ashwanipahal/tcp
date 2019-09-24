import React from 'react';
import PropTypes from 'prop-types';
import StoreLocationsRoot from '../styles/StoreLocations.style.native';

const StoreLocations = ({ children }) => <StoreLocationsRoot>{children}</StoreLocationsRoot>;

StoreLocations.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

StoreLocations.defaultProps = {
  children: null,
};

export default StoreLocations;
