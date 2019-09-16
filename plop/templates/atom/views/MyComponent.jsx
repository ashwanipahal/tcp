import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/MyComponent.style';

const MyComponent = ({ className, children }) => (
  <div className={className}>
    MyComponent
    {children}
  </div>
);

MyComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

MyComponent.defaultProps = {
  children: null,
};

export default withStyles(MyComponent, style);
