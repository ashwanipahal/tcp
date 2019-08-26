import { css } from 'styled-components';

export default css`
  background-color: ${props => props.theme.colors.WHITE};

  .header-topnav__row {
    overflow: auto;
    padding: 0 14px;
    position: relative;

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0 15px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding: 0 15px 0 6px;
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      padding-left: 25%;
    }
  }

  .header-stepindicator {
    position: relative;
    text-align: center;
  }

  .header-topnav__brand-tabs,
  .header-topnav__track-order,
  .header-topnav__promo-area {
    float: left;
    padding-top: 15px;
  }

  .header-topnav__brand-tabs {
    @media ${props => props.theme.mediaQuery.mediumMax} {
      padding-top: 0;
    }
  }

  .header-topnav__promo-area {
    text-align: center;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }

  .header-topnav__track-order {
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
    text-align: right;
    padding-top: 15px;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      display: none;
    }
  }

  .exitFromCheckout {
    position: absolute;
    top: 16px;
    left: 20px;

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }

  .checkout-mobile-header {
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }
`;
