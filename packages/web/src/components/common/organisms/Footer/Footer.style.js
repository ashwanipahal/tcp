import { css } from 'styled-components';

export default css`
  .footer-top {
    > div {
      border-top: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      padding-top: 32px;
    }
  }
  .footer-top__slots {
    padding-bottom: 16px;
  }
  .footer-top__slot-2 {
    order: 1;
  }
  .footer-bottom__slot--1 {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
  }
  .fullbleed-mobile {
    flex-direction: column-reverse;
    display: flex;
    margin: 0;
  }
  .default-offset {
    padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
  }
  .footer-middle.desktop {
    display: none;
  }
  .reference-id {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
    font-size: 11px;
    padding: 0 15px 24px;
    margin: 0;
    color: ${props => props.theme.colors.WHITE};
    font-family: ${props => props.theme.secondaryFontFamily};
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .default-offset {
      padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.medium}px;
    }
    .footer-top {
      padding-bottom: 20px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .footer-top {
      padding-bottom: 44px;
      border-bottom: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    }
    .footer-bottom {
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    }
    .fullbleed-mobile {
      flex-direction: row;
      margin: 0 ${props => props.theme.gridDimensions.gridOffsetObj.medium}px;
    }
    .default-offset {
      padding: 0;
    }
    .footer-bottom__slot--1 {
      background-color: inherit;
    }
    .footer-middle.mobile {
      display: none;
    }
    .footer-middle.desktop {
      display: flex;
      padding: 60px 0 64px;
    }
    .divider {
      border-left: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    }
    .reference-id {
      text-align: center;
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
      font-size: 12px;
      padding: 11px 0 24px;
      color: ${props => props.theme.colors.TEXT.DARKERGRAY};
    }
  }
`;
