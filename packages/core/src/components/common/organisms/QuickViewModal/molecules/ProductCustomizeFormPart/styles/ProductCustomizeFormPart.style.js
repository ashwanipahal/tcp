import { css } from 'styled-components';

const styles = css`
  .product-customize-form-container {
    flex-direction: row;
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
    flex-direction: column;
  }
  .product-name {
    margin-bottom: 12px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .image-wrapper {
      width: 264px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .image-wrapper {
      width: 243px;
    }
  }
`;

export const customPriceStyles = css`
  .list-badge-container {
    display: flex;
  }
`;

export default styles;
