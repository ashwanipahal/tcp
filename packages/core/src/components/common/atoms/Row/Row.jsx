import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../hoc/withStyles';
import StyledRow from './Row.style';

const Row = ({ className, children, noFlex }) => (
  <div className={className} noFlex={noFlex}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  noFlex: PropTypes.bool.isRequired,
};

export default withStyles(Row, StyledRow);
export { Row as RowVanilla };
