import styled, { css } from 'styled-components/native';

const getPageStyle = () => {
  return `
  margin-horizontal: ${'30px'}
  justify-content: ${'center'};

  `;
};
const SectionStyle = css`
  ${getPageStyle}
  .border {
    border-bottom: 1px solid red;
  }
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
  `;
};

const ForgotHeading = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-weight: ${typography.fontWeights.semibold};
  align-self: ${'center'};
  font-size: ${typography.fontSizes.fs16};
  padding:10px 0;
  `;
};

const ForgotDescription = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  align-self: ${'center'};
  font-size: ${typography.fontSizes.fs12};
  padding:10px 0;
  `;
};

const getSubHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs13};
  align-self: ${'center'};
  `;
};

const getDescriptionStyle = props => {
  const { theme } = props;
  const { typography, colorPalette } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs12};
  color: ${colorPalette.text.primary};
  margin-top: ${'10px'};
  text-align: ${'center'};
  `;
};

const HeadingStyle = styled.Text`
  ${getHeadingStyle}
`;
const ForgotHeadingStyle = styled.Text`
  ${ForgotHeading}
`;

const ForgotDescriptionStyle = styled.Text`
  ${ForgotDescription}
`;

const SubHeadingStyle = styled.Text`
  ${getSubHeadingStyle}
`;
const DescriptionStyle = styled.Text`
  ${getDescriptionStyle}
`;

export {
  SectionStyle,
  HeadingStyle,
  SubHeadingStyle,
  DescriptionStyle,
  ForgotHeadingStyle,
  ForgotDescriptionStyle,
};
