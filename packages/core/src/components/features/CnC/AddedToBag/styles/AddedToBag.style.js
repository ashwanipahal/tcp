import { css } from 'styled-components';

export const modalStyles = css`
  div.TCPModal__InnerContent.atb-innerContent {
    right: 0;
    left: auto;
    top: 0;
    bottom: 0;
    transform: none;
    box-shadow: 0 4px 8px 0 rgba(163, 162, 162, 0.5);
    padding: 7px 15px 20px 17px;
    width: 350px;
    @media ${props => props.theme.mediaQuery.large} {
      width: 375px;
    }

    .Modal_Heading {
      font-size: 16px;
      font-family: ${props => props.theme.fonts.secondaryFontFamily};
      font-weight: normal;
      line-height: 43px;
      border: none;
      margin-bottom: 0;
      padding: 0;
      display: inline;
    }
  }
`;

export const productInfoStyles = css`
  .product {
    margin: 0;
    width: 100%;
  }
`;

export const pointsInfoStyles = css`
  .row-padding {
    margin: 0;
    width: 100%;
  }
  .divided-line {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;

export const buttonActionStyles = css`
  .view-bag-container {
    margin: 0;
    width: 100%;
  }
  .checkout-button {
    margin: 0;
    width: 100%;
  }
`;

export const LoyaltyWrapperStyles = css`
  .loyalty-banner-wrapper {
    padding: 0;
  }
`;

export const recommendationStyles = css`
  .recommendations-header {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
  }
  .container-price > p {
    font-size: ${props => props.theme.typography.fontSizes.fs15};
  }
  && .product-image-container > a {
    min-height: 130px;
  }
  && .slick-list {
    margin-right: -20%;
    margin-left: -8%;
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: -8%;
    }
  }
  && .recommendations-tile .slick-arrow {
    top: 35%;
  }
  && .slick-prev {
    top: 18%;
    margin-left: 13%;

    background-image: none;
    width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
    height: 72px;
    opacity: 0.79;
    background-color: ${props => props.theme.colors.WHITE};
    border-top-right-radius: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    border-bottom-right-radius: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  }
  && .slick-prev::after {
    content: '';
    border: solid black;
    border-width: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.XXS} 0;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
  && .slick-next {
    top: 18%;
    margin-right: 13%;

    background-image: none;
    width: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
    height: 72px;
    opacity: 0.79;
    background-color: ${props => props.theme.colors.WHITE};
    border-top-left-radius: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
    border-bottom-left-radius: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
  }
  && .slick-next::after {
    content: '';
    border: solid black;
    border-width: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS}
      ${props => props.theme.spacing.ELEM_SPACING.XXS} 0;
    display: inline-block;
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS};
    transform: rotate(-45deg);
    background: none;
  }
  && .product-list {
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
  }
`;

const styles = css`
  .added-to-bg-close {
    top: 21px;
  }
  .addedToBagWrapper {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 43px);
  }
  .continue-shopping {
    text-align: center;
    margin: 24px 0;
  }
  .recommendationWrapper {
    margin: 0 20px;
    @media ${props => props.theme.mediaQuery.large} {
      margin: 0;
    }
  }
  .loyaltyAddedToBagWrapper {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export const customStyles = css`
  .spinner-overlay {
    position: absolute;
  }
`;

export default styles;
