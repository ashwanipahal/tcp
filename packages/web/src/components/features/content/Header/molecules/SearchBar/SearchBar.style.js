import { css } from 'styled-components';

export default css`
  display: inline;
  height: 40px;
  flex-grow: 1;
  .searchWrapper {
    width: 100%;
    height: 40px;
    display: inline-block;
  }

  .searchbar {
    display: inline-block;
    line-height: 40px;
    background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border-radius: 20px;
    width: 100%;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    height: 40px;
  }

  .searchbar .icon-small {
    vertical-align: middle;
    height: 16px;
    padding: 0px ${props => props.theme.spacing.ELEM_SPACING.XXS};
    width: 20px;
    cursor: pointer;
  }

  .icon {
    cursor: pointer;
    vertical-align: baseline;
  }

  .searchbar input {
    width: calc(100% - 80px);
    height: 25px;
    outline: none;
    font-size: 18px;
    background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border: 0px;
    padding: 0px ${props => props.theme.spacing.ELEM_SPACING.SM};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.MED};
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .suggestionBox,
  .matchBox {
    width: 100%;
    display: block;
    border: 1px solid ${props => props.theme.colors.TEXTBOX.BACKGROUND};
    border-top: 0px;
    box-sizing: border-box;
    z-index: 100000;
    position: relative;
    background-color: ${props => props.theme.colors.WHITE};
    overflow-y: auto;
  }

  .condensed-search {
    position: fixed;
    top: 65px;
    right: 0;
    z-index: 1;
    width: 337px;

    @media ${props => props.theme.mediaQuery.large} {
      right: 12em;
    }
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
    font-size: 13px;
    font-weight: 600;
  }

  .trendingBox .trendingBoxHead,
  .recentBox .recentBoxHead,
  .matchLinkBox .matchLinkBoxHead,
  .matchProductBox .matchProductHead {
    height: 52px;
    background-color: ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
    line-height: 52px;
    padding: 0px ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .trendingBox .trendingBoxBody {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .matchLinkBox .matchLinkBoxBody {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XXL};
  }

  .recentBox .recentBoxBody {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XXL}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .matchProductBox .matchProductBody {
    padding: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
  }

  .matchProductBox .matchProductBody ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .trendingBoxBody ul li {
    display: inline-block;
  }

  li.tagName {
    height: 39px;
    color: ${props => props.theme.colors.ACCORDION.TEXT};
    border: 1px solid ${props => props.theme.colors.TEXT.DARKERBLUE};
    border-radius: 20px;
    padding: 0px 10px;
    text-align: center;
    line-height: 40px;
    margin: 6px 5px;
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
`;
