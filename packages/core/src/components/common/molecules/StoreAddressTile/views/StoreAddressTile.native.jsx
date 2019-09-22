import React from 'react';
import PropTypes from 'prop-types';
import StoreAddressTileRoot from '../styles/StoreAddressTile.style.native';

const StoreAddressTile = ({ children }) => <StoreAddressTileRoot>{children}</StoreAddressTileRoot>;

StoreAddressTile.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

StoreAddressTile.defaultProps = {
  children: null,
};

export default StoreAddressTile;
