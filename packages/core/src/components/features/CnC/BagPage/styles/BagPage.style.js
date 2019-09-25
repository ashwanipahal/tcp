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

  .checkout-button {
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    width: 100%;
    margin: 0;
  }

  button.checkout {
    width: 100%;
    margin: 0 0 10px 0;
    padding: 16px 0;
  }

  .bag-header {
    margin: 0;
    padding: 20px 0 20px;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      text-align: center;
      padding: 13px 0 22px;
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

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .activeSection {
      display: block;
    }
    .inActiveSection {
      display: none;
    }
    .activeHeader {
      border-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
        ${props => props.theme.colors.TEXT.DARKERGRAY};
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
      font-size: ${props => props.theme.typography.fontSizes.fs18};
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
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 14px;
    background: #fff;
    margin: 0;
    z-index: 1;
    box-sizing: border-box;
  }
`;

export default styles;
