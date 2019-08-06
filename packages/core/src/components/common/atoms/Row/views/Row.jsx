import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import StyledRow from '../Row.style';

// An additonal prop 'fullBleed' is added.
// This property ignores the offset of the row and spans across the space of the grid.
const Row = ({ className, children, tagName: CustomTag, tabIndex }) => {
  return (
    <CustomTag className={className} tabIndex={tabIndex}>
      {children}
    </CustomTag>
  );
};

Row.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  tagName: PropTypes.string,
  tabIndex: PropTypes.number,
};

Row.defaultProps = {
  tagName: 'div',
  tabIndex: undefined,
};

export default withStyles(Row, StyledRow);
export { Row as RowVanilla };
