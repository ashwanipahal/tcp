import { css } from 'styled-components';

const styles = css`
  .gift_card_box {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
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

  @media ${props => props.theme.mediaQuery.large} {
    .gift_card_number_detail {
      padding: 16px 0;
    }
  }
`;

export default styles;
