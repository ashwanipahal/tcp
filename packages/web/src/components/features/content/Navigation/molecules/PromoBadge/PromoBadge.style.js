import { css } from 'styled-components';

export default css`
  &.nav-bar-l1-promo-badge {
    padding: 7px 37px;
    border-radius: 5px;
    background-color: ${props => props.theme.colorPalette.primary.main};
  }
`;
