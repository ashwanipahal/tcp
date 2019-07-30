import styled, { css } from 'styled-components/native';

const SectionStyle = css``;

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
  font-family: ${typography.fonts.primary};
  `;
};
const getHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-weight: ${typography.fontWeights.semibold};
  `;
};

const getSubHeadingStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs13};
  `;
};

const getDescriptionStyle = props => {
  const { theme } = props;
  const { typography, colorPalette } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs12};
  color: ${colorPalette.text.primary};
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
export { SectionStyle, HeadingStyle, SubHeadingStyle, DescriptionStyle };
