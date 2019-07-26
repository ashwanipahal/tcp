import { css } from 'styled-components/native';
import { Platform } from 'react-native';

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
      color: ${colorPalette.text.disabled};
    `;
  }
  const colorValue = color === '' ? colorPalette.primary.main : color;
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
  const { theme, size } = props;
  const { typography } = theme;
  const sizeValue = size === 0 ? typography.fontSizes.fs20 : size;
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
