import styled from 'styled-components';

const ButtonStyles = styled.Button`
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
    width: 40px;
    height: 100px;
    color: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].TEXT};
    font-size: ${props.theme.fonts.fontSize.button.size}px;
    font-family: ${props.theme.fonts.mobilesecondaryFontSemilBoldFamily};
    font-weight: ${props.theme.fonts.fontWeight.semiBold};
    border: 1px solid ${props.theme.colors.BUTTON[props.fill || 'WHITE'].BORDER};
    padding: 12px 20px;
    width: 100%;
   `
      : ''};

  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
   width: ${props.width};
   height: ${props.width};
   min-width: 64px;
   background: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].NORMAL};
   color: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].TEXT};
   font-family: ${props.theme.fonts.mobileSecondaryFontFamily};
   font-size: ${props.theme.fonts.fontSize.button.size}px;
   font-weight: ${props.theme.fonts.fontWeight.black};
   border: 1px solid ${props.theme.colors.BUTTON[props.fill || 'WHITE'].BORDER};
   padding: 12px 32px;
  `
      : ''};

  ${props => (props.fullWidth ? ` width: 100% ; ` : '')};
`;

const ViewWrapper = styled.View`
  margin: ${props => props.margin || '40px'};
  border: ${props => props.border || '0.5px'};
  background: transparent;
`;

export { ButtonStyles, ViewWrapper };
