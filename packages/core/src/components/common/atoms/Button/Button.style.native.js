/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-shadow */
import styled, { css } from 'styled-components/native';
import { StyledText } from '../../../../../styles/globalStyles/StyledText.style';

const getShape = props => {
  const { theme, noCurve, buttonVariation } = props;
  const { isGymboree } = theme;

  if (isGymboree && !noCurve && buttonVariation !== 'mini-nav') {
    return `border-radius: 25.5px;`;
  }
  return `
  null
  `;
};

const style = css`
  min-height: 42px;
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  opacity: ${props => (props.disableButton ? props.theme.opacity.opacity.medium : '1')};
  background: ${props => props.theme.colorPalette.white};
  ${props => getShape(props)};
  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
   width: ${props.width};
   height: ${props.height};
   `
      : ''};
  ${props =>
    props.fill === 'BLUE'
      ? ` background: ${props.theme.colorPalette.blue[700]}; border: 1px solid ${
          props.theme.colorPalette.blue[700]
        }; `
      : ''};
  ${props =>
    props.fill === 'DARK'
      ? ` background: ${props.theme.colorPalette.gray[700]}; border: 1px solid ${
          props.theme.colorPalette.gray[600]
        }; `
      : ''};
  ${props =>
    props.buttonVariation === 'cautionary'
      ? `border: 1px solid ${props.theme.colorPalette.secondary.dark};`
      : ''};

  ${props =>
    props.buttonVariation === 'mini-nav'
      ? `
        border: 0;
        border-bottom-width: 2px;
        border-bottom-color: ${
          props.active ? props.theme.colorPalette.primary.main : 'transparent'
        };
        padding: 3px 5px;
        min-height: auto;
        align-self: flex-start;
        background-color: transparent;
         `
      : ''}
`;

export const CustomStyleText = styled(StyledText)`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.93px;
  opacity: ${props => (props.disableButton ? props.theme.opacity.opacity.medium : '1')};
  font-size: ${props => props.theme.typography.fontSizes.fs13};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  color: ${props => props.color || props.theme.colorPalette.gray[700]};
  padding: 12px 20px;

  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
  padding: ${props.theme.spacing.ELEM_SPACING.SM} ${props.theme.spacing.ELEM_SPACING.XL};
  `
      : ''};

  ${props => (props.fill === 'BLUE' ? ` color: ${props.theme.colorPalette.white}; ` : '')};
  ${props => (props.fill === 'DARK' ? ` color: ${props.theme.colorPalette.white}; ` : '')};

  ${props =>
    props.buttonVariation === 'cautionary'
      ? `
   color: ${props.theme.colorPalette.secondary.dark};
   `
      : ''};

  ${props =>
    props.buttonVariation === 'mini-nav'
      ? `
        padding: 0;
        font-size: ${props.theme.typography.fontSizes.fs14};
        font-weight: ${
          props.active
            ? props.theme.typography.fontWeights.extrabold
            : props.theme.typography.fontWeights.regular
        };
        letter-spacing: 0.3px;
         `
      : ''}
`;

export default style;
