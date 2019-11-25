import { css } from 'styled-components';

const styles = css`
  .row-ele {
    width: 100%;
    margin: 15px 0;
    background: #fff;
  }
  .order-summary {
    padding-bottom: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 16px 0;
      .checkoutBtnTracker {
        flex: none;
      }
    }
    .item-closed {
      .elem-mb-MED {
        margin-bottom: 0;
      }
    }
  }

  .cartPageTitleHeader {
    @media ${props => props.theme.mediaQuery.medium} {
      pointer-events: none;
    }
  }

  .information-header {
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 1px;
  }

  .bag-header {
    margin: 0;
    padding: 20px 0 20px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      text-align: center;
      padding: 13px 0 0;
      margin: 0;
      font-size: ${props => props.theme.fonts.fontSize.anchor.xlarge}px;
      font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    }
    @media ${props => props.theme.mediaQuery.medium} {
      padding-left: 3px;
    }
  }

  .delete-msg {
    border: solid 2px ${props => props.theme.colors.NOTIFICATION.SUCCESS};
    text-align: left;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    background: ${props => props.theme.colors.WHITE};
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    .tick-icon {
      height: 23px;
      width: 23px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .estimatedHeaderText {
    display: none;
  }

  .bag-condensed-header {
    display: none;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .bag-condensed-header {
      display: block;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      right: 0;
      z-index: ${props => props.theme.zindex.zLoader};
      background: ${props => props.theme.colors.WHITE};
      width: 100%;
      margin: 0;
      border-bottom: 1px solid ${props => props.theme.colorPalette.gray[300]};
    }
    .bagHeaderText {
      display: flex;
      align-items: center;
    }
  }

  .hidden-condensed-header {
    display: none;
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .activeSection {
      display: block;
    }
    .inActiveSection {
      display: none;
    }
    .activeHeader {
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
      font-size: ${props => props.theme.typography.fontSizes.fs18};
    }
    .estimatedHeaderText {
      display: block;
      text-align: center;
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
    .activeEstimatedHeader {
      border-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
        ${props => props.theme.colors.TEXT.DARKERGRAY};
    }
    .stickyBagHeader {
      margin-left: 0;
      margin-right: 0;
      position: sticky;
      z-index: ${props => props.theme.zindex.zLoader};
      background: ${props => props.theme.colors.WHITE};
    }
  }

  .save-for-later-section-heading {
    display: block;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }

  .bag-header-sfl {
    display: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
      font-size: ${props => props.theme.typography.fontSizes.fs18};
    }
  }

  .recentlyViewed {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;

export const addedToBagActionsStyles = css`
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

  margin-bottom: 0px;

  .checkout-button.checkout-button-bagHeader {
    flex-direction: row;
    margin-top: 7px;
    float: right;
    width: 324px;
    padding: 0 3px 0 13px;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 366px;
    }
    .checkout {
      height: 42px;
      padding: 12px 0;
    }
    .paypal-venmo {
      flex: 1;
      display: inline-flex;
      margin-bottom: 7px;
      ${props => (!props.isVenmoEnabled && !props.isPayPalEnabled ? `flex: none;` : '')};
      .paypal-wrapper {
        min-width: auto;
      }
      .venmo-button {
        height: 42px;
      }
    }
  }

  .checkout-sticky-header {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .checkout-button {
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    width: 100%;
    margin: 0;
    padding: 0 13px 0;
    box-sizing: border-box;
    margin-top: 35px;
    @media ${props => props.theme.mediaQuery.smallMax} {
      margin-top: 0;
      padding: 0;
      ${props =>
        !props.isVenmoEnabled || !props.isPayPalEnabled
          ? `flex-direction: row;
          .checkoutBtnTracker {
            flex: 1;
            padding-left: 8px;
          }`
          : ''};
      ${props =>
        !props.isVenmoEnabled && !props.isPayPalEnabled
          ? `.checkoutBtnTracker {
              flex: 1;
              padding-left: 0;
            }`
          : ''};
      .checkout {
        height: 42px;
        padding: 12px 0;
      }
      .paypal-wrapper {
        min-width: 170px;
        height: 42px;
      }
      .venmo-button {
        min-width: 170px;
        height: 42px;
      }
    }
  }

  button.checkout {
    width: 100%;
    margin: 0 0 10px 0;
    padding: 16px 0;
  }
`;

export const recommendationStyles = css`
  && .slick-list {
    margin-right: 0;
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    &.recommendations-tile {
      .recommendations-section-row {
        padding-left: 6px;
      }
    }
    .added-to-bag {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default styles;
