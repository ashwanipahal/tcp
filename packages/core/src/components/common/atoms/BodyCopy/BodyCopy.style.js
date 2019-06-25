import { css } from 'styled-components';

function getStyle(props) {
  const { theme, kind, color, weight, size, inverted, align } = props;
  const {
    colors,
    fonts: { fontSize, fontWeight, primaryFontFamily, secondaryFontFamily },
  } = theme;

  const { bodytext } = fontSize.body;
  const { TEXT: textColors } = colors;

  const fontKindMap = {
    p1: { family: secondaryFontFamily },
    p2: { family: primaryFontFamily },
  };

  const colorsMap = {
    primary: textColors.DARK,
    // TODO: Need to fix BLUE and DARKBLUE color; blue is Darkblue and darkblue is blue;
    // secondary: mode === 'light' ? textColors.BLUE : textColors.DARKERBLUE,
    // tertiary: textColors.GREEN,
    // TODO: Need to fix the PINK which is red
    // red: mode === 'light' ? textColors.PINK : textColors.RED,
    darkgray: textColors.DARKGRAY,
    gray: textColors.GRAY,
    lightgray: textColors.LIGHTGRAY,
  };

  const defaultDeviceFontSize = bodytext[`copy${size}`] || size;
  const fontColor = inverted ? colors.WHITE : colorsMap[color] || color;
  return `
    font-size: ${defaultDeviceFontSize}px;
    font-weight: ${fontWeight[weight]};
    color: ${fontColor};
    text-align: ${align};

    ${fontKindMap[kind].family ? `font-family: ${fontKindMap[kind].family}` : ''};

  `;
}

const BodyCopyStyles = css`
  ${getStyle}
`;

export default BodyCopyStyles;
