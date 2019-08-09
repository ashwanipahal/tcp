import styled, { css } from 'styled-components';
import { Carousel, LinkText } from '..';

const StyledLinkText = styled(LinkText)`
  margin-top: 0;
  display: inline-block;
`;

const StyledCarousel = styled(Carousel)`
  .slick-arrow {
    top: 44%;
  }
  .slick-next {
    height: 52px;
    right: 30px;
    width: 15px;
  }
  .slick-prev {
    height: 52px;
    left: 30px;
    width: 15px;
    z-index: 1;
  }

  .slick-dots {
    bottom: 36px;
    left: 50px;
    text-align: left;
    z-index: 1;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .slick-dots {
      left: calc(${props => props.theme.spacing.LAYOUT_SPACING.LRG} + 6px);
    }
  }
`;

const style = css`
  position: relative;
  background-color: #003057;

  .bottom-bar {
    height: 54px;
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
    top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    left: 0;
    width: 100%;
    height: 100%;
  }

  .tcp_carousel_wrapper .tcp_carousel__play {
    left: 30px;
    bottom: calc(${props => props.theme.spacing.LAYOUT_SPACING.XS} + 64px);
    z-index: 1;
  }

  .bottom-blue-bar {
    height: 62px;
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
  }

  .moduleA__ribbonBanner {
    font-size: 14px;
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

  @media ${props => props.theme.mediaQuery.medium} {
    .banner-content {
      top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
      left: 120px;
      width: 450px;
    }

    .tcp_carousel_wrapper .tcp_carousel__play {
      left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    .banner-content {
      top: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
      left: 120px;
      width: 450px;
    }
  }
`;

export { StyledLinkText as LinkText, StyledCarousel as Carousel, style };

export default {
  LinkText: StyledLinkText,
  StyledCarousel: Carousel,
  style,
};
