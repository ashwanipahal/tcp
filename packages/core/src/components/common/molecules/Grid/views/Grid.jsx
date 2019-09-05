// @flow
import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import StyledGrid from '../Grid.style';

const Grid = ({ children, className, wrapperClass }) => (
  <div className={`${className} ${wrapperClass}`}>{children}</div>
);

Grid.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  wrapperClass: PropTypes.string,
};

Grid.defaultProps = {
  wrapperClass: '',
};

export default withStyles(Grid, StyledGrid);
export { Grid as GridVanilla };
