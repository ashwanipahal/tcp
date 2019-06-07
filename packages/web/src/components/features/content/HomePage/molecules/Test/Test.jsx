import React from 'react';

import {
  HeadingLarge1,
  HeadingSmall1,
  Bodylargeprimary,
  Bodysmallprimary,
  Nav,
} from '@tcp/core/styles/globalStyles/typography';

import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';

const { colors, typoTheme } = theme;

console.log(typeof fontstyle);
const Test = () => {
  return (
    <ThemeProvider theme={typoTheme}>
      <div>
        <HeadingLarge1 tag="h1" textStyle="underline" color={colors.TEXT.RED}>
          ALL H1 TO H6 variation large dynamic tag
        </HeadingLarge1>

        <HeadingSmall1 tag="h1" textStyle="underline" color={colors.TEXT.RED}>
          ALL H1 TO H6 variation small dynamic tag
        </HeadingSmall1>

        <Bodylargeprimary tag="p" textStyle="underline" color={colors.TEXT.RED}>
          ALL body copy variation large dynamic tag
        </Bodylargeprimary>

        <Bodysmallprimary tag="p" textStyle="underline" color={colors.TEXT.RED}>
          ALL body copy variation small dynamic tag
        </Bodysmallprimary>

        <Nav tag="p" textStyle="underline" color={colors.TEXT.RED}>
          NAV LINK
        </Nav>
      </div>
    </ThemeProvider>
  );
};
export default Test;
