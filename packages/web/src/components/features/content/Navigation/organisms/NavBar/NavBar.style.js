import { css } from 'styled-components';

export default css`
  list-style-type: none;

  @media ${props => props.theme.mediaQuery.large} {
    padding: 0 15px;
  }

  @media ${props => props.theme.mediaQuery.large} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.colorPalette.text.disabled};
  }
`;
