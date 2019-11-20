import { css } from 'styled-components';

const ctaStyle = css`
  display: block;
  margin-bottom: ${props =>
    props.isBagPageStickyHeader ? '0' : props.theme.spacing.ELEM_SPACING.MED};
  .check-out-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .view-bag {
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.DARK};
    }
    width: inherit;
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
    height: 48px;
  }

  .checkout-button {
    padding-top: 10px;
  }

  .checkout {
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
    }
    height: 48px;
    margin-left: ${props =>
      props.isInternationalShipping ? '0px' : props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    flex: 1;
    background-color: ${props => props.theme.colors.PRIMARY.BLUE};
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-left: 0;
    }
  }
  .payPal-button {
    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }

  .paypal-venmo {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
  }
  .paypal-wrapper {
    width: 100%;
    @media ${props => props.theme.mediaQuery.large} {
      min-width: 220px;
    }
  }
  .paypal-wrapper-atb {
    width: 100%;
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-right: 10px;
    }
  }
  .venmo-wrapper {
    display: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
      width: 100%;
      margin-left: 6px;
    }
  }
  .addBagActions-error {
    background: transparent;

    span {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
  }
  .checkoutBtnTracker {
    display: inline-flex;
    /* flex: ${props => (props.isBagPageStickyHeader ? '1' : 'none')}; */
    flex: 1;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
export default ctaStyle;
