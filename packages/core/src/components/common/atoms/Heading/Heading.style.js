import { css } from 'styled-components';

function getStyle(props) {
  const { theme, kind, color, mode, inverted, align } = props;
  const {
    colors,
    fonts: { fontSize, fontWeight, primaryFontFamily, secondaryFontFamily },
    mediaQuery,
  } = theme;

  const { large: largeHeading, small: smallHeading } = fontSize.heading;
  const { TEXT: textColors } = colors;

  const fontKindMap = {
    h1: { weight: fontWeight.bold, family: primaryFontFamily },
    h2: { weight: fontWeight.bold, family: primaryFontFamily },
    h3: { weight: fontWeight.bold, family: primaryFontFamily },
    h4: { weight: fontWeight.normal, family: primaryFontFamily },
    h5: { weight: fontWeight.normal, family: primaryFontFamily },
    h6: { weight: fontWeight.semibold, family: secondaryFontFamily },
  };

  const colorsMap = {
    primary: textColors.DARK,
    // TODO: Need to fix BLUE and DARKBLUE color; blue is Darkblue and darkblue is blue;
    secondary: mode === 'light' ? textColors.BLUE : textColors.DARKERBLUE,
    tertiary: textColors.GREEN,
    // TODO: Need to fix the PINK which is red
    red: mode === 'light' ? textColors.PINK : textColors.RED,
    darkgray: textColors.DARKGRAY,
    gray: textColors.GRAY,
    lightgray: textColors.LIGHTGRAY,
  };

  const defaultDeviceFontSize = smallHeading[kind] || smallHeading.h1;
  const largeDeviceFontSize = largeHeading[kind] || largeHeading.h1;
  const fontColor = inverted ? colors.WHITE : colorsMap[color] || color;

  return `
    font-size: ${defaultDeviceFontSize}px;
    font-weight: ${fontKindMap[kind].weight || 'normal'};
    color: ${fontColor};
    text-align: ${align};

    ${fontKindMap[kind].family ? `font-family: ${fontKindMap[kind].family}` : ''};

    @media ${mediaQuery.large} {
      font-size: ${largeDeviceFontSize}px;
    }
  `;
}

const HeadingStyles = css`
  ${getStyle}
`;

export default HeadingStyles;
