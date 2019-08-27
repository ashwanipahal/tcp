import { css } from 'styled-components/native';
import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';
import { androidFontStyles } from '@tcp/core/styles/globalStyles/StyledText';

function getHeadingStyle(props) {
  const {
    theme: { typography },
    variant,
  } = props;

  return `
   ${typographyStyleSystem({ ...props, ...typography[variant] })}
  `;
}

const HeadingStyles = css`
  ${getHeadingStyle}
  ${colorStyleSystem}
  ${androidFontStyles}
`;

export default HeadingStyles;
