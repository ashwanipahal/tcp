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
  && .recommendations-tile {
    .slick-list {
      margin-right: -33%;
      margin-left: -33%;
    }
  }
  && .recommendations-tile .slick-arrow {
    top: 20%;
  }
  && .slick-next,
  .slick-prev {
    height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    top: 20%;
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
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XXXL};
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
