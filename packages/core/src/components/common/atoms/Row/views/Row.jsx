// @flow
import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import StyledRow from '../Row.style';

// An additonal prop 'fullBleed' is added.
// This property ignores the offset of the row and spans across the space of the grid.
const Row = ({ className, children }) => <div className={className}>{children}</div>;

Row.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(Row, StyledRow);
export { Row as RowVanilla };
