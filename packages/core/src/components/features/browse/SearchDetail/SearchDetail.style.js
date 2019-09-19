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
  .product-list .search-product-tile {
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
      width: calc(20% - 21px);
    }
  }
  .container-price {
    text-align: left;
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .product-list {
      .search-product-tile:nth-child(2n) {
        padding-right: 0;
      }
    }
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .product-list {
      .search-product-tile:nth-child(3n) {
        padding-right: 0;
      }
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .product-list {
      .search-product-tile:nth-child(5n) {
        padding-right: 0;
      }
    }
  }
  .item-title {
    width: 100%;
  }
  .search-by-keywords-container {
    padding: 0 0 75px;
  }
  .empty-search-result-title {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0 10px;
  }
  .empty-search-result-suggestion {
    padding: 14px 0;
  }
  .empty-search-inputBox-container {
    position: relative;
    width: 240px;
    height: 40px;
  }
  .empty-search-inputBox-container-wrapper {
    padding-bottom: 10px;
    margin: 0 auto;
    margin-top: 54px;
    width: 100%;
    justify-content: center;
  }
  .empty-search-input {
    position: absolute;
    width: 240px;
    height: 40px;
    padding-left: 20px;
    border-radius: 20px;
    background-color: ${props => props.theme.colorPalette.gray[300]};
    border: 1px solid ${props => props.theme.colorPalette.gray[300]};
  }
  .empty-search-image {
    position: absolute;
    float: none;
    top: calc(0% - -12px);
    width: 20px;
    height: 20px;
    right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  }
  .search-tips-message-container-wrapper {
    padding-top: 50px;
  }
  .suggestion-label {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    color: ${props => props.theme.colorPalette.blue[800]};
  }
  .empty-search-tips-items {
    color: ${props => props.theme.colorPalette.gray[1000]};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
  }
  .empty-searched-label {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
  .empty-search-inputBox-col {
    width: 240px;
  }
  .empty-search-tips-title {
    margin-bottom: 8px;
  }
`;
