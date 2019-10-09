import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils/index';

const downArrowIcon = getIconPath('down_arrow_icon');
const upArrowIcon = getIconPath('up_arrow_icon');

export default css`
  .button-wrapper {
    cursor: pointer;
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    padding: 0;
    text-decoration: underline;
    font-size: 10px;
    font-family: ${props => props.theme.typography.fonts.secondary};
    border: none;
    background: none;
    outline: none;
  }

  .show-description-list {
    display: none;
  }

  .product-detail-footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .claim-message {
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0 7px;
  }

  .short-description {
    line-height: 22px;
  }

  max-height: initial;

  .product-desc-heading {
    margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
    background: url(${upArrowIcon}) no-repeat right 0 bottom 7px;
  }

  .show-accordion-toggle {
    background: url(${downArrowIcon}) no-repeat right 0 bottom 7px;
  }
  .common-claim-message {
    padding-top: 0;
  }
  .introduction-text {
    max-height: 90px;
    overflow: hidden;
    .list-content {
      padding-left: 18px;
      li {
        list-style-type: disc;
        line-height: 22px;
      }
    }
  }

  .show-more-expanded {
    max-height: initial;
    overflow: visible;
  }

  @media ${props => props.theme.mediaQuery.large} {
    .product-desc-heading {
      background: none;
    }
    .show-description-list {
      display: block;
    }
    .introduction-text {
      max-height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
    .show-more-expanded {
      max-height: initial;
      overflow: visible;
    }
    .button-wrapper {
      border: none;
      outline: none;
    }
  }
`;
