import { css } from 'styled-components';
import { commonSearchBarStyles, commonStyles, mediumOnlyStyles } from './CommonSearchBar.style';

export default css`


  ${commonSearchBarStyles}
  ${commonStyles}
  ${mediumOnlyStyles}

  @media ${props => props.theme.mediaQuery.medium} {

    .searchWrapper {
      top: 0;
      height: 50px;
    }

    .searchbar {
      border-radius: 0;
      background-color: ${props => props.theme.colors.WHITE};
      height:50px;
    }


    .searchbar input {
      width: 122px;
      font-size:${props => props.theme.typography.fontSizes.fs14};
      padding-right: 172px;
      background-color: ${props => props.theme.colors.WHITE};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    .searchbar .icon-small {
      vertical-align: middle;
      padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS};
      padding-left:35px;
      cursor: pointer;
    }


    .close-image-toggle {
      display: none;
    }

    .search-mobile-image {
      display: inline-block;
      height: 19px;
      width: 19px;
      padding-left:35px;
    }

    .search-image-typeAhead {
      display: none;
    }

    .cancel-search-label {
      display: inline-block;
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
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS} ${props =>
  props.theme.spacing.LAYOUT_SPACING.LRG};
    }

    .search-close-icon-wrapper{
        padding-left :251px;
    }

    .cancel-search-label-wrapper {
      padding-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
    }
    .li.productBox{
      height: 152px;
      width: 152px;
    }

  }

  @media ${props => props.theme.mediaQuery.smallOnly} {
    .search-image{
      width:25px;
    }

    .search-input-wrapper{
      display: inline-block;
      width: 202px;
      height: 30px;
      border-radius: 20px;
      background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
      color: #575757;
      border-color: unset;
      margin-right: 10px;
    }

    .searchBar-input-wrapper{
      display: inline-block;
      line-height: 30px;
      background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
      border-radius: 20px;
      width: 100%;
      position: relative;

    }
    .searchBar-input-form{
      padding-left: 14px;
      padding-right: 0px;
    }

    .searchBar-input{

      width: 172px;
      height: 30px;
      background-color: ${props => props.theme.colors.TEXTBOX.BACKGROUND};
      border: none;
      outline: none;
      font-size: 12px;
      color: #575757;
    }

    .searchBar-image-typeAhead {
      height: 15px;
      width: 15px;
      position: absolute;
      top: 8px;
      right: 5px;
    }

    .searchWrapper {
      position: absolute;
      top: 0;
      left:0;
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
            width: 32.8%;
            left: 0;
            top: 0;
          }
        `
          : ``};
    }

    .searchbar {
      border-radius: 0;
      background-color: ${props => props.theme.colors.WHITE};
    }

    .searchbar input {
      width: 122px;
      font-size:${props => props.theme.typography.fontSizes.fs14};
      padding-right: 94px;
      background-color: ${props => props.theme.colors.WHITE};
      padding-left: 26px;
    }

    .matchProductBox {
      display: none;
    }

    .close-image-toggle {
      display: none;
    }

    .search-mobile-image {
      display: inline-block;
      padding-left: 15px;
      height: 19px;
      width: 19px;
    }

    .search-image-typeAhead {
      display: none;
    }

    .cancel-search-label {
      display: inline-block;
      font-size: ${props => props.theme.typography.fontSizes.fs13};

    }

    .close-mobile-image-toggle {
      display: none;
    }

    .close-image-mobile {
      display: inline-block;
    }

    .searchbar .icon-small {
      vertical-align: middle;
      cursor: pointer;
    }

    .cancel-search-label-wrapper {
      padding-left: 33px;
    }

    .search-close-icon-wrapper{
        width :15px;
    }
    .matchLinkBox .matchLinkBoxBody {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
        ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    .recentBoxHead{
      padding-left: 14px;
    }
    .recentBoxBody{
      padding-left: 25px;
    }

    .trendingBox .trendingBoxHead,
    .recentBox .recentBoxHead,
    .matchLinkBox .matchLinkBoxHead,
    .matchProductBox .matchProductHead {
      height: 52px;
      background-color: ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
      line-height: 52px;
      padding: 0 14px;
      padding-left:14px;
    }

    .recentBox .recentBoxBody {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
        ${props => props.theme.spacing.ELEM_SPACING.LRG}
        ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

  }

  @media ${props => props.theme.mediaQuery.large} {

    .searchWrapper {
      width: 100%;
      height: 40px;
      display: inline-block;
      position:absolute;
      right:0;
      top:0;

      @media ${props => props.theme.mediaQuery.large} {
        width: 437px;
      }

      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 100%;
      }

      ${props =>
        props.fromCondensedHeader
          ? `

          position: fixed;
          width: 437px;
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

    .close-image-toggle {
      display: inline-block;
      height:12px;
      width:12px;
    }
    .close-image-mobile {
      display: inline-block;
    }
    .search-mobile-image {
      display: none;
    }

    .search-image-typeAhead {
      display: inline-block;
    }
    .cancel-search-label {
      display: none;
    }

    .close-mobile-image-toggle {
      display: none;
    }

    .close-mobile-image {
      display: none;
    }

    .searchbar .icon-small {
      vertical-align: middle;
      height: 16px;
      padding: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS};
      width: 20px;
      cursor: pointer;
    }

    .trendingBox .trendingBoxHead,
    .recentBox .recentBoxHead,
    .matchLinkBox .matchLinkBoxHead,
    .matchProductBox .matchProductHead {
      height: 52px;
      background-color: ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
      line-height: 52px;
      padding: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
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

    .search-close-icon-wrapper{
      display: none;
    }

    .cancel-search-label-wrapper{
      display: none;
    }

   .close-image .icon-small {
    height: 12px;
      width: 12px;
    }
  }

  .highlight-search-result {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
`;
