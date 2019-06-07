import React from 'react';

import {
  LargeLinkStyle,
  MediumLinkStyle,
  SmallLinkStyle,
} from '@tcp/core/styles/globalStyles/typography';

import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from "styled-components";

const  { colors, typoTheme } = theme;

console.log(typeof(fontstyle));
const Test = () => {
  return (
    <ThemeProvider theme={typoTheme}>
       <div>
        <LargeLinkStyle textStyle="underline" color={colors.TEXT.RED}> Dynamic comp 2 </LargeLinkStyle>
        <MediumLinkStyle> Dyanmic </MediumLinkStyle>
        <SmallLinkStyle color={colors.PRIMARY.BLUE}>
          Dynamic comp
        </SmallLinkStyle>
      </div>
    </ThemeProvider>
  );
};
export default Test;
