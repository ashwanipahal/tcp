import { css } from 'styled-components';

const gridPromoStyles = css`
  &.horizontal-promo {
    width: 100%;
    @media ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
`;

export default gridPromoStyles;
