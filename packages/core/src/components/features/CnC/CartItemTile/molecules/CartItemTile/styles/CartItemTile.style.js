import { css } from 'styled-components';

export default css`
  padding: 10px 15px;
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  /*margin-bottom: 20px;*/
  position: relative;
  .product {
    padding-top: 6px;
  }
  .padding-left-10 {
    padding-left: 4px;
    @media ${props => props.theme.mediaQuery.smallMax} {
      width: ${props => (props.showOnReviewPage ? '150px' : 'auto')};
      display: inline-flex;
    }
  }
  .padding-left-6 {
    padding-left: 6px;
  }
  .padding-left-13 {
    padding-left: 13px;
  }
  .product-details {
    margin-bottom: 5px;
  }
  .product-image {
    text-align: center;
  }
  .brand-image {
    text-align: center;
    width: 55px;
  }
  .edit-button {
    padding-left: 10px;
  }
  .padding-top-15 {
    padding-top: 15px;
  }
  .padding-bottom-20 {
    padding-bottom: 20px;
  }
  .align-product-img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .color-fit-size-separator {
    padding: 0 5px;
  }
  .color-size-fit-label {
    display: inline-block;
  }
  .responsive-edit-css {
    text-decoration: underline;
    padding-top: 2px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
  }
  .imageWrapper {
    position: relative;
    width: 100px;
  }
  .logoWrapper {
    position: relative;
    margin-top: 8px;
    display: flex;
    justify-content: center;
  }
  .product-attributes {
    display: inline-flex;
    flex-wrap: wrap;
    width: 75%;
    margin: 0 13px;
  }
  .editLinkWrapper {
    display: inline-block;
  }

  .crossDeleteIconMiniBag {
    float: right;
    cursor: pointer;
    width: 10px;
    height: 10px;
    padding-top: 0px;
    position: absolute;
    top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .crossDeleteIconBag {
    float: right;
    cursor: pointer;
    width: 15px;
    height: 15px;
    padding-top: 0px;
    position: absolute;
    top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    z-index: 1;
    img {
      display: block;
    }
  }

  @media ${props => props.theme.mediaQuery.mediumMax} {
    .crossDeleteIconBag {
      width: 10px;
      height: 10px;
    }
  }

  .product-detail {
    display: flex;
    flex-wrap: wrap;
  }

  .product-detail-row {
    width: 100%;
  }

  .unavailable-header {
    display: flex;
    justify-content: space-between;
  }

  .unavailable-error {
    padding-top: 0px;
    div {
      margin-right: 0px;
      margin-left: 0px;
      display: inline;
      width: 100%;
    }
  }

  .product-detail-bag {
    display: inline-block;
  }

  .label-responsive {
    width: fit-content;
    padding-right: 22px;
  }

  .label-responsive-price {
    margin-right: 0px;
  }

  @media ${props => props.theme.mediaQuery.large} {
    .product-detail-bag {
      display: flex;
      flex-wrap: wrap;
      width: fit-content;
    }
  }

  .product-tile-wrapper {
    font-size: 13px;
    flex-wrap: nowrap;
    @media ${props => props.theme.mediaQuery.mediumMax} {
      position: relative;
    }
    & .product-detail-row {
      margin: 0;
    }
    & .list-price {
      padding-left: 5px;
    }
    & .product-brand-img-wrapper {
      align-items: center;
      width: 103px;
      @media ${props => props.theme.mediaQuery.large} {
        width: 105px;
      }
      & .brand-image {
        width: 60px;
      }
    }

    .color-size-fit-label {
      width: 49px;
    }

    .bag-product-detail-wrapper {
      position: relative;
      width: 100%;
      .color-fit-size-separator {
        padding: 0 10px;
      }

      .label-responsive {
        width: 49px;
        margin-right: 0px;
        padding-right: 0px;
      }

      .value-responsive {
        flex: 1;
        padding-left: 4px;
        width: 49px;
        margin-right: 0px;
      }
      .label-responsive-wrapper {
        padding-top: 2px;
        display: flex;
        flex: 1;
        padding-right: 0px;
        /* stylelint-disable */
        span:not(.list-price) {
          font-size: ${props => props.theme.fonts.fontSize.listmenu.small}px;
        }
        /* stylelint-enable */
      }

      .responsive-edit-css {
        text-decoration: underline;
        padding-top: 4px;
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        padding-left: 15px;
        left: 155px;
        bottom: 4px;
        /* stylelint-disable */
        @media ${props => props.theme.mediaQuery.large} {
          position: absolute;
          left: 110px;
          bottom: 3px;
        }
        /* stylelint-enable */
      }

      /* stylelint-disable */
      .product-detail-bag {
        padding-top: 4px;
        span {
          font-size: 13px;
        }
      }
      /* stylelint-enable */
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      .price-label {
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .save-for-later-label {
        margin: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
        width: 100%;
        position: absolute;
        left: 10px;
        margin-top: 0;
      }
      .color-map-size-fit {
        display: inline-grid;
      }
      .responsive-edit-css {
        text-decoration: underline;
        position: absolute;
        bottom: 0;
        right: 50%;
        cursor: pointer;
      }
      .bag-product-detail-wrapper {
        position: static;
      }
      .color-fit-size-separator {
        display: none;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      .color-fit-size-desktop {
        width: auto;
      }
    }

    .price-label {
      margin-left: 122px;
    }
  }

  .productImgBrand {
    p {
      margin-right: 35px;
    }
  }

  .soldOutLabel {
    width: 89px;
    height: 18px;
    background-color: ${props => props.theme.colorPalette.red[500]};
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .updateOOSMiniBag {
    /*margin-left: 56px;*/
    cursor: pointer;
    text-decoration: underline;
  }

  .updateOOSBag {
    cursor: pointer;
    text-decoration: underline;
  }

  .parent- {
    padding-bottom: 0px;
    .save-for-later-label {
      position: absolute;
      right: -10px;
    }
  }

  .parent-myBag {
    .save-for-later-label {
      display: flex;
      align-items: center;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-bottom: 0px;
    }
  }

  .tile-header {
    position: relative;
  }

  .cart-item-radio-buttons {
    margin-top: 23px;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 19px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 27px;
    }
  }
  .heartIcon {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .sflActions {
    text-decoration: underline;
    cursor: pointer;
  }
  .size-and-item-container {
    display: inline-flex;
  }
  .product-detail-review-page {
    display: inline-block;
  }

  .toggle-error {
    display: flex;
    align-items: center;
    background: ${props => props.theme.colorPalette.white};

    img {
      padding-top: 0px;
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
      padding-left: 0;
      padding-bottom: 1px;
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
