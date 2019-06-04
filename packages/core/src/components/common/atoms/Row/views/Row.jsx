import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import StyledRow from '../Row.style';

const Row = ({ className, children }) => <div className={className}>{children}</div>;

Row.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(Row, StyledRow);
export { Row as RowVanilla };
