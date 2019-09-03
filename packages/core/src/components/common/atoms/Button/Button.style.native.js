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
`;

export default style;
