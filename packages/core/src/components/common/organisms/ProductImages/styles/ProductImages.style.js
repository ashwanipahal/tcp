import { css } from 'styled-components';

export default css`
  display: flex;
  justify-content: space-between;
  .preview-and-social-media-icons {
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
    z-index: 100;
  }
  .enlarged-image {
    position: absolute;
    z-index: 100;
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
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .main-image-container-wrap {
      width: 100%;
      margin-right: 30px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .preview-and-social-media-icons {
      width: 100px;
      display: block;
    }
    .main-image-container-wrap {
      width: calc(100% - 280px);
      margin-left: 90px;
      margin-right: 90px;
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
