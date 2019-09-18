import React from 'react';
import PropTypes from 'prop-types';
import StoreHoursRoot from '../styles/StoreHours.style.native';

const StoreHours = ({ children }) => (
  <StoreHoursRoot>
    StoreHours
    {children}
  </StoreHoursRoot>
);

StoreHours.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

StoreHours.defaultProps = {
  children: null,
};

export default StoreHours;
