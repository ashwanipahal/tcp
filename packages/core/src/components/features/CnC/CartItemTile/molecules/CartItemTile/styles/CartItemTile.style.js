import { css } from 'styled-components';

export default css`
  padding: 10px 15px;
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  margin-bottom: 20px;
  .padding-left-10 {
    padding-left: 4px;
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
    padding-top: 2px;
    cursor: pointer;
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

  .crossDeleteIcon {
    float: right;
    cursor: pointer;
    width: 10px;
    height: 10px;
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
        width: auto;
        margin-right: 22px;
      }

      .value-responsive {
        flex: 1;
        padding-left: 10px;
      }
      .label-responsive-wrapper {
        padding-top: 0;
        display: flex;
        flex: 1;
        width: auto;
        margin-right: 22px;
      }

      .responsive-edit-css {
        padding-top: 2px;
        cursor: pointer;
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
      margin-left: 170px;
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
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
