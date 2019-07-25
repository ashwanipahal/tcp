import { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { FONT_SIZE_VARIATIONS } from './Icon.constants';

/**
 * @param {Object} props : props for getDisableStyle
 * @return {Object} color : Return color style
 * @desc This method get disabled style
 */
const getDisableStyle = props => {
  const { isDisabled, color, theme } = props;
  const { colorPalette } = theme;
  /* in case of android icon disable color need to be set because opacity doen't work */
  if (isDisabled && Platform.OS === 'android') {
    return `
      color: ${colorPalette.disable};
    `;
  }

  const colorValue = color === '' ? colorPalette.primary.light : color;
  return `
  color: ${colorValue}
  `;
};

/**
 * @param {Object} props : props for getFontSizeStyle
 * @return {Object} font-size : Return font size
 * @desc This method get font size style
 * note: The fontSize converting into 'size' in the Icon.native as Icon accept font size in 'size' insted of fontSize
 */
const getFontSizeStyle = props => {
  const { sizeVariation, theme, size } = props;
  const { fonts } = theme;
  let sizeValue;
  if (
    sizeVariation &&
    FONT_SIZE_VARIATIONS.indexOf(sizeVariation) !== -1 &&
    sizeVariation !== 'custom'
  ) {
    sizeValue = fonts.fontSize.icon[sizeVariation];
  } else {
    sizeValue = size;
  }
  return `
  font-size: ${sizeValue}
  `;
};

const IconStyle = css`
  ${props => (props.isDisabled ? ` opacity: 0.6; ` : 'opacity: 1')};
  ${getDisableStyle};
  ${getFontSizeStyle}
`;

export default IconStyle;
