import { css } from 'styled-components';

const JeansModuleStyles = css`
  position: relative;
  height: 313px;
  border: 1px solid ${props => props.theme.colorPalette.gray[400]};
  margin: 0 -14px ${props => props.theme.spacing.ELEM_SPACING.XL} -14px;
  .jeans-carousel {
    background: ${props => props.theme.colorPalette.gray[300]};
    overflow: hidden;
  }
  .image-link {
    .carousel-image {
      margin: 0 auto;
      height: 276px;
    }
  }
  .title-section {
    width: 313px;
    height: 30px;
    background: ${props => props.data.set[1].val};
    position: absolute;
    bottom: -30px;
    left: 0;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    transform: rotate(270deg);
    transform-origin: 0 0;
    line-height: 30px;
    text-decoration: uppercase;
  }
  .image-text {
    height: 36px;
    border-top: 1px solid ${props => props.theme.colorPalette.gray[900]};
    background: transparent;
    text-align: center;
    line-height: 38px;
    width: 80%;
    margin-left: 10%;
    text-transform: uppercase;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
    }
  }
  .tcp_carousel_wrapper {
    margin-left: 44px;
  }

  .overlapping-section,
  .plus-button {
    display: none;
  }
  .slick-slide > div {
    padding: 0 6px;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    height: 407px;
    margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XL} 0;
    .image-link {
      .carousel-image {
        height: 370px;
      }
    }
    .title-section {
      width: 408px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    height: 457px;
    .plus-icon {
      display: block;
      position: absolute;
      bottom: 167px;
      .left {
        left: 17px;
      }
      right: 17px;
    }

    .image-link {
      .carousel-image {
        height: 420px;
      }
    }
    .title-section {
      margin-left: 0;
      width: 458px;
    }
    .tcp_carousel_wrapper {
      margin-left: 30px;
    }

    .jeans-carousel:hover {
      position: relative;

      .overlapping-section {
        display: block;
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
      }
      .carousel-image {
        opacity: 0.05;
      }
    }
    .text-container {
      img {
        display: inline-block;
        vertical-align: middle;
      }
      .text-item {
        display: inline;
      }
    }
    .done-button {
      width: 20px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    }
    .shop-now-link {
      position: absolute;
      bottom: 0;
      background: ${props => props.data.set[1].val};
      color: white;
      width: 100%;
      height: 38px;
      line-height: 38px;
      left: 0;
      font-family: ${props => props.theme.fonts.primaryFontFamily};
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }

    .text-header {
      margin: 19px 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
    }
    .text-subheader {
      margin-bottom: 27px;
    }
    .text-line {
      text-align: left;
      margin: 0 ${props => props.theme.spacing.ELEM_SPACING.MED} 20px;
    }
    .slick-prev,
    .slick-next {
      width: 48px;
      height: 48px;
      z-index: 1;
      border-radius: 30px;
      margin-left: 6px;
      background-color: white;
      background-image: url(/static/images/carrot-left-light-gray.svg);
      background-repeat: no-repeat;
      background-position: center center;
      align-content: center;
    }
    .slick-prev {
      margin-left: 6px;
      transform: rotate(0deg) translate(0, -50%);
    }
    .slick-next {
      transform: rotate(180deg) translate(0, -50%);
      transform-origin: 24px 0;
    }
  }
`;

export default JeansModuleStyles;
