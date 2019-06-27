import { css } from 'styled-components';
import {
  typography as typographyStyleSystem,
  color as colorStyleSystem,
} from '@tcp/core/styles/rwdStyleSystem';

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
`;

export default HeadingStyles;
