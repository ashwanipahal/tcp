import styled, { css } from 'styled-components/native';
import { isAndroid } from '../../src/utils/index.native';

// This css add font logic to android platform for different type of font families
const androidFontStyles = css`
  ${props =>
    isAndroid() && props.fontWeight && props.fontFamily
      ? `
     font-family: ${props.theme.typography.androidFonts[props.fontFamily]}_${props.fontWeight};
     font-weight: normal;
     `
      : ''};
  ${props =>
    isAndroid() && (!props.fontWeight || props.fontWeight === 'regular') && props.fontFamily
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
