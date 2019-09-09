import { css } from 'styled-components';

export default css`
  .brand-image {
    width: 83px;
  }
  .TextBox__input {
    border: 1px solid #c3c3c3;
    height: 146px;
    padding: 0;
  }
  .addReceipt {
    padding-top: 10px;
    margin-left: 35px;
  }
  .giftServicesContainer {
    margin-left: 35px;
  }
  .messageTextWrapper {
    width: 92%;
    margin: 29px 0 6px 17px;
  }
  .priceDropdown {
    margin-left: 120px;
  }
  .giftServicesField {
    display: inline-block;
    width: 142px;
  }
  .dropdownDivOverFlow {
    width: 100%;
  }
  .dropdownliBottomBorder {
    width: 98%;
    height: 71px;
    cursor: pointer;
  }
  .giftServicesDetailsLink {
    text-decoration: underline;
    cursor: pointer;
    padding-top: 3px;
  }
  .checkbox-header {
    width: 180px;
    display: flex;
  }
  .custom-select {
    width: 100%;
  }

  .dropdownUlBorder {
    width: 100%;
  }
  .giftServicesModal {
    @media ${props => props.theme.mediaQuery.large} {
      height: 90%;
    }
  }
  .gymImage {
    @media ${props => props.theme.mediaQuery.small} {
      margin-top: 8px;
    }
  }
`;
