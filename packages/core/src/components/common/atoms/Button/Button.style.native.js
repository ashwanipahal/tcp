/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-shadow */
import { css } from 'styled-components/native';

const style = css`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.93px;
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
   width: 40px;
   height: 100px;
   color: ${props.theme.colorPalette.black};
   font-size: ${props.theme.fonts.fontSize.button.size}px
   font-family: ${props.theme.typography.fonts.primary};
   font-weight: ${props.theme.typography.fontWeights.semibold};
   border: 1px solid ${props.theme.colorPalette.black};
   padding: 4px 20px;
   width: 100%;
   margin : 40px;
   ${props.brandName ? ` border-radius: 25px; ` : ''};
 `
      : ''};

  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
 width: ${props.width};
 height: ${props.height};
 min-width: 64px;
 background: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].NORMAL};
 color: ${props.color || props.theme.colorPalette.black};
 font-family: ${props.theme.typography.fonts.secondary};
 font-size: ${props.theme.fonts.fontSize.button.size}px;
 font-weight: ${props.theme.typography.fontWeights.black};
 border: 1px solid ${props.theme.colors.BUTTON[props.fill || 'WHITE'].BORDER};
 padding: 12px 32px;
 ${props.brandName ? ` border-radius: 25px; ` : ''};
 `
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
     background: ${props.fill || props.theme.colorPalette.white};
     ${props.color === 'red' ? ` color: ${props.theme.colorPalette.secondary.dark}; ` : ''};
     ${props.color === 'blue' ? ` color: ${props.theme.colorPalette.primary.dark};` : ''};
     ${props.color === 'gray' ? ` color: ${props.theme.colorPalette.gray[700]};` : ''};
     font-family: ${props.theme.typography.fonts.secondary};
     font-size: ${props.theme.fonts.fontSize.button.size}px;
     font-weight: ${props.theme.typography.fontWeights.extrabold};
     ${
       props.color === 'red'
         ? ` border: 1px solid ${props.theme.colorPalette.secondary.dark}; `
         : ''
     };
     ${
       props.color === 'blue'
         ? ` border: : 1px solid ${props.theme.colorPalette.primary.dark};`
         : ''
     };
     ${props.color === 'gray' ? ` border: 1px solid ${props.theme.colorPalette.gray[700]};` : ''};
     padding: 12px 32px;
     ${props.brandName ? ` border-radius: 25px; ` : ''};
     `
      : ''};
`;

export default style;
