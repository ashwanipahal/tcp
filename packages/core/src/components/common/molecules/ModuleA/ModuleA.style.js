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
    bottom: 26px;
    z-index: 1;
  }
`;

const style = css`
  position: relative;
  .banner-slide {
    position: relative;
  }
  .banner-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .tcp_carousel_wrapper .tcp_carousel__play {
    left: 40%;
    bottom: 18px;
    z-index: 1;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 45%;
    }
  }
`;

export { StyledLinkText as LinkText, StyledCarousel as Carousel, style };

export default {
  LinkText: StyledLinkText,
  StyledCarousel: Carousel,
  style,
};
