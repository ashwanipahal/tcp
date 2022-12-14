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
      background: ${props => props.theme.colorPalette.blue.C900};
    }
    height: 48px;
    margin-left: ${props =>
      props.isInternationalShipping ? '0px' : props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    ${props => (!props.isVenmoEnabled && !props.isPayPalEnabled ? `margin-left: 0;` : '')};
    flex: 1;
    background-color: ${props => props.theme.colorPalette.blue.C900};
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
    z-index: 0;
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
    flex: 1;
  }

  .checkoutSkeleton {
    padding: 0px;
    &:hover {
      background: ${props => props.theme.colorPalette.blue.C900};
    }
    height: 48px;
    margin-left: ${props =>
      props.isInternationalShipping ? '0px' : props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    ${props => (!props.isVenmoEnabled && !props.isPayPalEnabled ? `margin-left: 0;` : '')};
    flex: 1;
    background-color: ${props => props.theme.colorPalette.blue.C900};
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-left: 0;
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
export default ctaStyle;
