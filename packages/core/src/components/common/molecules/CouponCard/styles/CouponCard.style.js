import { css } from 'styled-components';

const styles = css`
  .couponCard__container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .couponCard__header {
    display: flex;
  }

  .couponCard__container_error {
    border: solid 0.8px ${props => props.theme.colors.TEXT.RED};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .couponCard__container_main {
    border: solid 0.8px ${props => props.theme.colors.BRAND.BOY};
    border-style: dashed;
  }

  .couponCard__header_public {
    flex: 1;
    background: ${props => props.theme.colors.PRIMARY.GREEN};
  }
  .couponCard__header_saving {
    flex: 1;
    background: ${props => props.theme.colors.BRAND.GIRLS};
  }

  .couponCard__header_rewards {
    flex: 1;
    background: ${props => props.theme.colors.BRAND.GIRLS};
  }
  .couponCard__header_text {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0px
      ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.MED};
    color: ${props => props.theme.colors.WHITE};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
  }
  .couponCard__header_expired {
    flex: 1;
    text-align: center;
    background: ${props => props.theme.colors.TEXT.DARKERGRAY};
    color: ${props => props.theme.colors.WHITE};
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    line-height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .couponCard__body {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .couponCard__row {
    display: flex;
    margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .couponCard__col {
    flex: 1;
  }
  .coupon__button_black {
    background-color: ${props => props.theme.colors.BLACK};
    color: ${props => props.theme.colors.WHITE};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .coupon__button_black:hover,
  .coupon__button_black:focus {
    background-color: ${props => props.theme.colors.PRIMARY.GRAY};
    color: ${props => props.theme.colors.WHITE};
  }

  .coupon__button_white {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .couponCard__container_error_text {
    color: ${props => props.theme.colors.TEXT.RED};
  }
`;

export default styles;
