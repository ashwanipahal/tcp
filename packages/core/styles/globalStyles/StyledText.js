import styled, { css } from 'styled-components/native';
// eslint-disable-next-line import/no-unresolved
import { Platform } from 'react-native';

// This css add font logic to android platform for different type of font families
const androidFontStyles = css`
  ${props =>
    Platform.OS === `android` && props.fontWeight && props.fontFamily
      ? `
     font-family: ${props.theme.typography.androidFonts[props.fontFamily]}_${props.fontWeight};
     font-weight: normal;
     `
      : ''};
  ${props =>
    Platform.OS === `android` &&
    (!props.fontWeight || props.fontWeight === 'regular') &&
    props.fontFamily
      ? `
      font-family: ${props.theme.typography.androidFonts[props.fontFamily]};
      font-weight: normal;
      `
      : ''};
`;

const StyledText = styled.Text`
  ${androidFontStyles}
`;

export { androidFontStyles, StyledText };
