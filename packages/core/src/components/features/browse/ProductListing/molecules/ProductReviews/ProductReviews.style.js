import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils/index';

const downArrowIcon = getIconPath('down_arrow_icon');
const upArrowIcon = getIconPath('up_arrow_icon');

export default css`
  .ratings-and-reviews-container {
    display: none;
  }

  .accordion-button-toggle {
    background: url(${downArrowIcon}) no-repeat right 0 bottom 7px;
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
  }

  .accordion-expanded {
    display: block;
  }

  &.accordion-expanded {
    display: block;
    .accordion-button-toggle {
      background: url(${upArrowIcon}) no-repeat right 0 bottom 7px;
    }
  }

  @media ${props => props.theme.mediaQuery.large} {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};

    .accordion-button-toggle {
      margin-bottom: 21px;
      background: none;
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
    border-top: 7px solid ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
  }
`;
