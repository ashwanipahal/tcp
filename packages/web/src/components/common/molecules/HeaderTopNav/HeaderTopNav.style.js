import { css } from 'styled-components';

export default css`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};

  .header-topnav__promo-area {
    text-align: center;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }
  .header-topnav__track-order {
    text-align: right;
    padding-top: 15px;
  }
`;
