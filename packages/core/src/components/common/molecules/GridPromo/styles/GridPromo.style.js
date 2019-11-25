import { css } from 'styled-components';

const gridPromoStyles = css`
  .promo-div {
    text-align: center;
  }
  &.horizontal-promo {
    width: 100%;
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
`;

export default gridPromoStyles;
