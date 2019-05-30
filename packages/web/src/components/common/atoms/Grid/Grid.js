// @flow
import React from 'react';
import StyledGrid from './Grid.style';

const Grid = ({ className, children }) => <StyledGrid className={className}>{children}</StyledGrid>;

export default Grid;
