import { css } from 'styled-components/native';
import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';
import {
  androidFontStyles,
  iosFontStyles,
} from '../../../../../styles/globalStyles/StyledText.style';

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
  ${iosFontStyles}
`;

export default HeadingStyles;
