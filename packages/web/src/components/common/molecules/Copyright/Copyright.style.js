import { css } from 'styled-components';

export default css`
  font-size: 12px;
  padding: 24px 0;
  color: ${props => props.theme.colors.WHITE};

  @media ${props => props.theme.mediaQuery.large} {
    color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  }

  p {
    margin: 0;
  }
`;
