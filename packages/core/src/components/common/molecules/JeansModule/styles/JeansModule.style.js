import { css } from 'styled-components';

const JeansModuleStyles = css`
  position: relative;
  height: 312px;

  .jeans-carousel {
    background: ${props => props.theme.colorPalette.gray[300]};
  }
  .image-link {
    img {
      margin: 0 auto;
      height: 276px;
    }
  }
  .title-section {
    width: 312px;
    height: 30px;
    background: #1a1a1a;
    position: absolute;
    bottom: -30px;
    left: 0;
    margin-left: 14px;
    transform: rotate(270deg);
    transform-origin: 0 0;
    color: white;
    text-align: center;
    line-height: 30px;
  }
  .image-text {
    height: 36px;
    border-top: 1px solid #1a1a1a;
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

  @media ${props => props.theme.mediaQuery.large} {
    .title-section {
      margin-left: 0;
    }
    .tcp_carousel_wrapper {
      margin-left: 30px;
    }
  }
`;

export default JeansModuleStyles;
