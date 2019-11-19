import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

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

  .carousel-container {
    position: relative;
    width: 100%;
  }

  .facebook,
  .pinterest,
  .twitter {
    width: 35px;
    height: 35px;
    object-fit: contain;
  }

  .social-connect-wrapper {
    padding-top: 70px;
    width: 100%;
    display: flex;
    flex-direction: inherit;
    justify-content: space-between;
  }
  .icon-twitter {
    margin-right: 14px;
  }
  .icon-facebook {
    margin-right: 14px;
  }
  .icon-expand {
    margin-right: 6px;
  }

  .slick-dots {
    position: relative;
    bottom: 0px;
  }
  .social-connect-sub-wrapper {
    display: flex;
    justify-content: flex-end;
    flex: 1;
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
      flex-direction: row;
      align-items: center;
    }
    .social-connect-wrapper {
      padding-top: 34px;
      width: 100%;
      display: inline-block;
    }

    .facebook,
    .pinterest,
    .twitter {
      width: 35px;
      height: 35px;
      object-fit: contain;
    }
    .slick-dots {
      position: relative;
      bottom: 0px;
    }
    .fullSize-image-label .resize-text {
      position: absolute;
      bottom: 68px;
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
    .social-connect-wrapper {
      padding-top: 11px;
      width: 100%;
      display: flex;
      flex-direction: inherit;
      justify-content: space-between;
    }
    .facebook,
    .pinterest,
    .twitter {
      width: 31px;
      height: 31px;
      object-fit: contain;
    }
    .fullSize-image-label .resize-text {
      position: unset;
      bottom: initial;
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
    pointer-events: none;
    background-image: url(${getIconPath('right-disable-carousel-carrot')});
  }
  @media ${props => props.theme.mediaQuery.large} {
    .slick-dots {
      display: none;
    }
  }
`;
