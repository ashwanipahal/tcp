// @flow
import React from 'react';

import StyledCol from './Col.style';

const Col = ({ className, children, colConfig }) => (
  <StyledCol className={className} config={colConfig}>
    {children}
  </StyledCol>
);

export default Col;
