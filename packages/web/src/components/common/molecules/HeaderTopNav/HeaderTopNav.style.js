import { css } from 'styled-components';

export default css`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};

  .header-topnav__brand-tabs {
    padding-right: 0;
  }

  .header-topnav__promo-area {
    text-align: center;
    padding-top: 15px;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }
  .header-topnav__track-order {
    text-align: right;
    padding-top: 15px;

    @media ${props => props.theme.mediaQuery.mediumMax} {
      padding-right: 0;
    }
  }
`;
