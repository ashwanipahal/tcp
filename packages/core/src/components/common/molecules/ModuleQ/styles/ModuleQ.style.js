import { css } from 'styled-components';

export default css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} auto;

  @media ${props => props.theme.mediaQuery.large} {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 15px;
  }

  &.yellow-bg {
    background-image: radial-gradient(circle at 61% 22%, #fff, #f1f4a2);
  }

  .moduleQ-promo-header {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .moduleQ__carousel-wrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    .slick-track {
      display: flex;
      align-items: center;
    }

    .slick-slide > div {
      margin: 0 auto;
      opacity: 0.6;
      transform: scale(0.75);

      @media ${props => props.theme.mediaQuery.mediumOnly} {
        width: 270px;
        transform: scale(1.1);
      }
    }

    .slick-center > div {
      opacity: 1;
      transform: scale(1.1);

      @media ${props => props.theme.mediaQuery.mediumOnly} {
        margin: 0 auto;
        width: 354px;
      }
    }

    .slick-slide.slick-center {
      padding: 20px 0 ${props => props.theme.spacing.ELEM_SPACING.XL};

      @media ${props => props.theme.mediaQuery.medium} {
        padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
          ${props => props.theme.spacing.ELEM_SPACING.XXL};
      }

      @media ${props => props.theme.mediaQuery.large} {
        padding: ${props => props.theme.spacing.ELEM_SPACING.XXL} 0;
      }
    }

    .slick-dots {
      bottom: -${props => props.theme.spacing.ELEM_SPACING.SM};
    }

    .slick-prev {
      left: -45px;
    }

    .slick-next {
      right: -45px;
    }
  }

  .looks-large-image {
    background-color: ${props => props.theme.colorPalette.white};
    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.15);
    margin-bottom: 9px;
    padding: 16px 16px 0;

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 20px 20px 0;
    }
  }

  .shop-this-look-link {
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
  }

  .looks-images-wrapper {
    display: flex;
    direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .looks-image {
    background-color: ${props => props.theme.colorPalette.white};
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    width: 32%;
    height: 100px;
    text-align: center;

    img {
      max-height: 100%;
      margin: 0 auto;
    }
  }

  .looks-image-last {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.fonts.fontSize.fs22};
    font-weight: 800;
    text-align: center;
    color: ${props => props.theme.colorPalette.gray['900']};
    background-color: ${props => props.theme.colorPalette.white};
    margin-right: 0;

    p {
      text-align: center;
      margin: 0 auto;
    }
  }

  .slick-center {
    .looks-image {
      width: 32%;
      height: 86px;

      @media ${props => props.theme.mediaQuery.medium} {
        height: 138px;
      }

      @media ${props => props.theme.mediaQuery.large} {
        height: 140px;
      }
    }
  }
  .skeleton-image-wrapper {
    height: 212px;
    @media ${props => props.theme.mediaQuery.medium} {
      height: 419px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      height: 427px;
    }
  }
`;
