import styled from 'styled-components';
import { HeadingStyle, BodyStyle } from '@tcp/core/styles/globalStyles/typography';
import theme from '@tcp/core/styles/themes/TCP';

const { colors, fonts } = theme;

const Heading = styled(HeadingStyle)`
  ${props => (props.Heading1 === 'one' ? `font-size: ${fonts.fontSize.heading.large.h1}px` : '')};
  ${props => (props.Heading1 === 'two' ? `font-size: ${fonts.fontSize.heading.large.h2}px` : '')};
  ${props => (props.Heading1 === 'three' ? `font-size: ${fonts.fontSize.heading.large.h3}px` : '')};
  ${props => (props.Heading1 === 'four' ? `font-size: ${fonts.fontSize.heading.large.h4}px` : '')};
  ${props => (props.Heading1 === 'five' ? `font-size: ${fonts.fontSize.heading.large.h5}px` : '')};
  ${props => (props.Heading1 === 'six' ? `font-size: ${fonts.fontSize.heading.large.h6}px` : '')};
  ${props => (props.Heading2 === 'one' ? `font-size: ${fonts.fontSize.heading.small.h1}px` : '')};
  ${props => (props.Heading2 === 'two' ? `font-size: ${fonts.fontSize.heading.small.h2}px` : '')};
  ${props => (props.Heading2 === 'three' ? `font-size: ${fonts.fontSize.heading.small.h3}px` : '')};
  ${props => (props.Heading2 === 'four' ? `font-size: ${fonts.fontSize.heading.small.h4}px` : '')};
  ${props => (props.Heading2 === 'five' ? `font-size: ${fonts.fontSize.heading.small.h5}px` : '')};
  ${props => (props.Heading2 === 'six' ? `font-size: ${fonts.fontSize.heading.small.h6}px` : '')};
  ${props =>
    props.largeHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.largeHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.largeHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
  ${props =>
    props.smallHeading === 'primary' ? `color: ${props.theme.colors.PRIMARY.DARK};` : ''};
  ${props =>
    props.smallHeading === 'secondary' ? `color: ${props.theme.colors.PRIMARY.BLUE};` : ''};
  ${props =>
    props.smallHeading === 'tertiary' ? `color: ${props.theme.colors.PRIMARY.GREEN};` : ''};
`;

const BodyCopy = styled(BodyStyle)`
  font-size: ${fonts.fontSize.body.bodytext.p1}px;
  ${props => (props.body1 === 'one' ? `font-size: ${fonts.fontSize.body.bodytext.p1}px` : '')};
  ${props => (props.body1 === 'two' ? `font-size: ${fonts.fontSize.body.bodytext.p2}px` : '')};
  ${props => (props.body1 === 'three' ? `font-size: ${fonts.fontSize.body.bodytext.p3}px` : '')};
  ${props => (props.body1 === 'four' ? `font-size: ${fonts.fontSize.body.bodytext.p4}px` : '')};
  ${props => (props.body1 === 'five' ? `font-size: ${fonts.fontSize.body.bodytext.p5}px` : '')};
  ${props => (props.body1 === 'six' ? `font-size: ${fonts.fontSize.body.bodytext.p6}px` : '')};
  ${props => (props.body1 === 'seven' ? `font-size: ${fonts.fontSize.body.bodytext.p7}px` : '')};
  ${props => (props.body1 === 'eight' ? `font-size: ${fonts.fontSize.body.bodytext.p8}px` : '')};
  ${props => (props.body1 === 'nine' ? `font-size: ${fonts.fontSize.body.bodytext.p9}px` : '')};
  ${props => (props.body1 === 'ten' ? `font-size: ${fonts.fontSize.body.bodytext.p10}px` : '')};
  ${props => (props.body1 === 'eleven' ? `font-size: ${fonts.fontSize.body.bodytext.p11}px` : '')};
  ${props => (props.body1 === 'twelve' ? `font-size: ${fonts.fontSize.body.bodytext.p12}px` : '')};
  ${props =>
    props.body1 === 'thirteen' ? `font-size: ${fonts.fontSize.body.bodytext.p13}px` : ''};
  ${props =>
    props.bodySmall === 'one' ? `font-size: ${fonts.fontSize.body.small.primary}px` : ''};
  ${props =>
    props.bodySmall === 'two' ? `font-size: ${fonts.fontSize.body.small.secondary}px` : ''};
  ${props =>
    props.bodySmall === 'three' ? `font-size: ${fonts.fontSize.body.small.tertiary}px` : ''};

  color: ${colors.PRIMARY.BLUE};
`;

export { Heading, BodyCopy };
