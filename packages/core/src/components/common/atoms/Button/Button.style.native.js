/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-shadow */
import styled, { css } from 'styled-components/native';
import { StyledText } from '../../../../../styles/globalStyles/StyledText.style';

const getShape = props => {
  const { theme, noShape } = props;
  const { isGymboree } = theme;

  if (isGymboree && !noShape) {
    return `border-radius: 25px;`;
  }
  return `
  null
  `;
};

const style = css`
  flex-direction: row;
  width: auto;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  flex-grow: 0;
  border: 1px solid ${props => props.theme.colorPalette.secondary.black};
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
   ${props.fill === 'BLACK' ? ` background: ${props.theme.colorPalette.black};` : ''};

   ${
     props.fill === 'RED' ? `  border: 1px solid ${props.theme.colorPalette.secondary.dark};  ` : ''
   };
   ${props.fill === 'BLUE' ? ` border: 1px solid ${props.theme.colorPalette.blue[700]};` : ''};
   ${props.fill === 'BLACK' ? ` border: 1px solid ${props.theme.colorPalette.black};` : ''};
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
     ${props.color === 'blue' ? ` border: 1px solid ${props.theme.colorPalette.blue[700]};` : ''};
     ${props.color === 'gray' ? ` border: 1px solid ${props.theme.colorPalette.gray[700]};` : ''};
     ${getShape(props)} `
      : ''};
`;

export const CustomStyleText = styled(StyledText)`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.93px;
  opacity: ${props => (props.disableButton ? props.theme.opacity.opacity.medium : '1')};
  font-size: ${props => props.theme.typography.fontSizes.fs14};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};

  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
  color: ${props.theme.colorPalette[props.color || 'black']};
  padding: 12px 32px;
  `
      : ''};

  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
  color: ${props.theme.colorPalette[props.color || 'black']};
  padding: 4px 20px;
  `
      : ''};

  ${props =>
    props.buttonVariation === 'cautionary-button'
      ? `
   ${props.color === 'red' ? ` color: ${props.theme.colorPalette.secondary.dark}; ` : ''};
   ${props.color === 'blue' ? ` color: ${props.theme.colorPalette.blue[700]};` : ''};
   ${props.color === 'gray' ? ` color: ${props.theme.colorPalette.gray[700]};` : ''};
   padding: 12px 32px;
   `
      : ''};
`;

export default style;
