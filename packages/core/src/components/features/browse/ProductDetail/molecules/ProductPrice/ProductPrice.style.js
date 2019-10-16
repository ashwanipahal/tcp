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
  .loyalty-text-container {
    color: ${props =>
      props.isPlcc
        ? props.theme.colorPalette.userTheme.plcc
        : props.theme.colorPalette.userTheme.mpr};
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default productPriceStyle;
