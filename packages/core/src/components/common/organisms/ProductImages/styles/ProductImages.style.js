import { css } from 'styled-components';

export default css`
  display: flex;
  justify-content: space-between;
  .preview-and-social-media-icons {
    width: 100px;
  }
  .resize-text {
    position: absolute;
    display: none;
  }

  .main-image-container-wrap {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
  }

  .enlarged-image-container {
    position: relative;
    z-index: ${props => props.theme.zindex.zEnlargedImage};
  }
  .enlarged-image {
    position: absolute;
    z-index: ${props => props.theme.zindex.zEnlargedImage};
    height: 100%;
    margin-left: 90px;
    img {
      max-width: none;
    }
  }
  .enlarged-image-wrapper {
    z-index: 100;
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }
  .main-image-container {
    width: 100%;
    position: relative;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .main-image-container-wrap {
      width: 100%;
      margin-right: 30px;
    }
    .main-image-container-wrap-full-size {
      width: calc(100% - 146px);
      margin-left: 40px;
      margin-right: 16px;
    }
    .resize-text {
      display: inline-flex;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .main-image-container-wrap {
      width: calc(100% - 280px);
      margin-left: 90px;
      margin-right: 90px;
    }
    .main-image-container-wrap-full-size {
      width: calc(100% - 195px);
      margin-left: 65px;
      margin-right: 40px;
    }
  }
`;

export const carousalStyle = css`
  .slick-next {
    height: 39px;
    right: -20px;
    width: 19px;
  }
  .slick-prev {
    height: 38px;
    left: -20px;
    width: 19px;
  }
  .slick-disabled {
    display: none !important;
  }
`;
