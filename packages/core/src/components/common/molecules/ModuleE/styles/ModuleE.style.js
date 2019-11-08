import styled, { css } from 'styled-components';

import { Carousel } from '../..';

const StyledCarousal = styled(Carousel)`
  .slick-arrow {
    top: 50%;
  }
  .slick-next {
    height: 50px;
    right: 0;
    width: 13px;
    background-color: ${props => props.theme.colorPalette.white};
  }
  .slick-prev {
    height: 50px;
    left: 0;
    width: 13px;
    background-color: ${props => props.theme.colorPalette.white};
  }
  .slick-dots {
    bottom: -12px;
  }
`;

export default css`
  .button-list-container-alternate {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .small-composite-image {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;

export { StyledCarousal as Carousel };
