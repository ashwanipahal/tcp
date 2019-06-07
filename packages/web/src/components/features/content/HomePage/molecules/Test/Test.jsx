import React from 'react';

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from '@tcp/core/styles/globalStyles/typography';

import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';

const { colors, typoTheme } = theme;

console.log(typeof fontstyle);
const Test = () => {
  return (
    <ThemeProvider theme={typoTheme}>
      <div>
        <Heading1 tag="h2" textStyle="underline" color={colors.TEXT.RED}>
          {' '}
          Dynamic comp 1{' '}
        </Heading1>
        <Heading2 tag="h3" textStyle="underline" color={colors.TEXT.RED}>
          {' '}
          Dynamic comp 2{' '}
        </Heading2>
        <Heading3 tag="p" textStyle="underline" color={colors.TEXT.RED}>
          {' '}
          Dynamic comp 3{' '}
        </Heading3>
        <Heading4 tag="span" textStyle="underline" color={colors.TEXT.RED}>
          {' '}
          Dynamic comp 4{' '}
        </Heading4>
        <Heading5 tag="div" textStyle="underline" color={colors.TEXT.RED}>
          {' '}
          Dynamic comp 5{' '}
        </Heading5>
        <Heading6 tag="h4" textStyle="underline" color={colors.TEXT.RED}>
          {' '}
          Dynamic comp 6{' '}
        </Heading6>
      </div>
    </ThemeProvider>
  );
};
export default Test;
