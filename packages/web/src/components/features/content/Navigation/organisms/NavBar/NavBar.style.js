import { css } from 'styled-components';

export default css`
  list-style-type: none;
  border-bottom: 1px solid #d8d8d8;
  padding: 0 14px;

  @media ${props => props.theme.mediaQuery.medium} {
    padding: 0 15px;
  }

  @media ${props => props.theme.mediaQuery.large} {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #d8d8d8;
  }
`;
