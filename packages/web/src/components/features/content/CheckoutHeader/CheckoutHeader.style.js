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
      padding: 15px 15px 0 6px;
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      display: flex;
      justify-content: center;
    }
  }

  .header-stepindicator {
    position: relative;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    width: 100%;
  }

  .header-topnav__brand-tabs,
  .header-topnav__track-order,
  .header-topnav__promo-area {
    float: left;
  }

  .header-topnav__brand-tabs {
    @media ${props => props.theme.mediaQuery.mediumMax} {
      padding-top: 0;
      text-align: center;
    }
  }

  .header-topnav__promo-area {
    text-align: center;

    @media ${props => props.theme.mediaQuery.large} {
      padding-top: 12px;
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
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
    left: 0px;
    border: none;
    background: transparent;

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }

  .checkout-mobile-header {
    text-align: center;
    padding: 10px 0;
    margin-left: 0;
    width: 100%;
    border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }

  .non-checkout-pages & {
    display: none;
  }
`;
