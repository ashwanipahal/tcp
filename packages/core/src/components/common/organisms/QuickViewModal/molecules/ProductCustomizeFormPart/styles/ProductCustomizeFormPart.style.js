import { css } from 'styled-components';

const styles = css`
  .product-customize-form-container {
    flex-direction: column;
    display: flex;
  }
  .image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 24px;
    width: 161px;
  }
  .product-link {
    text-decoration: underline;
    margin-top: 24px;
  }
  .product-detail {
    display: flex;
    flex: 1;
    flex-direction: row;
  }
  .product-name {
    margin-bottom: 12px;
  }
  .product-details-card-container-separate {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .product-details-card-container {
    display: none;
  }
  .image-title-wrapper {
    display: flex;
    flex-direction: row;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .image-wrapper {
      width: 264px;
    }
    .product-details-card-container-separate {
      display: none;
    }
    .product-details-card-container {
      display: block;
    }
    .product-detail {
      flex-direction: column;
    }
    .product-customize-form-container {
      flex-direction: row;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .image-wrapper {
      width: 243px;
    }
    .product-details-card-container-separate {
      display: none;
    }
    .product-details-card-container {
      display: block;
    }
    .product-detail {
      flex-direction: column;
    }
    .product-customize-form-container {
      flex-direction: row;
    }
  }
`;

export const customPriceStyles = css`
  .list-badge-container {
    display: flex;
  }
`;

export default styles;
