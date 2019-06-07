import React from 'react';
import theme from '@tcp/core/styles/themes/TCP';
import DynamicComponent from './DynamicComponent';

const { colors, fonts } = theme;

const textStyle = {
  heading1: {
    fontSize: fonts.fontSize.heading.large.h1,
    color: colors.PRIMARY.DARK,
  },
  heading2: {
    fontSize: fonts.fontSize.heading.large.h2,
    color: colors.PRIMARY.DARK,
  },
  heading3: {
    fontSize: fonts.fontSize.heading.large.h3,
    color: colors.PRIMARY.DARK,
  },
  heading4: {
    fontSize: fonts.fontSize.heading.large.h4,
    color: colors.PRIMARY.DARK,
  },
  heading5: {
    fontSize: fonts.fontSize.heading.large.h5,
    color: colors.PRIMARY.DARK,
  },
  heading6: {
    fontSize: fonts.fontSize.heading.large.h6,
    color: colors.PRIMARY.DARK,
  },
};

export const Heading1 = props => <DynamicComponent {...textStyle.heading1} {...props} />;
export const Heading2 = props => <DynamicComponent {...textStyle.heading2} {...props} />;
export const Heading3 = props => <DynamicComponent {...textStyle.heading3} {...props} />;
export const Heading4 = props => <DynamicComponent {...textStyle.heading4} {...props} />;
export const Heading5 = props => <DynamicComponent {...textStyle.heading5} {...props} />;
export const Heading6 = props => <DynamicComponent {...textStyle.heading6} {...props} />;
