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
const SubHeadingStyle = styled.Text`
  ${getSubHeadingStyle}
`;
const DescriptionStyle = styled.Text`
  ${getDescriptionStyle}
`;

const CenterAlignWrapper = styled.View`
  display: flex;
  justify-content: ${'center'};
  align-items: center;
`;

const TextAlignCenter = styled.Text`
  text-align: center;
`;

export {
  SectionStyle,
  HeadingStyle,
  SubHeadingStyle,
  DescriptionStyle,
  CenterAlignWrapper,
  TextAlignCenter,
};
