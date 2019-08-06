import styled from 'styled-components';

export default styled.div`
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  margin-bottom: 20px;
  .padding-top-10 {
    padding-top: 10px;
  }
  .padding-left-10 {
    padding-left: 10px;
  }
  .padding-left-13 {
    padding-left: 13px;
  }
  .product-details {
    margin-bottom: 5px;
  }
  .product-image {
    text-align: center;
  }
  .brand-image {
    text-align: center;
  }
  .padding-left {
    margin-left: 5px;
  }
  .edit-button {
    padding-left: 10px;
  }
  .padding-top-15 {
    padding-top: 15px;
  }
  .padding-bottom-20 {
    padding-bottom: 20px;
  }
`;
