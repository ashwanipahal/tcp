// @flow
import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import StyledGrid from './Grid.style';

const Grid = ({ children, className }) => <div className={className}>{children}</div>;

Grid.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(Grid, StyledGrid);
export { Grid as GridVanilla };
