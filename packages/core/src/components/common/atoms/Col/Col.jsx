// Basic file for column in the grid structure
import React from 'react';
import { PropTypes } from 'prop-types';
import StyledCol from './Col.style';

// Passing on the colConfig to the style File and also the flag to add inline-block to the column
const Col = ({ className, children, colConfig, isColInlineBlock }) => (
  <StyledCol className={className} config={colConfig} isColInlineBlock={isColInlineBlock}>
    {children}
  </StyledCol>
);

Col.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  colConfig: PropTypes.string.isRequired,
  isColInlineBlock: PropTypes.bool.isRequired,
};

export default Col;
