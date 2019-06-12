import styled from 'styled-components';
import {
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
} from '@tcp/core/styles/globalStyles/typography';
import theme from '@tcp/core/styles/themes/TCP';

const { colors, fonts } = theme;

const HeadingLarge1 = styled(HeadingLargeOne)`
  font-size: ${fonts.fontSize.heading.large.h1}px;
  color: ${props =>
    props.largeHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.largeHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.largeHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingLarge2 = styled(HeadingLargeTwo)`
  font-size: ${fonts.fontSize.heading.large.h2}px;
  color: ${props =>
    props.largeHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.largeHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.largeHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingLarge3 = styled(HeadingLargeThree)`
  font-size: ${fonts.fontSize.heading.large.h3}px;
  ${props =>
    props.largeHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.largeHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.largeHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingLarge4 = styled(HeadingLargeFour)`
  font-size: ${fonts.fontSize.heading.large.h4}px;
  ${props =>
    props.largeHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.largeHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.largeHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingLarge5 = styled(HeadingLargeFive)`
  font-size: ${fonts.fontSize.heading.large.h5}px;
  ${props =>
    props.largeHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.largeHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.largeHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingLarge6 = styled(HeadingLargeSix)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  ${props =>
    props.largeHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.largeHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.largeHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingSmall1 = styled(HeadingSmallOne)`
  font-size: ${fonts.fontSize.heading.small.h1}px;
  ${props =>
    props.smallHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.smallHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.smallHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingSmall2 = styled(HeadingSmallTwo)`
  font-size: ${fonts.fontSize.heading.small.h2}px;
  ${props =>
    props.smallHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.smallHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.smallHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingSmall3 = styled(HeadingSmallThree)`
  font-size: ${fonts.fontSize.heading.small.h3}px;
  ${props =>
    props.smallHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.smallHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.smallHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingSmall4 = styled(HeadingSmallFour)`
  font-size: ${fonts.fontSize.heading.large.h4}px;
  ${props =>
    props.smallHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.smallHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.smallHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingSmall5 = styled(HeadingSmallFive)`
  font-size: ${fonts.fontSize.heading.large.h5}px;
  ${props =>
    props.smallHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.smallHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.smallHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const HeadingSmall6 = styled(HeadingSmallSix)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  ${props =>
    props.smallHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.smallHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.smallHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;
const Bodylarge1 = styled(Bodylargeprimary)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const Bodylarge2 = styled(Bodylargesecondary)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const Bodylarge3 = styled(Bodylargetertiary)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;

const BodyText1 = styled(BodyTextOne)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText2 = styled(BodyTextTwo)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText3 = styled(BodyTextThree)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText4 = styled(BodyTextFour)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText5 = styled(BodyTextFive)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText6 = styled(BodyTextSix)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText7 = styled(BodyTextSeven)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText8 = styled(BodyTextEight)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText9 = styled(BodyTextNine)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText10 = styled(BodyTextTen)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText11 = styled(BodyTextEleven)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText12 = styled(BodyTextTwelve)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;
const BodyText13 = styled(BodyTextThirteen)`
  font-size: ${fonts.fontSize.heading.large.h6}px;
  color: ${colors.PRIMARY.BLUE};
`;

const Bodysmall1 = styled(Bodysmallprimary)`
  font-size: ${fonts.fontSize.body.small.primary}px;
  color: ${colors.PRIMARY.BLUE};
`;

const Bodysmall2 = styled(Bodysmallsecondary)`
  font-size: ${fonts.fontSize.body.small.secondary}px;
  color: ${colors.PRIMARY.BLUE};
`;

const Bodysmall3 = styled(Bodysmalltertiary)`
  font-size: ${fonts.fontSize.body.small.tertiary}px;
  color: ${colors.PRIMARY.BLUE};
`;

export {
  HeadingLarge1,
  HeadingLarge2,
  HeadingLarge3,
  HeadingLarge4,
  HeadingLarge5,
  HeadingLarge6,
  HeadingSmall1,
  HeadingSmall2,
  HeadingSmall3,
  HeadingSmall4,
  HeadingSmall5,
  HeadingSmall6,
  Bodylarge1,
  Bodylarge2,
  Bodylarge3,
  BodyText1,
  BodyText2,
  BodyText3,
  BodyText4,
  BodyText5,
  BodyText6,
  BodyText7,
  BodyText8,
  BodyText9,
  BodyText10,
  BodyText11,
  BodyText12,
  BodyText13,
  Bodysmall1,
  Bodysmall2,
  Bodysmall3,
};
