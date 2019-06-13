import React from 'react';

import styled from 'styled-components';
import { Heading, BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';

const Test = () => {
  return (
    <div>
      <Heading HeadingLarge="three" HeadingcolorLg="secondary" tag="h1">
        ALL H1 TO H6 variation large dynamic tag
      </Heading>
      <BodyCopy bodySize="five" tag="p">
        bodylarge3
      </BodyCopy>
    </div>
  );
};
export default Test;
