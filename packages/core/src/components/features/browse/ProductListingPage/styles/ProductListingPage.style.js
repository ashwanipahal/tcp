/* stylelint-disable */
import styled from 'styled-components';

export default styled.div`
  background-color: none;
  .product-item:nth-child(3n) {
    margin-right: 0;
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 0;
    }
  }
  .product-disc-price {
    @media ${props => props.theme.mediaQuery.large} {
      text-align: center;
      padding: 1%;
      color: #900;
    }
  }
  .product-original-price {
    @media ${props => props.theme.mediaQuery.large} {
      text-align: center;
      padding: 1%;
      color: #999;
    }
  }
  .product-item {
    @media ${props => props.theme.mediaQuery.large} {
      width: 29%;
      border: solid 0.5px black;
      border-radius: 4px;
      padding: 1%;
      margin-bottom: 1%;
      font-family: Lato-Bold;
      font-style: normal;
      font-stretch: normal;
      font-size: 15px;
      background-color: #eeeeef;
    }
  }
`;
