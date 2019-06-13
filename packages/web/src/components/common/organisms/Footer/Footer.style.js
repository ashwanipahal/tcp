import { css } from 'styled-components';

export default css`
  .footer-top {
    border-bottom: 2px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  }
  .footer-bottom {
    padding-top: 10px;
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
  .fullbleed-mobile {
    flex-direction: column-reverse;
    margin: 0;
  }
  .default-offset {
    padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.small}px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .default-offset {
      padding: 0 ${props => props.theme.gridDimensions.gridOffsetObj.medium}px;
    }
    .footer-top__slot--1 {
      order: 1;
    }
    .footer-top__slot--2 {
      order: 2;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .footer-top {
      padding-bottom: 46px;
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
  }
`;
