import { css } from 'styled-components';
import createTypographyStyle from '@tcp/core/styles/createTypographyStyle';

function getStyle(props) {
  const { theme, variant, color, inverted, textAlign } = props;
  const { colorPallete, typography, breakpoints } = theme;
  const fontColor = inverted ? colorPallete.white : colorPallete.text[color] || color;

  return `
    ${createTypographyStyle({ breakpoints, textAlign, ...typography[variant] })}
    color: ${fontColor};
  `;
}

const HeadingStyles = css`
  ${getStyle}
`;

export default HeadingStyles;
