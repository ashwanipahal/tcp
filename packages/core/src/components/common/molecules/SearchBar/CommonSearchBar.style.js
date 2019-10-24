import { css } from 'styled-components';

export const commonSearchBarStyles = css`
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
  }
  .search-model-wrapper {
    margin-top: 100px;
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
    padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  }

  .matchProductBox .matchProductBody ul {
    display: flex;
    justify-content: space-between;
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
    height: 35px;
    color: ${props => props.theme.colors.ACCORDION.TEXT};
  }

  li.linkName {
    height: 40px;
    color: ${props => props.theme.colors.ACCORDION.TEXT};
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

  .close-mobile-image {
    display: none;
    width: 12px;
    height: 12px;
  }
`;
