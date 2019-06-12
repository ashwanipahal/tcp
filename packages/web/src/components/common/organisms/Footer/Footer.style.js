import { css } from 'styled-components';

export default css`
  .footer-top {
    border-bottom: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  }
  .footer-bottom {
    padding-top: 10px;
    flex-direction: column-reverse;
    background: ${props => props.theme.colors.WHITE};
  }
  .footer-top__slot--1 {
    order: 2;
  }
  .footer-top__slot-2 {
    order: 1;
  }
  .footer-bottom__slot--1 {
    background-color: ${props => props.theme.colors.BRAND.PRIMARY};
  }
  @media ${props => props.theme.mediaQuery.small} {
    .footer-middle.mobile {
      display: flex;
    }
    .footer-middle.desktop {
      display: none;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .footer-top__slot--1 {
      order: 1;
    }
    .footer-top__slot--2 {
      order: 2;
    }
    .footer-bottom {
      flex-direction: row;
      background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
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
      border-left: 1px solid #c3c3c3;
    }
  }
`;
