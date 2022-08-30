import { css } from 'styled-components';

const productPriceStyle = css`
  .original-price {
    .pre,
    .post {
      text-decoration: line-through;
      line-height: 2.2;
    }
  }
  .badge {
    line-height: 2.2;
    margin-left: 8px;
  }
  .list-badge-container {
    display: flex;
  }
  .loyalty-text-container {
    color: ${props => props.theme.colors.BLACK};
    span {
      color: ${props =>
        props.isPlcc
          ? props.theme.colorPalette.userTheme.plcc
          : props.theme.colorPalette.userTheme.mpr};
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default productPriceStyle;
