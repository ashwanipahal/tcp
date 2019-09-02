/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-shadow */
import styled, { css } from 'styled-components/native';
import { StyledText } from '../../../../../styles/globalStyles/StyledText.style';

const getShape = props => {
  const { theme, noCurve } = props;
  const { isGymboree } = theme;

  if (isGymboree && !noCurve) {
    return `border-radius: 25.5px;`;
  }
  return `
  null
  `;
};

const style = css`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  opacity: ${props => (props.disableButton ? props.theme.opacity.opacity.medium : '1')};
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
 ${getShape(props)}
  `
      : ''};

  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
   width: ${props.width};
   height: ${props.height};
   ${props.fill === 'RED' ? `  background: ${props.theme.colorPalette.secondary.dark};  ` : ''};
   ${props.fill === 'BLUE' ? ` background: ${props.theme.colorPalette.blue[700]};` : ''};
   ${props.fill === 'BLACK' ? ` background: ${props.theme.colorPalette.gray[700]};` : ''};

   ${
     props.fill === 'RED' ? `  border: 1px solid ${props.theme.colorPalette.secondary.dark};  ` : ''
   };
   ${props.fill === 'BLUE' ? ` border: 1px solid ${props.theme.colorPalette.blue[700]};` : ''};
   ${props.fill === 'BLACK' ? ` border: 1px solid ${props.theme.colorPalette.gray[600]};` : ''};
   ${getShape(props)}
   `
      : ''};

  ${props =>
    props.buttonVariation === 'cautionary-button'
      ? `
     background: ${props.fill || props.theme.colorPalette.white};
     ${
       props.color === 'red'
         ? ` border: 1px solid ${props.theme.colorPalette.secondary.dark}; `
         : ''
     };
     ${props.color === 'gray' ? ` border: 1px solid ${props.theme.colorPalette.gray[700]};` : ''};
     ${getShape(props)} `
      : ''};
`;

export const CustomStyleText = styled(StyledText)`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.93px;
  opacity: ${props => (props.disableButton ? props.theme.opacity.opacity.medium : '1')};
  font-size: ${props => props.theme.typography.fontSizes.fs13};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
  color: ${props.color || props.theme.colorPalette.gray[700]};
  padding: ${props.theme.spacing.ELEM_SPACING.SM} ${props.theme.spacing.ELEM_SPACING.XL};
  `
      : ''};

  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
  color: ${props.color || props.theme.colorPalette.gray[700]};
  padding: 12px 20px;
  `
      : ''};

  ${props =>
    props.buttonVariation === 'cautionary-button'
      ? `
   ${props.color === 'red' ? ` color: ${props.theme.colorPalette.secondary.dark}; ` : ''};
   ${props.color === 'gray' ? ` color: ${props.theme.colorPalette.gray[700]};` : ''};
   padding: ${props.theme.spacing.ELEM_SPACING.SM} ${props.theme.spacing.ELEM_SPACING.XL};
   `
      : ''};
`;

export default style;
