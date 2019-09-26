import { css } from 'styled-components';

export default css`
  .ratings-and-reviews-container {
    display: none;
  }

  .accordion-toggle {
    font-size: 0px;
  }

  .accordion-expanded {
    display: block;
  }

  @media ${props => props.theme.mediaQuery.large} {
    .accordion-button-toggle {
      display: none;
    }
    .ratings-and-reviews-container {
      display: block;
    }
  }

  #BVSpotlightsContainer {
    z-index: 1;
    position: relative;
  }

  .product-details-accordion {
    border-top: 7px solid #f7f7f7;
  }
`;
