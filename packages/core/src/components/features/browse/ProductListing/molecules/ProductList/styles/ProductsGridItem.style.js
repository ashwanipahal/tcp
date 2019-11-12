import { css } from 'styled-components';

const styles = css`
  height: 100%;

  .fav-icon-wrapper {
    text-align: right;
  }
  .item-container-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .fulfillment-section {
    margin-top: auto;
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
  .list-price {
    text-decoration: line-through;
    padding-right: 10px;
  }
  .product-title-container {
    box-sizing: border-box;
    height: 36px;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .added-to-bag {
    width: 100%;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
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
  }

  .move-item-section {
    min-width: 256px;
    border: solid 1px ${props => props.theme.colors.BUTTON.WHITE.BORDER};
    background: ${props => props.theme.colors.WHITE};
    position: absolute;
    z-index: 1;
    top: 40px;

    &.item__odd {
      right: 60px;
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
  }

  .wish-list-count,
  .wish-list-name {
    font-weight: 800;
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
    visibility: hidden;
    color: ${props =>
      props.isPlcc
        ? props.theme.colorPalette.userTheme.plcc
        : props.theme.colorPalette.userTheme.mpr};
    box-sizing: border-box;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    span {
      visibility: visible;
    }
  }
  .empty-color-chips-container {
    min-height: 35px;
  }

  .product-image-container {
    position: relative;
  }

  .extended-sizes-text {
    display: block;
    height: 10px;
    @media ${props => props.theme.mediaQuery.medium} {
      height: 12px;
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
    background-color: rgba(224, 224, 224, 0.6);
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    font-weight: ${props => props.theme.fonts.fontWeight.black};
  }

  .container-price {
    white-space: nowrap;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .top-badge-container {
      min-height: 16px;
    }

    .container-price {
      margin-top: 4px;
    }
    .product-title-container {
      height: 47px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .top-badge-container {
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
`;

export default styles;
