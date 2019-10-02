import { css } from 'styled-components';

const CtaStyle = css`
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
    @media ${props => props.theme.mediaQuery.smallOnly} {
      bottom: 0;
      left: 0;
      position: fixed;
      width: 92%;
      background: ${props => props.theme.colors.WHITE};
      z-index: ${props => props.theme.zindex.zLoader};
      margin: 0;
      border-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
        ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
        ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .checkout-button-bagHeader {
    flex-direction: row;
  }

  .checkout-sticky-header {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .checkout {
    &:hover {
      background: ${props => props.theme.colors.PRIMARY.BLUE};
    }
    height: 48px;
    margin-left: 10px;
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
  }
  .venmo-wrapper {
    display: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
      width: 100%;
      margin-left: 6px;
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
export default CtaStyle;
