import { css } from 'styled-components';

export default css`
  padding: 10px 15px;
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  margin-bottom: 20px;
  .padding-top-10 {
    padding-top: 10px;
  }
  .padding-left-10 {
    padding-left: 10px;
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
  }

  .color-fit-size-separator {
    padding: 0 5px;
  }
  .color-size-fit-label {
    display: inline-block;
  }
  .responsive-edit-css {
    padding-top: 2px;
  }

  .product-tile-wrapper {
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
      width: 40px;
      display: inline-block;
    }

    .bag-product-detail-wrapper {
      position: relative;

      .color-fit-size-separator {
        padding: 0 10px;
      }

      .label-responsive {
        width: 40px;
        margin-right: 0;
      }

      .value-responsive {
        flex: 1;
        padding-left: 10px;
      }
      .label-responsive-wrapper {
        padding-top: 0;
        display: flex;
        flex: 1;
      }

      .responsive-edit-css {
        padding-top: 2px;
      }
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      .price-label {
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .save-for-later-label {
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
      }
      .color-map-size-fit {
        display: block;
      }
      .responsive-edit-css {
        position: absolute;
        bottom: 0;
        right: 50%;
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
      margin-left: 170px;
    }
    .imageWrapper {
      position: relative;
    }
    .soldOutLabel {
      width: 89px;
      height: 18px;
      background-color: red;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
