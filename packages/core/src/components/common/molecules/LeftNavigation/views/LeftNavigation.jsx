import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/LeftNavigation.style';

const LeftNavigation = ({ className, children }) => (
  <div className={className}>
    LeftNavigation
    {children}
  </div>
);

LeftNavigation.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

LeftNavigation.defaultProps = {
  children: null,
};

export default withStyles(LeftNavigation, style);
