// @flow
import React from 'react';
import { PropTypes } from 'prop-types';
import StyledGrid from './Grid.style';

const Grid = ({ children }) => <StyledGrid>{children}</StyledGrid>;

Grid.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Grid;
