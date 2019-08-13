import styled, { css } from 'styled-components';
import { Carousel, LinkText } from '..';

const StyledLinkText = styled(LinkText)`
  margin-top: 44px;
  display: inline-block;

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

  .tcp_carousel_wrapper {
    position: relative;
  }

  .tcp_carousel_wrapper .slick-list {
    min-height: 311px;
  }

  .button-list-container.stackedCTAList,
  .button-list-container.scrollCTAList {
    margin-top: -2px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
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
  }

  @media ${props => props.theme.mediaQuery.large} {
    .tcp_carousel_wrapper .tcp_carousel__play {
      left: ${props => (props.largeCompImageCarousel.length > 4 ? '46%' : '47%')};
    }
  }
`;

export { StyledLinkText as LinkText, StyledCarousel as Carousel, style };

export default {
  LinkText: StyledLinkText,
  StyledCarousel: Carousel,
  style,
};
