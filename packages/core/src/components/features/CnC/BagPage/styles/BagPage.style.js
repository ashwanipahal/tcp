import { css } from 'styled-components';

const styles = css`
  .row-ele {
    width: 100%;
    margin: 15px 0;
    background: #fff;
  }
  .order-summary {
    @media ${props => props.theme.mediaQuery.medium} {
      margin: 16px 0;
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
  }

  button.checkout {
    width: 100%;
    margin: 0 0 10px 0;
    padding: 16px 0;
  }
`;

export default styles;
