import { css } from 'styled-components';

const styles = css`
  .gift_card_box {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.WHITE};
    border: 1px solid ${props => props.theme.colors.PRIMARY.GRAY};
  }

  .gift_apply_button {
    background-color: ${props => props.theme.colors.BLACK};
    color: ${props => props.theme.colors.WHITE};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
  }

  .gift_remove_button {
    background-color: ${props => props.theme.colors.WHITE};
    color: ${props => props.theme.colors.BUTTON.WHITE.TEXT};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
  }

  .gift-action-btn {
    outline: none;
    cursor: pointer;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
    min-height: 42px;
    width: 103px;
    @media ${props => props.theme.mediaQuery.medium} {
      width: 177px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
        ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  .gift-card-row {
    display: block;
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .gift-card-row {
      justify-content: space-between;
    }
  }

  .gift-tile-msg-container {
    margin-right: 0;
    display: inline-block;
    align-items: center;
  }

  .available_giftCards_text {
    display: flex;
    align-items: center;
  }

  @media ${props => props.theme.mediaQuery.mediumMax} {
    .gift_card_number_detail {
      min-height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }

  .gift-action-container {
    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
    }
    float: right;
    width: auto;
  }

  .error_box {
    background-color: ${props => props.theme.colors.WHITE};
  }

  @media ${props => props.theme.mediaQuery.large} {
    .gift_card_number_detail {
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    }
  }

  @media ${props => props.theme.mediaQuery.mediumMax} {
    .remainingBalanceText {
      display: inline-block;
    }
  }
`;

export default styles;
