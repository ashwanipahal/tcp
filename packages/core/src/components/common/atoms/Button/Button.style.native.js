import styled from 'styled-components';

const ButtonStyles = styled.Button`
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
    width: 40px;
    height: 100px;
    color: ${props.theme.colorPalette.white};
    font-size: ${props.theme.typography.fontSizes.fs16};
    font-family: ${props.theme.typography.mobileFonts.primary};
    font-weight: ${props.theme.typography.fontWeights.semibold};
    border: 1px solid ${props.theme.colorPalette.black};
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
   background: ${props.theme.colorPalette.white};
   color: ${props.theme.colorPalette.black};
   font-family: ${props.theme.typography.mobileFonts.primary};
   font-size: ${props.theme.typography.fontSizes.fs14};
   font-weight: ${props.theme.typography.fontWeights.black};
   border: 1px solid ${props.theme.colorPalette.black};
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
