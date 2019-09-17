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
