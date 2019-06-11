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
        <HeadingLarge1 tag="h1">ALL H1 TO H6 variation large dynamic tag</HeadingLarge1>

        <HeadingSmall1 tag="h1">ALL H1 TO H6 variation small dynamic tag</HeadingSmall1>

        <Bodylargeprimary tag="p">ALL body copy variation large dynamic tag</Bodylargeprimary>

        <Bodysmallprimary tag="p">ALL body copy variation small dynamic tag</Bodysmallprimary>

        <Nav tag="p">NAV LINK</Nav>
        <BodyText1 tag="p">
          BodyText1 <br /> fontWeight="bold" need to pass for font weight
        </BodyText1>
      </div>
    </ThemeProvider>
  );
};
export default Test;
