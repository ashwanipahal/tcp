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
  .filter-and-sort-form-container .desktop-dropdown {
    display: none;
  }
  .searched-label {
    display: block;
  }
  .searched-text-wrapper {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
    .filter-row {
      margin-left: 0;
    }
    .mobile-sort-container .common-dropdown .item-common {
      padding-left: 8px;
    }
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .product-list {
      .search-product-tile:nth-child(3n) {
        padding-right: 0;
      }
    }
    .searched-label {
      padding-bottom: 28px;
    }
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .searched-label {
      display: inline-block;
      padding-left: 6px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .show-items-count-section {
      display: none;
    }
    .product-list {
      .search-product-tile:nth-child(5n) {
        padding-right: 0;
      }
    }
    .render-mobile-view {
      display: none;
    }
    .filter-and-sort-form-container .desktop-dropdown {
      display: flex;
    }
    .searched-label {
      padding-bottom: 28px;
    }
  }

  .render-desktop-view {
    display: none;

    @media ${props => props.theme.mediaQuery.large} {
      display: block;
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
