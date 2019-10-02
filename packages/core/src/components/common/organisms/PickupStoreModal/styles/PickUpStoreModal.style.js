import { css } from 'styled-components';

const styles = css`
  div.TCPModal__InnerContent {
    .close-modal {
      height: 14px;
      top: 21px;
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
      padding: 0px 30px;
    }
  }

  .pickup-sku-selection {
    margin-bottom: 51px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: 30px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: 61px;
    }

    .product-view-details {
      display: inline-flex;

      .link-redirect {
        margin-left: 35px;
      }

      .product-link {
        margin-top: 19px;
      }
    }

    .product-name {
      font-size: 14px;
      margin-bottom: 7px;

      @media ${props => props.theme.mediaQuery.medium} {
        font-size: 18px;
        margin-bottom: 12px;
      }
    }

    .image-wrapper {
      width: 164px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 24px;

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
      margin-bottom: 41px;
      margin-top: 8px;
      text-align: center;
      color: #1a1a1a;
      font-weight: bold;
      font-size: 22px;
    }

    .product-price-container {
      margin-top: 19px;
    }

    .actual-price {
      color: #e02020;
      font-size: 16px;
    }

    .original-price {
      font-size: 12px;
      color: #595959;
      margin-left: 5px;
      line-height: 1.9;
    }

    .price-container {
      display: inline-flex;
      .badge {
        display: none;
      }
    }

    .edit-form-css {
      margin-top: 31px;

      .color-chips-selector-title,
      .size-and-fit-detail-title,
      .pdp-qty {
        text-transform: capitalize;
      }

      .color-chips-selector-items-list {
        margin-top: 9px;
      }

      @media ${props => props.theme.mediaQuery.medium} {
        margin-top: 12px;
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-top: 17px;
      }
    }

    .edit-form-css .qty-selector {
      margin-top: 29px;

      @media ${props => props.theme.mediaQuery.medium} {
        margin-top: 31px;
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
