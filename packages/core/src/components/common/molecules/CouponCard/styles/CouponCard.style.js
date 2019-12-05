import { css } from 'styled-components';

const styles = css`
  .couponCard__container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .couponCard__header {
    display: flex;
  }

  .couponCard__container_error {
    border: solid 1px ${props => props.theme.colors.TEXT.RED};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .couponCard__container_main {
    border: solid 1px ${props => props.theme.colors.BRAND.BOY};
    border-style: dashed;
  }

  .couponCard__header_pc {
    flex: 1;
    background: ${props => props.theme.colors.PRIMARY.GREEN};
  }
  .couponCard__header_saving {
    flex: 1;
    background: ${props => props.theme.colors.BRAND.GIRLS};
  }

  .couponCard__header_rewards {
    flex: 1;
    background: ${props => props.theme.colorPalette.orange[800]};
  }
  .couponCard__header_text {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0px
      ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.MED};
    color: ${props => props.theme.colors.WHITE};
    font-weight: ${props => props.theme.fonts.fontWeight.black};
  }
  .couponCard__text_style {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    color: ${props => props.theme.colors.TEXT.DARK};
  }
  .cartDetailsLink {
    position: ${props => (props.isCarouselView ? 'static' : 'absolute')};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    color: ${props => props.theme.colors.TEXT.DARK};
    ${props => (props.isCarouselView ? 'float: left;' : '')}
  }
  .couponCard__header_expired {
    flex: 1;
    text-align: center;
    background: ${props => props.theme.colors.TEXT.DARKERGRAY};
    color: ${props => props.theme.colors.WHITE};
    line-height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-weight: ${props => props.theme.fonts.fontWeight.black};
  }
  .couponCard__body {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .couponCard__row {
    display: flex;
    margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  }
  .couponCard__col {
    flex: 1;
    padding-right: ${props => (props.isCarouselView ? '0' : props.theme.spacing.ELEM_SPACING.SM)};
  }
  .coupon__button_black {
    background-color: ${props => props.theme.colors.BLACK};
    min-width: 100px;
    color: ${props => props.theme.colors.WHITE};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    ${props =>
      props.isCarouselView
        ? `padding-left: ${props.theme.spacing.ELEM_SPACING.MED}; padding-right: ${
            props.theme.spacing.ELEM_SPACING.MED
          };`
        : ''}
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} ${props =>
  props.theme.spacing.ELEM_SPACING.XL};
  }
  .coupon__button_black:hover,
  .coupon__button_black:focus {
    background-color: ${props => props.theme.colors.PRIMARY.GRAY};
    color: ${props => props.theme.colors.WHITE};
  }

  .coupon__button_white {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    min-width: 100px;
    ${props =>
      props.isCarouselView
        ? `padding-right: ${props.theme.spacing.ELEM_SPACING.MED}; padding-left: ${
            props.theme.spacing.ELEM_SPACING.MED
          }; `
        : ''}
  }
  .couponCard__container_error_text {
    color: ${props => props.theme.colors.TEXT.RED};
  }

  .couponCard_slick {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
    .couponCard__row {
      margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0
        ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
  }

  .transparent-box {
    background: none;
    padding-bottom: 0;
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    font-weight: ${props => props.theme.fonts.fontWeight.extrabold};
  }
  .couponTitle {
    word-break: ${props => (props.isCarouselView ? 'break-word' : 'normal')};
  }
`;

export default styles;
