import styled, { css } from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
  margin: auto  ${theme.spacing.APP_LAYOUT_SPACING.SM};
  justify-content: ${'center'};

  `;
};
const SectionStyle = css`
  ${getPageStyle}
`;

/**
 * @param {Object} props : props for getTextBaseStyle
 * @return {Object} : Return object
 * @desc This method get font base style
 */

const getTextBaseStyle = props => {
  const { theme } = props;
  const { typography, colorPalette } = theme;
  return `
  font-size: ${typography.fontSizes.fs12};
  color: ${colorPalette.text.secondary};
  font-family: ${typography.fonts.secondary};
  `;
};
const getHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-weight: ${typography.fontWeights.semibold};
  align-self: ${'center'};
  padding-bottom: ${props.theme.spacing.ELEM_SPACING.XS};
  `;
};

const getSubHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs13};
  margin-bottom: 10px;
  align-self: ${'center'};
  `;
};

const ImageWrapperStyle = () => {
  return `
  ${getTextBaseStyle};
  align-self: ${'center'};
  margin:20px 0 10px 0;
  `;
};
const getDescriptionStyle = props => {
  const { theme } = props;
  const { typography, colorPalette } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs12};
  color: ${colorPalette.text.primary};

  text-align: ${'center'};
  `;
};

const FavtHeadingStyle = () => {
  return `
    padding: 0  0 10px 0;
  `;
};

const FavtSubHeadingStyle = () => {
  // width 57% specific for pixel perfect style of font size
  return `
    width:57%;
    text-align:center;
    margin :0 auto;
  `;
};

const ResetPassword = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${'center'};
`;

const FavtSubHeading = styled.Text`
  ${FavtSubHeadingStyle}
`;

const HeadingStyle = styled.Text`
  ${getHeadingStyle}
`;

const FavtHeading = styled.Text`
  ${FavtHeadingStyle}
`;

const SubHeadingStyle = styled.Text`
  ${getSubHeadingStyle}
`;
const DescriptionStyle = styled.Text`
  ${getDescriptionStyle}
`;

const ImageWrapper = styled.Text`
  ${ImageWrapperStyle}
`;

const WelcomeBackWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export {
  SectionStyle,
  HeadingStyle,
  SubHeadingStyle,
  DescriptionStyle,
  ImageWrapper,
  FavtHeading,
  FavtSubHeading,
  ResetPassword,
  WelcomeBackWrapper,
};
