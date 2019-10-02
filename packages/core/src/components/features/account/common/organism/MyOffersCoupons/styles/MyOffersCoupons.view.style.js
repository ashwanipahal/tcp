import { css } from 'styled-components';

const styles = css`
  display: flex;
  flex-direction: column;

  .couponList_title {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .couponList_iconContainer {
    display: flex;
    flex-direction: row;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .coupon_viewall_tile {
    display: flex;
    justify-content: center;
  }
  .coupon_button_black {
    background-color: ${props => props.theme.colors.BLACK};
    color: ${props => props.theme.colors.WHITE};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .couponList_helpIcon {
    text-align: center;
    line-height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    background: ${props => props.theme.colors.PRIMARY.GREEN};
    color: ${props => props.theme.colors.WHITE};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.MED};
    width: ${props => props.theme.spacing.ELEM_SPACING.MED};
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .coupon_carousel {
    margin: 0 -${props => props.theme.spacing.ELEM_SPACING.SM};

    .coupon_available_couponNameLbl {
      font-size: 11px;
    }
    .couponCard__header_text {
      font-size: 11px;
      font-weight: 900;
    }
  }

  .coupon_carousel_container {
    margin: 0 -${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .view_all {
    text-align: right;
  }
`;

export default styles;
