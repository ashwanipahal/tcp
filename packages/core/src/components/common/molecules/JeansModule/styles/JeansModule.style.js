import { css } from 'styled-components';

const JeansModuleStyles = css`
  position: relative;
  height: 313px;
  border: 1px solid ${props => props.theme.colorPalette.gray[400]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};

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
    background: ${props => props.jeansModule.set[1].val};
    position: absolute;
    bottom: -30px;
    left: 0;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
    transform: rotate(270deg);
    transform-origin: 0 0;
    color: white;
    text-align: center;
    line-height: 30px;
  }
  .image-text {
    height: 36px;
    border-top: 1px solid ${props => props.theme.colorPalette.gray[900]};
    background: transparent;
    text-align: center;
    line-height: 36px;
    width: 80%;
    margin-left: 10%;
    text-transform: uppercase;
  }
  .tcp_carousel_wrapper {
    margin-left: 44px;
  }

  .overlapping-section {
    display: none;
  }

  @media ${props => props.theme.mediaQuery.large} {
    .title-section {
      margin-left: 0;
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
        opacity: 0.2;
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
      background: ${props => props.jeansModule.set[1].val};
      color: white;
      width: 100%;
      height: 38px;
      line-height: 36px;
      left: 0;
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
  }
`;

export default JeansModuleStyles;
