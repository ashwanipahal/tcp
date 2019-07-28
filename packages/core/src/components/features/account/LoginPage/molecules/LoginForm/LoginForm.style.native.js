import styled, { css } from 'styled-components/native';

const getPageStyle = () => {
  return `
  margin-top: ${'30px'}
  margin-horizontal: ${'20px'}
  justify-content: ${'center'};

  `;
};
const FormStyle = css`
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

const HeadingStyle = styled.Text`
  ${getHeadingStyle}
`;

export { FormStyle, HeadingStyle };
