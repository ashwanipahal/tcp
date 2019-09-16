import { css } from 'styled-components';

export default css`
  .placeholder div {
    background: #d8d8d8;
    padding: 10px 0;
    margin-bottom: 5px;
    text-align: center;
  }
  .product-tile-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  display: flex;
  flex-wrap: wrap;
  .product-tile {
    display: inline-block;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 20px 0 0;
    text-align: center;
    width: calc(50% - 10px);
    @media ${props => props.theme.mediaQuery.medium} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 35px 0
        ${props => props.theme.spacing.ELEM_SPACING.SM};
      width: calc(33.3% - 36px);
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 26px 0 0;
      width: calc(20% - 26px);
    }
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .product-tile:nth-child(2n) {
      padding-right: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .product-tile:nth-child(3n) {
      padding-right: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.largeOnly} {
    .product-tile:nth-child(5n) {
      padding-right: 0;
    }
  }
  .item-title {
    width: 100%;
  }
`;
