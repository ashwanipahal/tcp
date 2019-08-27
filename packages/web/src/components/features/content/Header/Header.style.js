import { css } from 'styled-components';

export default css`
  margin-bottom: 8px;

  @media ${props => props.theme.mediaQuery.large} {
    margin-bottom: 24px;
  }
`;
