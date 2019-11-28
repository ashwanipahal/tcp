import { css } from 'styled-components';

export default css`
  .product-grid-block-container {
    display: flex;
    flex-wrap: wrap;
  }
  .product-grid-block-container .loadImage.error{
    @media ${props => props.theme.mediaQuery.smallOnly} {
      height: 200px;
    }
      @media ${props => props.theme.mediaQuery.mediumMax} {
      height: 230px;
    }

    @media ${props => props.theme.mediaQuery.medium} and ${props =>
  props.theme.mediaQuery.mediumMax} and (orientation: landscape) {
      height: 340px;
    }

    height: 320px;
    background: ${props => props.theme.colorPalette.gray[500]};
    display: block;
  }
`;
