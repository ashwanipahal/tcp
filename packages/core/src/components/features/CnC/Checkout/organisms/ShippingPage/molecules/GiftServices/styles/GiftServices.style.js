import { css } from 'styled-components';

export default css`
  .brand-image {
    width: 83px;
  }
  .shortDesc {
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
  }
  .checkbox-header {
    width: 180px;
    display: flex;
  }
  .TextBox__input {
    border: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    height: 146px;
    padding: 0;
    width: 99%;
  }
  .addReceipt {
    padding-top: 10px;
    margin-left: 35px;
  }
  .giftServicesContainer {
    p {
      width: 100%;
    }
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

  .dropdownliBottomBorder {
    height: 71px;
    cursor: pointer;
    padding-top: 2px;
    padding-bottom: 0px;
  }
  .price {
    float: right;
    margin-right: 5px;
  }
  .longDesc {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
  }
  .giftServicesDetailsLink {
    text-decoration: underline;
    cursor: pointer;
    padding-top: 3px;
  }

  .phone-field-wrapper {
    width: auto;
    margin-left: -12px;
    padding-right: 15px;
  }

  .normal-select-box {
    padding-top: 5px;
  }

  .custom-select {
    width: 100%;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    > span {
      display: none;
    }
  }

  .giftServicesModal {
    @media ${props => props.theme.mediaQuery.large} {
      height: 90%;
    }
  }

  .customSelectTitle {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy3}px;
  }

  .dropdownDivOverFlow {
    div {
      font-family: ${props => props.theme.fonts.secondaryFontFamily};
    }
    .dropdownUlBorder {
      width: auto;
      border: 1px solid ${props => props.theme.colors.PRIMARY.DARK};
    }
    .dropdownActiveClass {
      background-color: ${props => props.theme.colors.PRIMARY.DARK};
      div {
        color: ${props => props.theme.colors.WHITE};
        font-family: ${props => props.theme.fonts.secondaryFontFamily};
      }
      span {
        font-family: ${props => props.theme.fonts.secondaryFontFamily};
      }
      .dropdownActiveIcon {
        display: none;
      }
    }
  }

  .gymImage {
    @media ${props => props.theme.mediaQuery.small} {
      margin-top: 8px;
    }
  }
`;
