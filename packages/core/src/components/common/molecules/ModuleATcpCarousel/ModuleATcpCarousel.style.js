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
    max-height: 311px;

    @media ${props => props.theme.mediaQuery.medium} {
      max-height: 406px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      max-height: 474px;
    }
  }

  .button-list-container.stackedCTAList,
  .button-list-container.scrollCTAList {
    border-top: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};

    @media ${props => props.theme.mediaQuery.medium} {
      border-top: 0;
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
