import React from 'react';
import PropTypes from 'prop-types';
import StoreSearchRoot from '../styles/StoreSearch.style.native';

const StoreSearch = ({ children }) => (
  <StoreSearchRoot>
    StoreSearch
    {children}
  </StoreSearchRoot>
);

StoreSearch.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

StoreSearch.defaultProps = {
  children: null,
};

export default StoreSearch;
