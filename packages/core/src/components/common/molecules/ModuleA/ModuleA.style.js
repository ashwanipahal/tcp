import styled, { css } from 'styled-components';
import { Carousel, LinkText } from '..';

const StyledLinkText = styled(LinkText)`
  margin-top: 16px;
  display: inline-block;

  @media ${props => props.theme.mediaQuery.medium} {
    margin-top: 40px;
  }

  .link-text {
    margin-bottom: 0;
  }
`;

const StyledCarousel = styled(Carousel)`
  .slick-arrow {
    background-size: 100% 100%;
    height: 42px;
    width: 13px;
    z-index: 1;
  }
  .slick-next {
    right: 36px;
  }
  .slick-prev {
    left: 36px;
  }
  .slick-dots {
    bottom: 26px;
    z-index: 1;
  }
`;

const style = css`
  position: relative;
  margin-bottom: 40px;

  &.gymboree-module-a {
    background-color: #003057;
  }

  .banner-slide {
    position: relative;
    img {
      width: 100%;
    }
  }

  .banner-content {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.gymboree-module-a .banner-content {
    @media ${props => props.theme.mediaQuery.medium} {
      top: 40px;
      left: 14px;
      width: 280px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      top: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
      left: 120px;
      width: 470px;
    }
  }

  .tcp_carousel_wrapper {
    position: relative;
  }

  .tcp_carousel_wrapper .slick-list {
    max-height: 311px;

    @media ${props => props.theme.mediaQuery.medium} {
      max-height: 406px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      max-height: 474px;
    }
  }

  .button-list-wrapper {
    padding: 0;
  }

  .button-list-container {
    padding: 16px 0;
  }

  .button-list-container.stackedCTAList {
    padding: 0;
  }

  .button-list-container.imageCTAList .image-comp,
  .button-list-container.linkCTAList .link-button-wrapper-class {
    color: ${props => props.theme.colors.BUTTON[props.fill || 'WHITE'].TEXT};
    border-color: ${props => props.theme.colors.BUTTON[props.fill || 'WHITE'].TEXT};
  }

  .tcp_carousel_wrapper .tcp_carousel__play {
    left: 39%;
    bottom: 18px;
    z-index: 1;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .tcp_carousel_wrapper .tcp_carousel__play {
      left: 45%;
    }

    .button-list-container.stackedCTAList {
      padding: 16px 0;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .tcp_carousel_wrapper .tcp_carousel__play {
      left: ${props => (props.largeCompImageCarousel.length > 4 ? '46%' : '47%')};
    }
  }

  .moduleA__ribbonBanner {
    font-size: 14px;
  }

  .ribbon-container {
    background: transparent url('/static/images/module-a-ribbon-right.png') no-repeat 0 0;
    background-size: contain;
    position: absolute;
    right: 0;
    bottom: 15px;
    width: 168px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 234px;
      height: 67px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 272px;
      height: 77px;
    }
  }

  &.gymboree-module-a .imageCTAList .image-comp,
  &.gymboree-module-a .linkCTAList .link-button-wrapper-class {
    color: ${props => props.theme.colors.BUTTON[props.fill || 'BLACK'].TEXT};
    border-color: ${props => props.theme.colors.BUTTON[props.fill || 'BLACK'].TEXT};
  }

  &.gymboree-module-a .slick-dots {
    bottom: 36px;
    left: 50px;
    text-align: left;
    z-index: 1;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 54px;
    }
  }

  @media ${props => props.theme.mediaQuery.medium} {
    &.gymboree-module-a.tcp_carousel_wrapper .tcp_carousel__play {
      left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
  }

  &.gymboree-module-a .moduleA__promoBanner {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding: 0 ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  @media ${props => props.theme.mediaQuery.medium} {
    &.gymboree-module-a .moduleA__promoBanner {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  &.gymboree-module-a .tcp_carousel__play {
    left: 30px;
    bottom: 28px;
    z-index: 1;
  }

  &.left-aligned-ribbon {
    .slick-dots {
      text-align: right;
      left: auto;
      right: 68px;
    }

    .tcp_carousel_wrapper .tcp_carousel__play {
      left: auto;
      right: 18px;
    }

    .ribbon-container {
      background: transparent url('/static/images/module-a-ribbon-left.png') no-repeat 0 0;
      background-size: contain;
      right: auto;
      left: 0;
    }
  }
`;

export { StyledLinkText as LinkText, StyledCarousel as Carousel, style };

export default {
  LinkText: StyledLinkText,
  StyledCarousel: Carousel,
  style,
};
