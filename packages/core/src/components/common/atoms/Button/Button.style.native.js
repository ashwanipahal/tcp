/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-shadow */
import styled, { css } from 'styled-components/native';
import { StyledText } from '../../../../../styles/globalStyles/StyledText.style';

const getShape = props => {
  const { theme, orverrideGymboree } = props;
  const { isGymboree } = theme;

  if (isGymboree && !orverrideGymboree) {
    return `border-radius: 25px;`;
  }
  return `
  null
  `;
};

const style = css`
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
   min-width: 40px;
   height: 100px;
   border: 1px solid ${props.theme.colorPalette.black};
   padding: 4px 20px;
   width: 100%;
   margin : 40px;
   align-items:center;
   ${getShape(props)}
 `
      : ''};

  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
 width: ${props.width};
 height: ${props.height};
 min-width: 64px;
 background: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].NORMAL};
 border: 1px solid ${props.theme.colors.BUTTON[props.fill || 'WHITE'].BORDER};
 align-items:center;
 ${getShape(props)}`
      : ''};

  ${props => (props.fullWidth ? `width: 100% ;` : '')};

  ${props =>
    props.customStyle === 'shadow-button'
      ? `
     background: ${props.theme.colors.PRIMARY.PALEGRAY};
     border-radius: 10px;
     padding: 4px 0;
     border: 2px solid ${props.theme.colors.PRIMARY.LIGHTGRAY};
     width: 100%;
     &:hover, &:focus {
       background: ${props.theme.colors.PRIMARY.COLOR1};
       box-shadow: 4px 4px white inset, 6px 6px ${props.theme.colors.PRIMARY.COLOR1};
       border: 2px solid ${props.theme.colors.PRIMARY.GRAY};
     }
     @media ${props.theme.mediaQuery.large} {
       padding: 11px 0;
       box-shadow: 10px 10px white inset, 12px 12px ${props.theme.colors.PRIMARY.PALEGRAY};
       width: calc(100% - 12px);
       &:hover, &:focus {
         box-shadow: 10px 10px white inset, 12px 12px ${props.theme.colors.PRIMARY.COLOR1};
       }
     }
   `
      : ''};

  ${props =>
    props.buttonVariation === 'cautionary-button'
      ? `
     width: ${props.width};
     height: ${props.height};
     min-height: 45px;
     background: ${props.fill || props.theme.colorPalette.white};
     ${
       props.color === 'red'
         ? ` border: 1px solid ${props.theme.colorPalette.secondary.dark}; `
         : ''
     };
     ${props.color === 'blue' ? ` border: 1px solid ${props.theme.colorPalette.blue[700]};` : ''};
     ${props.color === 'gray' ? ` border: 1px solid ${props.theme.colorPalette.gray[700]};` : ''};
     align-items:center;
     justify-content:center;
     ${getShape(props)}

     `
      : ''};
`;

export const CustomStyleText = styled(StyledText)`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.93px;
  opacity: ${props => (props.disableButton ? props.theme.opacity.opacity.medium : '1')};
  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
color: ${props.color || props.theme.colorPalette.black};
font-family: ${props.theme.typography.fonts.secondary};
font-size: ${props.theme.fonts.fontSize.button.size}px;
font-weight: ${props.theme.typography.fontWeights.black};
padding: 12px 32px;
`
      : ''};

  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
width: 40px;
height: 100px;
color: ${props.theme.colorPalette[props.color || 'black']};
font-size: ${props.theme.fonts.fontSize.button.size}px
font-family: ${props.theme.typography.fonts.primary};
font-weight: ${props.theme.typography.fontWeights.semibold};
border: 1px solid ${props.theme.colorPalette.black};
padding: 4px 20px;
width: 100%;
margin : 40px;
`
      : ''};

  ${props =>
    props.buttonVariation === 'cautionary-button'
      ? `
   width: ${props.width};
   height: ${props.height};
   ${props.color === 'red' ? ` color: ${props.theme.colorPalette.secondary.dark}; ` : ''};
   ${props.color === 'blue' ? ` color: ${props.theme.colorPalette.blue[700]};` : ''};
   ${props.color === 'gray' ? ` color: ${props.theme.colorPalette.gray[700]};` : ''};
   font-family: ${props.theme.typography.fonts.secondary};
   font-size: ${props.theme.fonts.fontSize.button.size}px;
   font-weight: ${props.theme.typography.fontWeights.extrabold};
   text-align:center;
   padding: 12px 32px;
   `
      : ''};
`;

export default style;
