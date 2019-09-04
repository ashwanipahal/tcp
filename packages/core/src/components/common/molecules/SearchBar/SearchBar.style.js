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
    background-color: #f2f2f2;
    border-radius: 21px;
    width: 100%;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    height: 40px;
  }

  .searchbar .icon-small {
    vertical-align: middle;
    height: 16px;
    padding: 0px 3px;
    width: 20px;
    cursor: pointer;
  }

  .icon {
    cursor: pointer;
    vertical-align: baseline;
  }

  .searchbar input {
    width: calc(100% - 74px);
    height: 25px;
    outline: none;
    font-size: 18px;
    background-color: #f2f2f2;
    border: 0px;
    padding: 0px 10px;
    border-radius: 14px;
    color: #1a1a1a;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .suggestionBox,
  .matchBox {
    width: 100%;
    display: block;
    border: 1px solid #f2f2f2;
    border-top: 0px;
    box-sizing: border-box;
    z-index: 100000;
    position: relative;
    background-color: #fff;
  }

  .trendingBox .trendingBoxHead,
  .recentBox .recentBoxHead,
  .matchLinkBox .matchLinkBoxHead,
  .matchProductBox .matchProductHead {
    height: 52px;
    background-color: #f7f7f7;
    line-height: 52px;
    padding: 0px 10px;
  }

  .trendingBox .trendingBoxBody,
  .recentBox .recentBoxBody,
  .matchLinkBox .matchLinkBoxBody,
  .matchProductBox .matchProductBody {
    padding: 6px;
  }

  .trendingBox .trendingBoxBody ul li {
    display: inline-block;
  }

  .trendingBox .trendingBoxBody ul li.tagName {
    height: 39px;
    line-height: 39px;
    font-family: Nunito;
    font-size: 15px;
    text-align: center;
    color: #1a1a1a;
    border: 1px solid #439ad4;
    border-radius: 20px;
    padding: 0px 10px;
    margin: 6px;
  }

  .recentBox .recentBoxBody ul li.recentTag {
    height: 39px;
    line-height: 39px;
    font-family: Nunito;
    font-size: 15px;
    color: #1a1a1a;
    padding: 0px 10px;
    margin: 6px;
  }

  .matchLinkBox .matchLinkBoxBody ul li.linkName {
    height: 39px;
    line-height: 39px;
    font-family: Nunito;
    font-size: 15px;
    color: #1a1a1a;
    padding: 0px 10px;
    margin: 6px;
  }

  .matchProductBox .matchProductBody ul li.productBox {
    width: 81px;
    height: 81px;
    border: solid 1px #bababa;
    background-color: #aeaeae;
    margin: 5px;
    display: inline-block;
  }
`;
