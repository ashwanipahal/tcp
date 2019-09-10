import { css } from 'styled-components';

export default css`
  .recommendations-header {
    text-align: center;
  }

  .slick-arrow {
    z-index: 1;
  }

  .recommended_product {
    display: block;
  }

  .recommended_product--image {
    height: 267px;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    margin-bottom: 5px;
  }

  .recommended_product--title {
    color: ${props => props.theme.colorPalette.gray[900]};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    padding-top: 10px;
  }

  .recommended_product--offerPrice {
    padding-top: 5px;
    color: ${props => props.theme.colorPalette.red[500]};
    font-size: ${props => props.theme.typography.fontSizes.fs18};
  }

  .recommended_product--listPrice {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    color: ${props => props.theme.colorPalette.gray[100]};
  }
`;
