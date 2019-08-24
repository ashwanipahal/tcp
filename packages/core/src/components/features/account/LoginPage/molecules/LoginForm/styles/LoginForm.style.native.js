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

const ShowHideWrapperStyle = () => `position:relative;`;

const HideShowField = props =>
  `
  position: absolute;
  right: 0;
  top: ${props.theme.spacing.ELEM_SPACING.MED};
  border-bottom-width: 1px;
  border-bottom-color: black;
  `;

const DescriptionStyle = styled.Text`
  ${getDescriptionStyle}
`;

const ShowHideWrapper = styled.View`
  ${ShowHideWrapperStyle}
`;

const HideShowFieldWrapper = styled.View`
  ${HideShowField}
`;

export { FormStyle, DescriptionStyle, ShowHideWrapper, HideShowFieldWrapper };
