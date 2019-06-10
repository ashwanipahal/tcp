import { css } from 'styled-components';

export default css`
  .header-topnav {
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    height: 45px;
  }
  .header-topnav__promo-area {
    text-align: center;
  }
  .header-topnav__track-order {
    text-align: center;
  }
`;
