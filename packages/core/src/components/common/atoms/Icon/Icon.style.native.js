import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getColor, getFontSize } from '@tcp/core/styles/themes/utils';

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
  return `
  color: ${getColor(colorPalette, color) || colorPalette.primary.main}
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
  return `
  font-size: ${getFontSize(typography, size)}
  `;
};

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const IconTouchableOpacity = styled.TouchableOpacity`
  ${getAdditionalStyle}
`;

const Container = styled.View`
  ${getAdditionalStyle}
`;

const IconStyle = css`
  ${props => (props.isDisabled ? ` opacity: 0.6; ` : 'opacity: 1')};
  ${getDisableStyle};
  ${getFontSizeStyle}
`;

export { IconStyle, Container, IconTouchableOpacity };
