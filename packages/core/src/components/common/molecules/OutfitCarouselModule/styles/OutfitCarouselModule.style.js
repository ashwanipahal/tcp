import { css } from 'styled-components';

const OutfitCarouselStyle = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SX};
  .heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    text-align: center;
  }
  .subheading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    text-align: center;
  }
  .carousel-image {
    margin: 0 auto 16px;
  }
  .slick-slide > div {
    padding: 0 4px;
  }
  .slick-list {
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .slick-slide > div {
      padding: 0 12px;
    }
    .slick-prev,
    .slick-next {
      height: 52px;
    }
    .slick-list {
      margin: 0 38px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .slick-slide > div {
      padding: 0 15px;
    }
    .slick-list {
      margin: 0 60px;
    }
    .slick-slider {
      margin: 0 35px;
    }
    .heading {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
    .subheading {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
    .carousel-image {
      margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;

export default OutfitCarouselStyle;
