// Basic file for column in the grid structure
import React from 'react';

import StyledCol from './Col.style';

// TODO - Add prop validations
// Passing on the colConfig to the style File and also the flag to add inline-block to the column
const Col = ({ className, children, colConfig, isColInlineBlock }) => (
  <StyledCol className={className} config={colConfig} isColInlineBlock={isColInlineBlock}>
    {children}
  </StyledCol>
);

export default Col;
