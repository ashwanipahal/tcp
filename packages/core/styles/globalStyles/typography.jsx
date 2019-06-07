import React from 'react';
import theme from '@tcp/core/styles/themes/TCP';
import DynamicComponent from './DynamicComponent';

const { colors } = theme;

const textStyle = {
  largeLink: {
    tag: 'a',
    fontSize: '15px',
    color: colors.PRIMARY.DARK,
  },
  MediumLink: {
    tag: 'a',
    fontSize: '12px',
    color: colors.PRIMARY.DARK,
  },
  SmallLink: {
    tag: 'a',
    fontSize: '10px',
    color: colors.PRIMARY.DARK,
  },
};

export const MediumLinkStyle = props => <DynamicComponent {...textStyle.MediumLink} {...props} />;
export const SmallLinkStyle = props => <DynamicComponent {...textStyle.SmallLink} {...props} />;

export const LargeLinkStyle = props => <DynamicComponent {...textStyle.largeLink} {...props} />;
