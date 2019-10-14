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
  }
  .fav-icon {
    width: 21px;
    height: 18px;
    cursor: pointer;
  }
  .container-price {
    margin-top: 0px;
    min-height: 39px;
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
  }

  .top-badge-container {
    min-height: 14px;
    width: 100%;
  }

  .purchase-section {
    margin-top: 16px;
  }

  .move-item-container {
    position: relative;
  }

  .move-item-button {
    margin-top: 5px;
    padding: 0;
    text-transform: capitalize;
  }

  .move-item-section {
    min-width: 256px;
    border: solid 1px #979797;
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 40px;

    &.item__odd {
      right: 60px;
    }
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
    color: #1a1a1a;
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
    color: ${props =>
      props.isPlcc
        ? props.theme.colorPalette.userTheme.plcc
        : props.theme.colorPalette.userTheme.mpr};
    box-sizing: border-box;
    overflow: hidden;
  }

  .empty-color-chips-container {
    min-height: 35px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .top-badge-container {
      min-height: 16px;
    }

    .container-price {
      margin-top: 4px;
      min-height: 43px;
    }
    .product-title-container {
      padding-top: 11px;
      height: 47px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .top-badge-container {
      min-height: 19px;
    }

    .container-price {
      margin-top: 0px;
      min-height: 47px;
    }
    .product-title-container {
      padding-top: 8px;
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
