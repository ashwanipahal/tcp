import { css } from 'styled-components';

const OutfitCarouselStyle = css`
  margin-bottom: 32px;
  .heading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    text-align: center;
  }
  .subheading {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    text-align: center;
  }
  .carousel-image {
    margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
`;

export default OutfitCarouselStyle;
