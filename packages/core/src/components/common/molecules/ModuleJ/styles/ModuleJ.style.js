import { css } from 'styled-components';

export default css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

  span {
    background-color: ${props =>
      props.layout !== 'alt' ? props.theme.colorPalette.white : 'none'};
  }

  .moduleJ-promo-alt {
    background-color: ${props => (props.bgColor ? props.bgColor : props.theme.colorPalette.white)};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0;
  }

  .moduleJ-topbar {
    border-top: 3px solid ${props => props.theme.colorPalette.yellow['500']};
    position: absolute;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .moduleJ-promo {
    position: relative;
    text-align: center;
  }

  .link-text {
    margin-bottom: 0;
  }

  .moduleJ-promoBanner {
    margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.SM};
    width: 350px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 260px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 350px;
    }
  }

  &.layout-alt .moduleJ-promoBanner {
    margin: 0 auto;
    width: auto;
  }

  .moduleJ-promo-image-left {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .moduleJ-promo-image-right {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    @media ${props => props.theme.mediaQuery.medium} {
      text-align: right;
    }
  }

  .moduleJ-promo-img {
    width: 100%;

    @media ${props => props.theme.mediaQuery.medium} {
      width: auto;
    }
  }

  .moduleJ__carousel-wrapper {
    margin-top: 27px;

    .slick-list {
      margin-right: -22%;

      @media ${props => props.theme.mediaQuery.medium} {
        margin-right: -15%;
      }

      @media ${props => props.theme.mediaQuery.large} {
        margin-right: auto;
      }
    }
  }

  .moduleJ-image-link {
    display: flex;
    align-items: center;
    width: 89px;
    height: 110px;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 146px;
      height: 180px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 142px;
      height: 175px;
    }

    @media ${props => props.theme.mediaQuery.xlarge} {
      width: 175px;
      height: 217px;
    }
  }

  .moduleJ-cta-btn {
    margin-top: 24px;

    @media ${props => props.theme.mediaQuery.large} {
      margin-top: 16px;
    }
  }
`;
