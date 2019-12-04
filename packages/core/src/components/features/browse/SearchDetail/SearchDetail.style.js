import { css } from 'styled-components';

export default css`
  .product-grid-block-container {
    width: calc(100% + 20px);
    @media ${props => props.theme.mediaQuery.medium} {
      width: calc(100% + 36px);
    }
    @media ${props => props.theme.mediaQuery.large} {
      width: calc(100% + 26px);
    }
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
  .filter-and-sort-form-container .render-mobile-view {
    position: relative;
    width: auto;
    padding: 0;

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
  }
  .filter-and-sort-form-container .filter-row {
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-left: 0;
    }
  }
  .searched-label {
    display: block;
  }
  .searched-text-wrapper {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .search-product-tile {
    margin-bottom: 20px;
    display: inline-block;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 20px 0 0;
    text-align: center;
    width: calc(50% - 20px);
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: 10px;
      padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 35px 0 0;
      width: calc(33.3% - 36px);
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 26px 0 0;
      margin-bottom: 60px;
      width: calc(20% - 26px);
    }
  }
  .container-price {
    text-align: left;
  }

  .empty-search-inputBox-container-wrapper {
    margin: 0 auto;
    width: 100%;
    justify-content: center;
    padding-top: 50px;
  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .empty-searched-label {
      display: block;
    }
    .filter-row {
      margin-left: 0;
    }
    .mobile-sort-container .common-dropdown .item-common {
      padding-left: 8px;
    }

    .search-by-keywords-container {
      padding: 31px 0 58px;
    }

    .empty-search-result-title {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0 0px;
    }
    .empty-search-result-suggestion {
      padding: 12px 0 0;
    }

    .empty-search-inputBox-container-wrapper {
      padding-top: 28px;
    }

    .search-tips-message-container-wrapper {
      padding-top: 41px;
    }
    .empty-search-tips-title {
      margin-bottom: 6px;
    }
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .searched-label {
      padding-bottom: 28px;
    }

    .empty-search-result-title {
      padding: 0 0 10px;
    }

    .empty-search-inputBox-container-wrapper {
      padding-top: 52px;
    }
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .searched-label {
      display: inline-block;
      padding-left: 6px;
    }

    .search-by-keywords-container {
      padding: 75px 0 64px;
    }
    .empty-search-result-suggestion {
      padding: 14px 0;
    }

    .search-tips-message-container-wrapper {
      padding-top: 84px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .show-items-count-section {
      display: none;
    }
    .render-mobile-view {
      display: none;
    }
    .filter-and-sort-form-container .desktop-dropdown {
      display: flex;
      position: relative;
    }
    .searched-label {
      padding-bottom: 0;
    }

    .search-by-keywords-container {
      padding: 29px 0 81px;
    }

    .empty-search-result-title {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XXS} 0 10px;
    }

    .empty-search-inputBox-container-wrapper {
      padding-bottom: 10px;
      padding-top: 68px;
    }

    .empty-search-result-suggestion {
      padding: 14px 0 0;
    }

    .search-tips-message-container-wrapper {
      padding-top: 72px;
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

  .empty-search-inputBox-col {
    position: relative;
    width: initial;
  }

  .empty-search-inputBox-container {
    position: relative;
    width: 240px;
    height: 40px;
  }

  .empty-search-input {
    position: absolute;
    width: 240px;
    height: 40px;
    padding-left: 20px;
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    border-radius: 20px;
    background-color: ${props => props.theme.colorPalette.gray[300]};
    border: 1px solid ${props => props.theme.colorPalette.gray[300]};
    box-sizing: border-box;
    outline: none;
  }

  .empty-search-input-withRecent {
    position: absolute;
    width: 240px;
    height: 40px;
    padding-left: 20px;
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    border-radius: 20px;
    background-color: ${props => props.theme.colorPalette.gray[300]};
    border: 1px solid ${props => props.theme.colorPalette.gray[300]};
    box-sizing: border-box;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    outline: none;
  }

  .empty-search-image {
    position: absolute;
    float: none;
    top: calc(0% - -12px);
    width: 20px;
    height: 20px;
    right: ${props => props.theme.spacing.ELEM_SPACING.SM};
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

  .empty-search-tips-title {
    margin-bottom: 8px;
  }
  .suggestionHide {
    display: none;
  }

  .matchBox {
    width: 100%;
    display: table-cell;
    border: 1px solid ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border-top: 0px;
    box-sizing: border-box;
    z-index: ${props => props.theme.zindex.zLoader};
    position: absolute;
    background-color: ${props => props.theme.colors.WHITE};
    overflow-y: auto;
    margin: 40px 10px 0 0;
  }

  .boxHead {
    font-size: 13px;
    font-weight: 600;
  }

  .matchLinkBox .matchLinkBoxHead,
  .matchProductBox .matchProductHead {
    height: 52px;
    background-color: ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
    line-height: 52px;
    padding: 0px ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .matchProductBox .matchProductBody {
    padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  }

  .matchProductBox .matchProductBody ul {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  li.linkName {
    height: 40px;
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    padding: 8px 14px;
  }

  li.productBox {
    width: 24%;
    height: 81px;
    border: solid 1px ${props => props.theme.colors.PRIMARY.DARK};
    background-color: ${props => props.theme.colors.PRIMARY.GRAY};
  }
  .autosuggest-image {
    height: 80px;
    width: 80px;
  }
  .empty-search-linkName {
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    padding: 5px 14px;
  }

  .suggestionBox {
    width: 100%;
    display: block;
    border-top: 0;
    box-sizing: border-box;
    z-index: ${props => props.theme.zindex.zGoogleAutosuggest};
    position: relative;
    background-color: ${props => props.theme.colors.WHITE};
    overflow-y: auto;
  }

  li.recentTag {
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    width: 100%;
    cursor: pointer;
  }

  li.recentTag a {
    line-height: 2.08;
  }

  .recentBox .recentBoxHead {
    height: 52px;
    background-color: ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
    line-height: 52px;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .recentBox .recentBoxBody {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.SM}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;
