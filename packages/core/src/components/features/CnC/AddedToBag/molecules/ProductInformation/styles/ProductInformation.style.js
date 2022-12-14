import styled from 'styled-components';

export default styled.div`
  .product-details {
    float: left;
    width: 37%;
    margin-bottom: 5px;
  }
  .product-image {
    text-align: center;
    width: 100px;
  }
  .brand-image {
    text-align: center;
    padding-top: 8px;
    width: 55px;
    height: 20px;
  }
  .itemList {
    width: 36px;
    font-size: 13px;
  }
  .itemDesc {
    width: 120px;
    margin-left: 17px;
    font-size: 13px;
  }
  .product-title {
    width: 203px;
  }
  .product-description {
    width: 210px;
  }
  .product-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
