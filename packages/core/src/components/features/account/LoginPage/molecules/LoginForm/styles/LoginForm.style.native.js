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
  width:${props.theme.spacing.ELEM_SPACING.XL};
  background: ${props.theme.colorPalette.white};
  height:${props.theme.spacing.ELEM_SPACING.MED};
  position: absolute;
  right: 0;
  top: 20px;
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

const GuestButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const IconContainer = styled.View`
  position: absolute;
  right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export {
  FormStyle,
  DescriptionStyle,
  ShowHideWrapper,
  HideShowFieldWrapper,
  GuestButtonWrapper,
  IconContainer,
};
