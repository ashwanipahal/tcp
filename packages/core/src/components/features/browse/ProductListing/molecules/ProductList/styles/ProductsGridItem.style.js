import { css } from 'styled-components';

const styles = css`
  height: 100%;

  .fav-icon-wrapper {
    text-align: right;
    display: grid;
  }
  .item-container-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .fulfillment-section {
    margin-top: auto;
  }
  .favorite-count {
    text-align: center;
  }
  .clear-button {
    border: none;
    background: transparent;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    width: 35px;
    outline: none;
  }
  .fav-icon {
    width: 21px;
    height: 18px;
    cursor: pointer;
  }
  .list-price-container {
    padding-right: 10px;
  }
  .list-price {
    text-decoration: line-through;
  }
  .product-title-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    box-sizing: border-box;
    height: 36px;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .added-to-bag {
    width: 100%;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    &:focus {
      background: ${props => props.theme.colorPalette.blue.C900};
      color: white;
    }
    &:hover:not([disabled]) {
      background: ${props => props.theme.colorPalette.blue.C900};
      color: white;
    }
    &[disabled] {
      opacity: 0.5;
    }
    @media ${props => props.theme.mediaQuery.mediumMax} {
      background: ${props => props.theme.colorPalette.blue.C900};
      color: white;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
  }

  .top-badge-container {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    margin-left: 0;
    min-height: 14px;
    width: 100%;
  }

  .purchase-section {
    margin-top: 16px;
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    font-family: ${props => props.theme.typography.fonts.secondary};
  }

  .move-item-container {
    position: relative;
  }

  .move-item-button {
    margin-top: 3px;
    padding: 0;
    text-transform: none;
    text-align: left;
    letter-spacing: normal;
    outline: none;
    font-family: ${props => props.theme.typography.fonts.secondary};
    white-space: nowrap;
    &:focus {
      background: transparent;
    }
  }

  .move-item-section {
    min-width: 310px;
    border: solid 1px ${props => props.theme.colors.BUTTON.WHITE.BORDER};
    background: ${props => props.theme.colors.WHITE};
    position: absolute;
    z-index: 1;
    top: 40px;

    &.item__odd {
      right: 0;
    }
  }

  .is-purchase-label {
    display: inline-block;
    padding-left: 2px;
  }

  .create-wish-list-section {
    padding: 8px 16px 20px;
    font-size: 14px;
  }

  .create-wish-list-header {
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 16px;
  }

  .wish-list-name {
    text-transform: capitalize;
  }

  .wish-list-count-section {
    text-transform: lowercase;
    display: inline-block;
    padding-right: 2px;
    padding-top: 3px;
  }

  .default-list-item,
  .default-list-count {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }

  .create-new__button {
    margin-top: 28px;
  }

  .product-sku-info-container {
    font-size: 12px;
    color: ${props => props.theme.colors.ANCHOR.PRIMARY};
    text-transform: capitalize;
  }

  .favorite-move-purchase-section {
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
    flex-direction: column;

    @media ${props => props.theme.mediaQuery.large} {
      flex-direction: row;
    }
  }

  .wish-list-item-section {
    display: flex;
    justify-content: space-between;
  }

  .wish-list-item__button {
    text-align: left;
    width: 100%;
    &:focus {
      background: transparent;
    }
  }

  .edit-fav-item__button {
    text-align: center;
    text-decoration: underline;
  }

  .accordian-item-arrow {
    padding-left: 4px;
  }

  .wish-list-tick-mark {
    vertical-align: bottom;
  }

  .loyalty-text-container {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    visibility: hidden;
    color: ${props =>
      props.isPlcc
        ? props.theme.colorPalette.userTheme.plcc
        : props.theme.colorPalette.userTheme.mpr};
    box-sizing: border-box;
    height: 20px;
    span {
      visibility: visible;
    }
  }
  .empty-color-chips-container {
    min-height: 35px;
  }

  /* stylelint-disable-next-line*/
  _:-ms-fullscreen,
  .product-image-container {
    max-height: 320px;
  }

  .product-image-container {
    position: relative;
  }

  .extended-sizes-text {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    display: block;
    height: 10px;
    @media ${props => props.theme.mediaQuery.medium} {
      height: 12px;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
    @media ${props => props.theme.mediaQuery.large} {
      height: 14px;
    }
  }

  .sold-out-section {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(255, 255, 255, 0.7);
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .container-price {
    white-space: nowrap;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .top-badge-container {
      min-height: 16px;
      padding-top: 20px;
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      margin-left: 0px;
    }

    .container-price {
      margin-top: 4px;
      height: 47px;
    }
    .product-title-container {
      height: 47px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .top-badge-container {
      padding-top: 10px;
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
      margin-left: -2px;
      min-height: 19px;
    }

    .container-price {
      margin-top: 0px;
    }
    .product-title-container {
      height: 46px;
    }

    &:hover {
      .button-prev {
        display: block;
      }
      .button-next {
        display: block;
      }
    }
    .empty-color-chips-container {
      min-height: 40px;
    }
  }
  .see-suggested-items {
    background: transparent;
    border: 0;
    text-decoration: underline;
  }

  .close-btn {
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-left: 10px;
    cursor: pointer;
    border: 0;
    background: transparent;
    position: absolute;
    right: 0px;
    top: 0;
    height: ${props => props.theme.spacing.ELEM_SPACING.XS};
    flex-direction: row;
    justify-content: flex-end;
  }

  .close-btn-icon {
    width: ${props => props.theme.spacing.ELEM_SPACING.XS};
    height: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} auto;

    .close-btn-icon {
      width: ${props => props.theme.spacing.ELEM_SPACING.MED};
      height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .suggested-label {
    background: ${props => props.theme.colorPalette.gray[800]};
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    width: 100px;
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
    @media ${props => props.theme.mediaQuery.medium} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 28px 0px;
    }
  }
  .dismiss-btn {
    min-height: ${props => props.theme.spacing.ELEM_SPACING.XS};
    @media ${props => props.theme.mediaQuery.medium} {
      min-height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      min-height: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    }
  }
`;

export default styles;
