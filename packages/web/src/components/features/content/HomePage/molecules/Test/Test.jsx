import React from 'react';

import {
  LargeLinkStyle,
  MediumLinkStyle,
  SmallLinkStyle,
} from '@tcp/core/styles/globalStyles/typography';
import theme from '@tcp/core/styles/themes/TCP';

const { colors } = theme;
const Test = () => {
  return (
    <div>
      <LargeLinkStyle color={colors.TEXT.RED}> Dynamic comp 2 </LargeLinkStyle>
      <MediumLinkStyle> Dyanmic </MediumLinkStyle>
      <SmallLinkStyle textAlign="center" color={colors.PRIMARY.BLUE}>
        Dynamic comp
      </SmallLinkStyle>
    </div>
  );
};
export default Test;
