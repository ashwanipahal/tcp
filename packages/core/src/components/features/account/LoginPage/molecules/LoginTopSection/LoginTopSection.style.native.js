import styled, { css } from 'styled-components/native';

const getPageStyle = () => {
  return `
  margin-horizontal: ${'30px'}
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

const getHrLineStyle = props => {
  const { topMargin, bottomMargin } = props;
  return `
  margin-top: ${topMargin || '33px'};
  margin-bottom: ${bottomMargin || '17px'};
  border-width: ${0.65};
  border-color: ${'#2e6a91'};
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

const HrLineStyle = styled.View`
  ${getHrLineStyle}
`;
export { SectionStyle, HeadingStyle, SubHeadingStyle, DescriptionStyle, HrLineStyle };
