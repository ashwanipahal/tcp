import styled, { css } from 'styled-components';
import { Carousel, LinkText } from '..';

const StyledLinkText = styled(LinkText)`
  margin-top: 10px;
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
    bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    z-index: 1;
  }
`;

const style = css`
  position: relative;
  margin-bottom: 40px;

  &.gymboree-module-a {
    background-color: ${props => props.theme.colorPalette.blue.C900};
  }

  .banner-slide {
    position: relative;
    img {
      width: 100%;
    }
  }

  .banner-content {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: 0;
    width: 100%;
  }

  .stacked-cta-wrapper-class {
    padding-top: 16px;
    padding-right: 20px;
    padding-bottom: 16px;
    padding-left: 20px;
    color: ${props => props.theme.colorPalette.gray[800]};
  }

  &.gymboree-module-a .banner-content {
    @media ${props => props.theme.mediaQuery.smallMax} {
      transform: translate(-50%, 0);
      top: 8.7%;
      left: 50%;
      width: 60%;
    }
    @media ${props => props.theme.mediaQuery.medium} {
      left: 14px;
      width: 255px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      line-height: 90px;
      top: 50%;
      left: 120px;
      transform: translate(0%, -50%);
      width: 470px;

      .link-text-wrapper {
        width: 100%;
      }
    }
  }

  .tcp_carousel_wrapper {
    position: relative;
  }

  .tcp_carousel_wrapper .slick-list,
  .banner-slide {
    min-height: 200px;
    max-height: 311px;

    @media ${props => props.theme.mediaQuery.medium} {
      min-height: 300px;
      max-height: 406px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      min-height: 300px;
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
    color: ${props =>
      props.theme.isGymboree
        ? props.theme.colors.BUTTON.WHITE
        : props.theme.colors.BUTTON[props.fill || 'WHITE'].TEXT};
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .button-list-container.stackedCTAList {
      padding: 16px 0;
    }
  }

  .moduleA__ribbonBanner {
    font-size: 14px;
  }

  .ribbon-container {
    background: transparent url('/static/images/module-a-ribbon-right.png') no-repeat right 0;
    background-size: contain;
    position: absolute;
    right: 0;
    bottom: 12px;
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
      width: 266px;
      height: 71px;
    }
  }

  &.gymboree-module-a .imageCTAList .image-comp,
  &.gymboree-module-a .linkCTAList .link-button-wrapper-class {
    color: ${props => props.theme.colors.BUTTON[props.fill || 'BLACK'].TEXT};
  }

  &.gymboree-module-a .slick-dots {
    bottom: 16px;
    left: 15px;
    justify-content: flex-start;
    @media ${props => props.theme.mediaQuery.medium} {
      left: 24px;
    }
  }

  .moduleA__promoBanner {
    line-height: unset;
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

  &.left-aligned-ribbon {
    .slick-dots {
      justify-content: flex-end;
      right: 15px;
      left: auto;
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
