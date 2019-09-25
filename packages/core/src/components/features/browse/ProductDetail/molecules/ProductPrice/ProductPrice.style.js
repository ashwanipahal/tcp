import { css } from 'styled-components';

const productPriceStyle = css`
  .original-price {
    text-decoration: line-through;
  }
  .badge {
    margin-left: 8px;
  }
  .list-badge-container {
    display: flex;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default productPriceStyle;
