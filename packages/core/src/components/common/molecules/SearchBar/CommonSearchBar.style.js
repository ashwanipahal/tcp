import { css } from 'styled-components';

export const commonSearchBarStyles = css`
  .search-input-wrapper {
    display: inline-block;
    width: 240px;
    height: 40px;
    border-radius: 20px;
    background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    color: ${props => props.theme.colorPalette.gray[800]};
    border-color: unset;
    margin-right: 5px;
  }

  .searchBar-input-wrapper {
    display: inline-block;
    line-height: 40px;
    background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border-radius: 20px;
    width: 100%;
    position: relative;
  }
  .searchBar-input-form {
    padding-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    padding-right: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  }

  .searchBar-input {
    width: 175px;
    height: 40px;
    background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border: none;
    outline: none;
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    color: ${props => props.theme.colorPalette.gray[800]};
  }

  .searchBar-image-typeAhead {
    height: 20px;
    width: 20px;
    position: absolute;
    top: 10px;
  }

  .searchWrapper {
    width: 100%;
    height: 40px;
    display: inline-block;

    ${props =>
      props.fromCondensedHeader
        ? `

        position: fixed;
        width: 66%;
        right: 120px;
        top: ${props.theme.spacing.ELEM_SPACING.XS};

        @media ${props.theme.mediaQuery.large} {
          width: 74%;
        }

        @media ${props.theme.mediaQuery.large} {
          width: 31.8%;
          right: 130px;
          top: ${props.theme.spacing.ELEM_SPACING.SM};
        }
      `
        : ``};
  }

  .searchbar {
    display: inline-block;
    line-height: 40px;
    background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border-radius: 20px;
    width: 100%;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    height: 40px;
  }

  .searchbar input {
    width: calc(100% - 80px);
    height: 25px;
    outline: none;
    font-size: ${props => props.theme.typography.fontSizes.fs18};
    background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border: 0;
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.MED};
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    caret-color: ${props => props.theme.colors.TEXTBOX.FOCUS_BORDER};
  }

  .searchbar input::-ms-clear {
    display: none;
  }
  .search-model-wrapper {
    margin-top: 100px;
  }

  .search-image {
    vertical-align: middle;
  }
`;

export const commonStyles = css`
  display: inline;
  flex-grow: 1;

  .icon {
    cursor: pointer;
    vertical-align: baseline;
  }

  .suggestionBox,
  .matchBox {
    width: 100%;
    display: block;
    border: 1px solid ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border-top: 0;
    box-sizing: border-box;
    z-index: ${props => props.theme.zindex.zGoogleAutosuggest};
    position: relative;
    background-color: ${props => props.theme.colors.WHITE};
    overflow-y: auto;
  }

  .header-search {
    width: 300px;
    position: absolute;
    float: right;
    top: 108px;
    z-index: 2;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      right: 5em;
      top: 66px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      right: 11em;
    }
  }

  .boxHead {
    font-size: ${props => props.theme.typography.fontSizes.fs13};
    font-weight: 600;
  }

  .matchProductBox .matchProductBody {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XL}
      ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 35px;
    }
  }

  .matchProductBox .matchProductBody ul {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  li.tagName {
    height: 39px;
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    border: 1px solid ${props => props.theme.colors.TEXT.DARKERBLUE};
    border-radius: 20px;
    padding: 0 10px;
    text-align: center;
    line-height: 40px;
    margin: ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  li.recentTag {
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    font-size: ${props => props.theme.typography.fontSizes.fs13};
  }

  li.recentTag a {
    line-height: 3.08;
  }

  li.linkName {
    height: 40px;
    color: ${props => props.theme.colors.ACCORDION.TEXT};
  }

  li.productBox {
    background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    height: 87px;
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS};
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      height: 152px;
    }
  }

  .autosuggest-image {
    height: 87px;
    width: 88px;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      height: 152px;
      width: 152px;
    }
  }

  .close-mobile-image {
    display: none;
    width: 12px;
    height: 12px;
  }
`;

export const mediumOnlyStyles = css`
  @media ${props => props.theme.mediaQuery.mediumOnly} {
    .search-input-wrapper {
      display: inline-block;
      width: 222px;
      height: 40px;
      border-radius: 20px;
      background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
      color: ${props => props.theme.colorPalette.gray[800]};
      border-color: unset;
      margin-right: 10px;
      margin-left: 53px;
    }

    .searchBar-input-wrapper {
      display: inline-block;
      line-height: 40px;
      background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
      border-radius: 20px;
      width: 100%;
      position: relative;
    }
    .searchBar-input-form {
      padding-left: ${props => props.theme.typography.fontSizes.fs14};
      padding-right: 0;
    }

    .searchBar-input {
      width: 189px;
      height: 40px;
      background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
      border: none;
      outline: none;
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      color: ${props => props.theme.colorPalette.gray[800]};
    }

    .searchBar-image-typeAhead {
      height: 18px;
      width: 18px;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .searchWrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 50px;
      ${props =>
        props.fromCondensedHeader
          ? `

              position: fixed;
              width: 100%;
              left: 0;
              top: 0;

              @media ${props.theme.mediaQuery.large} {
                width: 100%;
              }

              @media ${props.theme.mediaQuery.large} {
                width: 31.8%;
                left: 0;
                top: 0;
              }
            `
          : ``};
    }

    .searchbar {
      border-radius: 0;
      background-color: ${props => props.theme.colors.WHITE};
      height: 50px;
    }

    .searchbar input {
      width: calc(100% - 250px);
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      background-color: ${props => props.theme.colors.WHITE};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    .searchbar .icon-small {
      vertical-align: middle;
      padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS};
      cursor: pointer;
      padding-left: 35px;
    }

    .close-image-toggle {
      display: inline-block;
    }

    .search-mobile-image {
      display: none;
      height: 19px;
      width: 19px;
      padding-left: 35px;
    }

    .search-image-typeAhead {
      display: inline-block;
    }

    .cancel-search-label {
      display: none;
      font-size: ${props => props.theme.typography.fontSizes.fs13};
    }

    .close-mobile-image-toggle {
      display: none;
    }

    .close-image-mobile {
      display: inline-block;
    }

    .trendingBox .trendingBoxHead,
    .recentBox .recentBoxHead,
    .matchLinkBox .matchLinkBoxHead,
    .matchProductBox .matchProductHead {
      height: 52px;
      background-color: ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
      line-height: 52px;
      padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding-left: 35px;
    }

    .recentBox .recentBoxBody {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
        ${props => props.theme.spacing.ELEM_SPACING.XXL}
        ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    .matchLinkBox .matchLinkBoxBody {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
        ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }

    .cancel-search-label-wrapper {
      float: right;
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
      line-height: 40px;
    }
  }
`;
