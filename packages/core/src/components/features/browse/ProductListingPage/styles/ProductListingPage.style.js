/* stylelint-disable */
import styled from 'styled-components';

export default styled.div`
  background-color: none;

  .product-item {
    border: solid 0.5px black;
    border-radius: 4px;
    padding: 25px;
    font-family: Lato-Bold;
    font-style: normal;
    font-stretch: normal;
    font-size: 15px;
    background-color: #eeeeef;
    margin-bottom: 20px;
    margin-right: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      margin-right: 2.2%;
      box-sizing: border-box;
    }
    .product-name {
      text-align: center;
    }
    .product-disc-price {
      text-align: center;
      padding: 1%;
      color: #900;
    }
    .product-original-price {
      text-align: center;
      padding: 1%;
      color: #999;
    }
    .product-image {
      width: 50%;
      text-align: center;
      padding: 5px 0;
      margin: 0 auto;
    }
    &:nth-child(3n) {
      margin-right: 0;
      @media ${props => props.theme.mediaQuery.large} {
        margin-right: 0;
      }
    }
    .product-quantity,
    .product-store {
      margin: 10px 0 10px;
      text-align: center;
      select {
        border: 1px solid black;
        width: 60px;
        height: 27px;
        margin-left: 14px;
        background: white;
      }
    }
    .product-button {
      margin: 10px 0;
    }
  }
`;
