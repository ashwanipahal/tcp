import { css } from 'styled-components';

export default css`
  list-style-type: none;
  box-sizing: border-box;
  @media ${props => props.theme.mediaQuery.large} {
    padding: 0 15px;
  }

  @media ${props => props.theme.mediaQuery.large} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
