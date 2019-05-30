import React from 'react';
import StyledRow from './Row.style';

const Row = ({ className, children, noFlex }) => <StyledRow className={className} noFlex={noFlex}>{children}</StyledRow>;

export default Row;
