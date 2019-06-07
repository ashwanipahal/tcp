import React from 'react';
import theme from '@tcp/core/styles/themes/TCP';
import DynamicComponent from './DynamicComponent';

const { colors, fonts } = theme;

const textStyle = {
  headingLarge1: {
    fontSize: fonts.fontSize.heading.large.h1,
    color: colors.PRIMARY.DARK,
  },
  headingLarge2: {
    fontSize: fonts.fontSize.heading.large.h2,
    color: colors.PRIMARY.DARK,
  },
  headingLarge3: {
    fontSize: fonts.fontSize.heading.large.h3,
    color: colors.PRIMARY.DARK,
  },
  headingLarge4: {
    fontSize: fonts.fontSize.heading.large.h4,
    color: colors.PRIMARY.DARK,
  },
  headingLarge5: {
    fontSize: fonts.fontSize.heading.large.h5,
    color: colors.PRIMARY.DARK,
  },
  headingLarge6: {
    fontSize: fonts.fontSize.heading.large.h6,
    color: colors.PRIMARY.DARK,
  },

  headingSmall1: {
    fontSize: fonts.fontSize.heading.small.h1,
    color: colors.PRIMARY.DARK,
  },
  headingSmall2: {
    fontSize: fonts.fontSize.heading.small.h2,
    color: colors.PRIMARY.DARK,
  },
  headingSmall3: {
    fontSize: fonts.fontSize.heading.small.h3,
    color: colors.PRIMARY.DARK,
  },
  headingSmall4: {
    fontSize: fonts.fontSize.heading.small.h4,
    color: colors.PRIMARY.DARK,
  },
  headingSmall5: {
    fontSize: fonts.fontSize.heading.small.h5,
    color: colors.PRIMARY.DARK,
  },
  headingSmall6: {
    fontSize: fonts.fontSize.heading.small.h6,
    color: colors.PRIMARY.DARK,
  },

  bodylarge1: {
    fontSize: fonts.fontSize.body.large.primary,
    color: colors.PRIMARY.DARK,
  },
  bodylarge2: {
    fontSize: fonts.fontSize.body.large.primary,
    color: colors.PRIMARY.DARK,
  },
  bodylarge3: {
    fontSize: fonts.fontSize.body.large.primary,
    color: colors.PRIMARY.DARK,
  },
  bodysmall1: {
    fontSize: fonts.fontSize.body.small.primary,
    color: colors.PRIMARY.DARK,
  },
  bodysmall2: {
    fontSize: fonts.fontSize.body.small.primary,
    color: colors.PRIMARY.DARK,
  },
  bodysmall3: {
    fontSize: fonts.fontSize.body.small.tertiary,
    color: colors.PRIMARY.DARK,
  },
  navText: {
    fontSize: fonts.fontSize.nav,
    color: colors.PRIMARY.DARK,
  },
  bodyText1: {
    fontSize: fonts.fontSize.body.fontsize.p1,
    color: colors.PRIMARY.DARK,
  },
  bodyText2: {
    fontSize: fonts.fontSize.body.fontsize.p2,
    color: colors.PRIMARY.DARK,
  },
  bodyText3: {
    fontSize: fonts.fontSize.body.fontsize.p3,
    color: colors.PRIMARY.DARK,
  },
  bodyText4: {
    fontSize: fonts.fontSize.body.fontsize.p4,
    color: colors.PRIMARY.DARK,
  },
  bodyText5: {
    fontSize: fonts.fontSize.body.fontsize.p5,
    color: colors.PRIMARY.DARK,
  },
  bodyText6: {
    fontSize: fonts.fontSize.body.fontsize.p6,
    color: colors.PRIMARY.DARK,
  },
  bodyText7: {
    fontSize: fonts.fontSize.body.fontsize.p7,
    color: colors.PRIMARY.DARK,
  },
  bodyText8: {
    fontSize: fonts.fontSize.body.fontsize.p8,
    color: colors.PRIMARY.DARK,
  },
  bodyText9: {
    fontSize: fonts.fontSize.body.fontsize.p9,
    color: colors.PRIMARY.DARK,
  },
  bodyText10: {
    fontSize: fonts.fontSize.body.fontsize.p10,
    color: colors.PRIMARY.DARK,
  },
  bodyText11: {
    fontSize: fonts.fontSize.body.fontsize.p11,
    color: colors.PRIMARY.DARK,
  },
  bodyText12: {
    fontSize: fonts.fontSize.body.fontsize.p12,
    color: colors.PRIMARY.DARK,
  },
  bodyText13: {
    fontSize: fonts.fontSize.body.fontsize.p12,
    color: colors.PRIMARY.DARK,
  },
};

export const HeadingLarge1 = props => <DynamicComponent {...textStyle.headingLarge1} {...props} />;
export const HeadingLarge2 = props => <DynamicComponent {...textStyle.headingLarge2} {...props} />;
export const HeadingLarge3 = props => <DynamicComponent {...textStyle.headingLarge3} {...props} />;
export const HeadingLarge4 = props => <DynamicComponent {...textStyle.headingLarge4} {...props} />;
export const HeadingLarge5 = props => <DynamicComponent {...textStyle.headingLarge5} {...props} />;
export const HeadingLarge6 = props => <DynamicComponent {...textStyle.headingLarge6} {...props} />;

export const HeadingSmall1 = props => <DynamicComponent {...textStyle.headingSmall1} {...props} />;
export const HeadingSmall2 = props => <DynamicComponent {...textStyle.headingSmall2} {...props} />;
export const HeadingSmall3 = props => <DynamicComponent {...textStyle.headingSmall3} {...props} />;
export const HeadingSmall4 = props => <DynamicComponent {...textStyle.headingSmall4} {...props} />;
export const HeadingSmall5 = props => <DynamicComponent {...textStyle.headingSmall5} {...props} />;
export const HeadingSmall6 = props => <DynamicComponent {...textStyle.headingSmall6} {...props} />;

export const Bodylargeprimary = props => <DynamicComponent {...textStyle.bodylarge1} {...props} />;
export const Bodylargesecondary = props => (
  <DynamicComponent {...textStyle.bodylarge2} {...props} />
);
export const Bodylargetertiary = props => <DynamicComponent {...textStyle.bodylarge3} {...props} />;

export const Bodysmallprimary = props => <DynamicComponent {...textStyle.bodysmall1} {...props} />;
export const Bodysmallsecondary = props => (
  <DynamicComponent {...textStyle.bodysmall2} {...props} />
);
export const Bodysmalltertiary = props => <DynamicComponent {...textStyle.bodysmall3} {...props} />;

export const BodyText1 = props => <DynamicComponent {...textStyle.bodyText1} {...props} />;
export const BodyText2 = props => <DynamicComponent {...textStyle.bodyText2} {...props} />;
export const BodyText3 = props => <DynamicComponent {...textStyle.bodyText3} {...props} />;
export const BodyText4 = props => <DynamicComponent {...textStyle.bodyText4} {...props} />;
export const BodyText5 = props => <DynamicComponent {...textStyle.bodyText5} {...props} />;
export const BodyText6 = props => <DynamicComponent {...textStyle.bodyText6} {...props} />;
export const BodyText7 = props => <DynamicComponent {...textStyle.bodyText7} {...props} />;
export const BodyText8 = props => <DynamicComponent {...textStyle.bodyText8} {...props} />;
export const BodyText9 = props => <DynamicComponent {...textStyle.bodyText9} {...props} />;
export const BodyText10 = props => <DynamicComponent {...textStyle.bodyText10} {...props} />;
export const BodyText11 = props => <DynamicComponent {...textStyle.bodyText11} {...props} />;
export const BodyText12 = props => <DynamicComponent {...textStyle.bodyText12} {...props} />;
export const BodyText13 = props => <DynamicComponent {...textStyle.bodyText13} {...props} />;

export const Nav = props => <DynamicComponent {...textStyle.navText} {...props} />;
