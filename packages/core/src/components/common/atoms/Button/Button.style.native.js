/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-shadow */
import styled, { css } from 'styled-components/native';
import { StyledText } from '../../../../../styles/globalStyles/StyledText.style';
import { BUTTON_VARIATION } from '.';

const getAdditionalStyle = props => {
  const { margin, padings } = props;
  return {
    ...(margin && { margin }),
    ...(padings && { pading: padings }),
  };
};

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

const getMobileAppFilterButtonViewStyle = props => {
  const {
    theme,
    selected,
    buttonVariation,
    bottomBorderOnly,
    textAlignLeft,
    lightGrayColor,
  } = props;
  const { colorPalette, spacing } = theme;
  const bgColor = selected ? colorPalette.gray[900] : 'transparent';
  const borderColor = lightGrayColor ? colorPalette.gray[1500] : colorPalette.gray[900];
  const padding = spacing.ELEM_SPACING.XXS;

  if (buttonVariation === BUTTON_VARIATION.mobileAppFilter) {
    return `
      ${textAlignLeft ? `justify-content: flex-start` : `justify-content: center`};
      min-width: 80px;
      border: 1px solid ${borderColor};
      padding: ${padding};
      min-height: 23px;
      align-self: center;
      background-color: ${bgColor};
      border-radius: 6px;
      align-items: center;
      ${
        bottomBorderOnly
          ? `
          border-top-width: 0;
          border-left-width: 0;
          border-right-width: 0;
          `
          : ''
      };
    `;
  }
  return `
  null
  `;
};

const getMobileAppSelectFieldViewStyle = props => {
  const { theme, selected, buttonVariation, bottomBorderOnly } = props;
  const { colorPalette } = theme;
  const bgColor = selected ? colorPalette.gray[900] : 'transparent';
  const borderColor = colorPalette.gray[900];

  if (buttonVariation === BUTTON_VARIATION.mobileAppSelect) {
    return `
      width: 100%;
      border: 1px solid ${borderColor};
      background-color: ${bgColor};
      align-items: flex-end;
      justify-content: space-between;
      min-height: 40px;
      height: 40px;
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      ${
        bottomBorderOnly
          ? `
          border-top-width: 0;
          border-left-width: 0;
          border-right-width: 0;
          `
          : ''
      };
    `;
  }
  return `
  null
  `;
};

const getMobileAppFilterButtonTextStyle = props => {
  const { theme, selected, buttonVariation, withNoLineHeight } = props;
  const { colorPalette, typography } = theme;
  const { fontSizes, fontWeights, fonts } = typography;
  let fontColor = colorPalette.gray[1100];
  let fontWeight = fontWeights.semibold;
  let letterSpacing = '0.36px';

  if (selected) {
    // eslint-disable-next-line
    fontColor = colorPalette.white;
    fontWeight = fontWeights.black;
    letterSpacing = '0.71px';
  }
  if (
    buttonVariation === BUTTON_VARIATION.mobileAppFilter ||
    buttonVariation === BUTTON_VARIATION.mobileAppSelect
  ) {
    return `
      letter-spacing: ${letterSpacing};
      font-size: ${fontSizes.fs10};
      font-family: ${fonts.secondary};
      font-weight: ${fontWeight};
      color: ${fontColor};
      text-transform: none;
      padding: 0px;
      ${!withNoLineHeight ? `line-height: 12px` : ''}
    `;
  }
  return `
  null
  `;
};

const getMobileAppFilterIconButtonViewStyle = props => {
  const { theme, buttonVariation, width, height } = props;
  const { colorPalette, spacing } = theme;
  const bgColor = colorPalette.gray[1200];
  const borderColor = colorPalette.gray[1300];
  const padding = spacing.ELEM_SPACING.XS;
  if (buttonVariation === BUTTON_VARIATION.mobileAppFilterIcon) {
    return `
      padding: ${padding}
      min-width: 80px;
      width: ${width || 80};
      height: ${height || 32};
      border: 1px solid ${borderColor};
      min-height: 32px;
      align-self: center;
      background-color: ${bgColor};
      justify-content: center;
      align-items: center;
    `;
  }
  return `
  null
  `;
};

const getMobileAppFilterIconButtonTextStyle = props => {
  const { theme, buttonVariation } = props;
  const { colorPalette, typography } = theme;
  const { fontSizes, fontWeights, fonts } = typography;
  const fontColor = colorPalette.gray[1100];
  const fontWeight = fontWeights.black;
  const letterSpacing = '0.86px';

  if (buttonVariation === BUTTON_VARIATION.mobileAppFilterIcon) {
    return `
      letter-spacing: ${letterSpacing};
      font-size: ${fontSizes.fs13};
      font-family: ${fonts.secondary};
      font-weight: ${fontWeight};
      color: ${fontColor};
      text-transform: none;
      padding: 0px;
    `;
  }
  return `
  null
  `;
};

const TouchableOpacityComponent = styled.TouchableOpacity`
  flex-direction: row;
  ${getAdditionalStyle}
`;

const IconContainer = styled.View`
  position: absolute;
  right: 14px;
  ${props =>
    props.buttonVariation === BUTTON_VARIATION.mobileAppSelect
      ? `
    right: 0;
    bottom: 6px;
  `
      : ''};
`;

const style = css`
  justify-content: center;
  min-height: 32px;
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  opacity: ${props => (props.disableButton ? props.theme.opacity.opacity.medium : '1')};
  background: ${props => props.theme.colorPalette.white};
  ${props =>
    props.width
      ? `
      width: ${props.width};
   `
      : ''};
  ${props => getShape(props)};
  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
   width: ${props.width};
   height: ${props.height};
   background: ${props.theme.colorPalette.gray[300]}
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
    props.fill === 'BLACK'
      ? ` background: ${props.theme.colorPalette.gray[900]}; border: 1px solid ${
          props.theme.colorPalette.gray[900]
        }; `
      : ''};
  ${props =>
    props.fill === 'transparent'
      ? `
      background-color: transparent;
    `
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

  ${getMobileAppFilterButtonViewStyle};
  ${getMobileAppFilterIconButtonViewStyle};
  ${getMobileAppSelectFieldViewStyle};
`;

const CustomStyleText = styled(StyledText)`
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
      ${getAdditionalStyle};
  `
      : ''};

  ${props => (props.fill === 'BLUE' ? ` color: ${props.theme.colorPalette.white}; ` : '')};
  ${props => (props.fill === 'DARK' ? ` color: ${props.theme.colorPalette.white}; ` : '')};
  ${props => (props.fill === 'BLACK' ? ` color: ${props.theme.colorPalette.white}; ` : '')};

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

  ${getMobileAppFilterButtonTextStyle};
  ${getMobileAppFilterIconButtonTextStyle};
`;

export { style, CustomStyleText, TouchableOpacityComponent, IconContainer };
