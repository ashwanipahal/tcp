import { css } from 'styled-components';

const styles = css`
  height: 100%;

  .fav-icon-wrapper {
    text-align: right;
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
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .product-title-container {
    box-sizing: border-box;
    height: 36px;
    padding-top: 4px;
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    overflow: hidden;
  }

  .added-to-bag {
    width: 100%;
    margin-top: 12px;
  }
  .top-badge-container {
    min-height: 14px;
    width: 100%;
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .badge2-fav-container {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .product-offer-price {
    font-size: ${props => props.theme.typography.fontSizes.fs15};
  }
  .merchant-tag {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
  .loyalty-text-container {
    height: 28px;
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    font-family: ${props => props.theme.typography.fonts.secondary};
    box-sizing: border-box;
    overflow: hidden;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .top-badge-container {
      min-height: 16px;
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
    .badge2-fav-container {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
    .product-offer-price {
      font-size: ${props => props.theme.typography.fontSizes.fs18};
    }
    .list-price {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
    .merchant-tag {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
    .container-price {
      margin-top: 4px;
      min-height: 43px;
    }
    .product-title-container {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
      padding-top: 11px;
      height: 47px;
    }
    .loyalty-text-container {
      height: 32px;
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      font-weight: ${props => props.theme.typography.fontWeights.bold};
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .top-badge-container {
      min-height: 19px;
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
    .badge2-fav-container {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
    .product-offer-price {
      font-size: ${props => props.theme.typography.fontSizes.fs20};
    }
    .list-price {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
    .merchant-tag {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
    .container-price {
      margin-top: 0px;
      min-height: 47px;
    }
    .product-title-container {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      padding-top: 8px;
      height: 46px;
    }
    .loyalty-text-container {
      height: 38px;
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      font-weight: ${props => props.theme.typography.fontWeights.bold};
    }

    &:hover {
      .button-prev {
        display: block;
      }
      .button-next {
        display: block;
      }
    }
  }
`;

export default styles;
