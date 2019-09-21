import { css } from 'styled-components';

const styles = css`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  .image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .product-link {
    text-decoration: underline;
    margin-top: 24px;
  }
`;

export const customPriceStyles = css`
  .list-badge-container {
    display: flex;
  }
`;

export default styles;
