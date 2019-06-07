import React from 'react';

import {
  HeadingLarge1,
  HeadingSmall1,
  Bodylargeprimary,
  Bodysmallprimary,
  Nav,
  BodyText1,
} from '@tcp/core/styles/globalStyles/typography';

import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';

const { colors, typoTheme } = theme;

const Test = () => {
  return (
    <ThemeProvider theme={typoTheme}>
      <div>
        <HeadingLarge1 fontSize="55px" tag="h1" textStyle="underline" color={colors.TEXT.RED}>
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
        <BodyText1 fontWeight="bold" tag="p" color={colors.TEXT.BLUE}>
          BodyText1 <br /> fontWeight="bold" need to pass for font weight
        </BodyText1>
      </div>
    </ThemeProvider>
  );
};
export default Test;
