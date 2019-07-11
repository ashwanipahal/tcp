import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import StyledRow from '../Row.style';

// An additonal prop 'fullBleed' is added.
// This property ignores the offset of the row and spans across the space of the grid.
const Row = ({ className, children, tagName }) => {
  const CustomTag = `${tagName}`;
  return <CustomTag className={className}>{children}</CustomTag>;
};

Row.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  tagName: PropTypes.string,
};

Row.defaultProps = {
  tagName: 'div',
};

export default withStyles(Row, StyledRow);
export { Row as RowVanilla };
