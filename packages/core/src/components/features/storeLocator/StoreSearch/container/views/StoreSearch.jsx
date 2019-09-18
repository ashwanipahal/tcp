import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/StoreSearch.style';

const StoreSearch = ({ className, children }) => (
  <div className={className}>
    StoreSearch
    {children}
  </div>
);

StoreSearch.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

StoreSearch.defaultProps = {
  children: null,
};

export default withStyles(StoreSearch, style);
