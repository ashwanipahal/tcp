import React from 'react';
import theme from '@tcp/core/styles/themes/TCP';
import DynamicComponent from './DynamicComponent';

const { colors, fonts } = theme;

const textStyle = {
  largeLink: {
    tag: 'a',
    fontSize: fonts.fontSize.body.links.primary,
    color: colors.PRIMARY.DARK,
  },
  MediumLink: {
    tag: 'a',
    fontSize: fonts.fontSize.body.links.secondary,
    color: colors.PRIMARY.DARK,
  },
  SmallLink: {
    tag: 'a',
    fontSize: fonts.fontSize.body.links.tertiary,
    color: colors.PRIMARY.DARK,
  },
  honeText: {
    tag: 'H1',
    fontSize: fonts.fontSize.heading.large.h1,
    color: colors.PRIMARY.DARK,
  },
};

export const MediumLinkStyle = props => <DynamicComponent {...textStyle.MediumLink} {...props} />;
export const SmallLinkStyle = props => <DynamicComponent {...textStyle.SmallLink} {...props} />;
export const LargeLinkStyle = props => <DynamicComponent {...textStyle.largeLink} {...props} />;

export const HoneText = props => <DynamicComponent {...textStyle.honeText} {...props} />;