import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils/index';

const downArrowIcon = getIconPath('down_arrow_icon');

export default css`
  .product-detail-footer {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  max-height: initial;

  .show-accordion-toggle {
    background: url(${downArrowIcon}) no-repeat right 0 bottom 7px;
  }
`;
