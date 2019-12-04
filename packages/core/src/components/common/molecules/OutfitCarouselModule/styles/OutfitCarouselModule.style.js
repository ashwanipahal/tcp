import { css } from 'styled-components';

const OutfitCarouselStyle = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  .heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    text-align: center;
  }
  .subheading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    text-align: center;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
  .carousel-image {
    margin: 0 auto 16px;
  }
  .slick-slide > div {
    padding: 0 4px;
  }
  .slick-prev,
  .slick-next {
    margin-top: -20px;
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
    .subheading {
      padding-left: 190px;
      padding-right: 190px;
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
      padding-left: 290px;
      padding-right: 290px;
    }
    .carousel-image {
      margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;

export default OutfitCarouselStyle;
