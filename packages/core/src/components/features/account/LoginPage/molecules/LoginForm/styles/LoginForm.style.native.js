import styled, { css } from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
  margin: ${theme.spacing.APP_LAYOUT_SPACING.SM} ${theme.spacing.APP_LAYOUT_SPACING.XS} auto ${
    theme.spacing.APP_LAYOUT_SPACING.XS
  };
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

/**
 * @param {Object} props : props for getTextBaseStyle
 * @return {Object} : Return object
 * @desc This method get font base style
 */
const getDescriptionStyle = props => {
  const { theme } = props;
  const { typography, colorPalette } = theme;
  return `
  ${getTextBaseStyle};
  font-size: ${typography.fontSizes.fs12};
  color: ${colorPalette.text.primary};
  margin-top: ${'27px'};
  text-align: ${'center'};
  `;
};

const DescriptionStyle = styled.Text`
  ${getDescriptionStyle}
`;

const ModalHeading = styled.Text`
  margin-top: 30px;
  margin-right: 50px;
  margin-left: 15px;
`;

const ModalViewWrapper = styled.View`
  margin-top: 10px;
`;

export { FormStyle, DescriptionStyle, ModalHeading, ModalViewWrapper };
