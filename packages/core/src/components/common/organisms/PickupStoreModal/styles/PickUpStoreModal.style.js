import { css } from 'styled-components';

const styles = css`
  div.TCPModal__InnerContent {
    .close-modal {
      height: 14px;
      right: 0px;
      top: 12px;
      @media ${props => props.theme.mediaQuery.medium} {
        top: 12px;
      }
      @media ${props => props.theme.mediaQuery.large} {
        top: 12px;
      }
    }
    font-family: Nunito;
    max-height: 760px;

    padding: 0px 14px;

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0px 24px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding: 24px 17px;
    }

    .search-store {
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};

      @media ${props => props.theme.mediaQuery.medium} {
        margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
        margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
        margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
      }
    }
  }

  .pickup-sku-selection {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 61px;
    }

    .product-view-details {
      display: inline-flex;

      .link-redirect {
        margin-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
      }

      .product-link {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      }
    }

    .product-name {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};

      @media ${props => props.theme.mediaQuery.medium} {
        font-size: ${props => props.theme.typography.fontSizes.fs18};
        margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
    }

    .image-wrapper {
      width: 164px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};

      @media ${props => props.theme.mediaQuery.medium} {
        width: 264px;
      }

      @media ${props => props.theme.mediaQuery.large} {
        width: 239px;
      }
    }

    .sku-items {
      flex: 1 1 0%;
    }

    .modal-header {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      text-align: center;
      color: ${props => props.theme.colorPalette.gray[900]};
      font-weight: ${props => props.theme.typography.fontWeights.black};
      font-size: ${props => props.theme.typography.fontSizes.fs22};
    }

    .product-customize-form-container .product-price-container {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    .price-container {
      display: inline-flex;

      .actual-price {
        color: ${props => props.theme.colorPalette.red};
        font-size: ${props => props.theme.typography.fontSizes.fs22};
      }

      .original-price {
        font-size: ${props => props.theme.typography.fontSizes.fs16};
        color: ${props => props.theme.colorPalette.gray[900]};
        margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
        line-height: 1.9;
      }

      .badge {
        display: none;
      }
    }

    .edit-form-css {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};

      .color-chips-selector-title,
      .size-and-fit-detail-title,
      .pdp-qty {
        text-transform: capitalize;
        font-family: ${props => props.theme.fonts.secondaryFontFamily};
      }

      .color-chips-selector-items-list {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
      }

      @media ${props => props.theme.mediaQuery.medium} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      }
    }

    .edit-form-css .qty-selector {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};

      @media ${props => props.theme.mediaQuery.medium} {
        margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
      }
    }
  }
`;

export const modalstyles = css`
  .Modal_Heading {
    border-bottom: 0px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    margin-top: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    text-align: center;
  }
  .Modal-Header {
    padding-top: 14px;
    z-index: 1;
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: 24px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: 24px;
    }
  }
`;

export default styles;
