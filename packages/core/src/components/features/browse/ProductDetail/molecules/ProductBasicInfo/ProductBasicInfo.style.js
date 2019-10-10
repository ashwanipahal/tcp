import { css } from 'styled-components';

const ProductBasicInfoStyle = css`
  .inline-badge-item {
    p {
      font-size: ${props => props.theme.typography.fontSizes.fs10}px;
    }
  }
`;

export default ProductBasicInfoStyle;
