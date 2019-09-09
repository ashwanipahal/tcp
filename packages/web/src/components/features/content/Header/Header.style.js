import { css } from 'styled-components';

export default css`
  margin-bottom: 8px;

  @media ${props => props.theme.mediaQuery.large} {
    margin-bottom: 24px;
  }

  .header-middle-nav-bar {
    border-bottom: 1px solid ${props => props.theme.colorPalette.text.disabled};
  }

  .checkout-pages & {
    display: none;
  }
`;
