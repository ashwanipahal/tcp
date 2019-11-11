import styled, { css } from 'styled-components';

import { Carousel } from '../..';

const StyledCarousal = styled(Carousel)`
  .carousel-nav-arrow-button {
    position: absolute;
    background: transparent;
    border: 0;
    z-index: 1;
    top: 50%;
    transform: translate(0, -50%);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: ${props => `${props.theme.spacing.ELEM_SPACING.LRG} 14px`};
    background-color: ${props => props.theme.colorPalette.white};
    cursor: pointer;
  }
  .carousel-nav-next-button {
    right: 0;
  }
  .carousel-nav-prev-button {
    left: 0;
    transform: rotate(180deg) translate(0, 50%);
  }
  .slick-dots {
    bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .slick-slide {
    position: relative;
  }

  .slick-list,
  .slick-list img {
    min-height: 200px;
    max-height: 373px;

    @media ${props => props.theme.mediaQuery.medium} {
      min-height: 300px;
      max-height: 406px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      min-height: 300px;
      max-height: 695px;
    }
  }
`;

export default css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};

  .carousel-cta-button {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .tcp_carousel_wrapper {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .carousel-cta-button-with-eybrow-img {
    margin-bottom: 0;
  }

  .carousel-cta-link {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 54px;
  }
  .button-list-container-alternate {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .small-composite-image-header {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .small-composite-image {
    text-align: center;
  }
  .promo-area-image-link {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    line-height: 0;
    display: block;
  }

  .small-composite-image img {
    max-height: 164px;

    @media ${props => props.theme.mediaQuery.medium} {
      max-height: 225px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      max-height: 250px;
    }
  }

  .promo-area-image-link-spaced {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .module-e-divider {
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.colorPalette.gray[500]};
  }
  .module-e-divider-top {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .module-e-divider-bottom {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .module-e-img-full-width {
    width: 100%;
  }

  .module-e-header-text .link-text {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .carousel-cta-button-with-eybrow-img {
      border-bottom: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .button-list-container-alternate {
      padding-bottom: 0;
    }
    .carousel-cta-button-with-eybrow-img {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    .stacked-button-list-wrapper .stacked-button,
    .scroll-button-list-wrapper .scroll-button {
      min-width: 134px;
      margin-left: 15px;
      &:nth-child(1) {
        margin-left: 0;
      }
      button {
        width: 134px;
        padding-right: 4px;
        padding-left: 4px;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

    .promo-area-image-link {
      margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    }

    .button-list-container-alternate {
      margin-bottom: 0;
    }

    .small-composite-image-0 {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    .stacked-button-list-wrapper .stacked-button,
    .scroll-button-list-wrapper .scroll-button {
      min-width: 142px;
      margin-left: 15px;
      margin-right: 0;
      padding: 0;
      &:nth-child(1) {
        margin-left: 0;
      }
      button {
        width: 142px;
      }
    }
  }

  @media ${props => props.theme.mediaQuery.xlarge} {
    .stacked-button-list-wrapper .stacked-button,
    .scroll-button-list-wrapper .scroll-button {
      min-width: 174px;
      button {
        width: 174px;
      }
    }
  }
`;

export { StyledCarousal as Carousel };
