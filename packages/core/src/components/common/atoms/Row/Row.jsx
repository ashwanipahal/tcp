import React from 'react';
import { PropTypes } from 'prop-types';
import StyledRow from './Row.style';

const Row = ({ className, children, noFlex }) => (
  <StyledRow className={className} noFlex={noFlex}>
    {children}
  </StyledRow>
);

Row.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  noFlex: PropTypes.bool.isRequired,
};

export default Row;
