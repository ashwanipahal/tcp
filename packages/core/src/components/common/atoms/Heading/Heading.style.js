import { css } from 'styled-components';

function getHeadingStyle({ theme, large }) {
  return `
    font-size: ${large === 'one' ? theme.large.h1 : ''}px;
  `;
}

const HeadingStyles = css`
  ${props => getHeadingStyle(props)}
`;

export default HeadingStyles;
