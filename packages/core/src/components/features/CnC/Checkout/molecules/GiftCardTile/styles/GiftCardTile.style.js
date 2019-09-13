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
      width: 195px;
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM}
        ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .gift-card-row {
      justify-content: space-between;
    }
  }

  .gift-tile-msg-container {
    margin-right: 0;
    display: flex;
    align-items: center;
  }

  .gift-action-container {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
  }

  .error_box {
    background-color: ${props => props.theme.colors.WHITE};
  }

  @media ${props => props.theme.mediaQuery.large} {
    .gift_card_number_detail {
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    }
  }
`;

export default styles;
