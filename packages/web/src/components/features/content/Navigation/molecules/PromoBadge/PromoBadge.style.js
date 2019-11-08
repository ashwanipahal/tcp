import { css } from 'styled-components';
import orange from '@tcp/core/styles/themes/colors/orange';

export default css`
  &.nav-bar-l1-promo-badge {
    padding: 7px 25px;
    border-radius: ${props => (props.theme.isGymboree ? '12.5px' : '5px')};
    background-color: ${props =>
      props.theme.isGymboree ? orange['900'] : props.theme.colorPalette.primary.main};
  }
`;
