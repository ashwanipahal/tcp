import { css } from 'styled-components';

export default css`
  .favorite-title {
    padding-bottom: 12px;
    border-bottom: 3px solid black;
  }
  .favorite-list {
    text-align: center;
  }
  .sort-list,
  .share-list,
  .fav-items {
    text-align: right;
  }
  .wish-list {
    text-align: center;
    padding: 10px 0;
  }
  .product-items {
    width: 20%;
    display: inline-block;
    text-align: center;
    padding: 10px 10px;
    background: #d3d3d3;
    min-height: 230px;
    margin: 10px;
  }
`;
