import React from 'react';
import theme from '@tcp/core/styles/themes/TCP';
import DynamicComponent from './DynamicComponent';

const { colors, fonts } = theme;

const HeadingLargeOne = props => <DynamicComponent primary {...props} />;
const HeadingLargeTwo = props => <DynamicComponent {...props} />;
const HeadingLargeThree = props => <DynamicComponent {...props} />;
const HeadingLargeFour = props => <DynamicComponent {...props} />;
const HeadingLargeFive = props => <DynamicComponent {...props} />;
const HeadingLargeSix = props => <DynamicComponent {...props} />;

const HeadingSmallOne = props => <DynamicComponent {...props} />;
const HeadingSmallTwo = props => <DynamicComponent {...props} />;
const HeadingSmallThree = props => <DynamicComponent {...props} />;
const HeadingSmallFour = props => <DynamicComponent {...props} />;
const HeadingSmallFive = props => <DynamicComponent {...props} />;
const HeadingSmallSix = props => <DynamicComponent {...props} />;

const Bodylargeprimary = props => <DynamicComponent {...props} />;
const Bodylargesecondary = props => <DynamicComponent {...props} />;
const Bodylargetertiary = props => <DynamicComponent {...props} />;

const Bodysmallprimary = props => <DynamicComponent {...props} />;
const Bodysmallsecondary = props => <DynamicComponent {...props} />;
const Bodysmalltertiary = props => <DynamicComponent {...props} />;

const BodyTextOne = props => <DynamicComponent {...props} />;
const BodyTextTwo = props => <DynamicComponent {...props} />;
const BodyTextThree = props => <DynamicComponent {...props} />;
const BodyTextFour = props => <DynamicComponent {...props} />;
const BodyTextFive = props => <DynamicComponent {...props} />;
const BodyTextSix = props => <DynamicComponent {...props} />;
const BodyTextSeven = props => <DynamicComponent {...props} />;
const BodyTextEight = props => <DynamicComponent {...props} />;
const BodyTextNine = props => <DynamicComponent {...props} />;
const BodyTextTen = props => <DynamicComponent {...props} />;
const BodyTextEleven = props => <DynamicComponent {...props} />;
const BodyTextTwelve = props => <DynamicComponent {...props} />;
const BodyTextThirteen = props => <DynamicComponent {...props} />;

export {
  HeadingLargeOne,
  HeadingLargeTwo,
  HeadingLargeThree,
  HeadingLargeFour,
  HeadingLargeFive,
  HeadingLargeSix,
  HeadingSmallOne,
  HeadingSmallTwo,
  HeadingSmallThree,
  HeadingSmallFour,
  HeadingSmallFive,
  HeadingSmallSix,
  Bodylargeprimary,
  Bodylargesecondary,
  Bodylargetertiary,
  BodyTextOne,
  BodyTextTwo,
  BodyTextThree,
  BodyTextFour,
  BodyTextFive,
  BodyTextSix,
  BodyTextSeven,
  BodyTextEight,
  BodyTextNine,
  BodyTextTen,
  BodyTextEleven,
  BodyTextTwelve,
  BodyTextThirteen,
  Bodysmallprimary,
  Bodysmallsecondary,
  Bodysmalltertiary,
};

// export const Nav = props => <DynamicComponent {...textStyle.navText} {...props} />;
