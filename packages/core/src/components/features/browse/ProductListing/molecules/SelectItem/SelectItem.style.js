import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedIcon = getIconPath('selected-item');

export default css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 166px;

  .selected-item {
    background: url(${selectedIcon}) no-repeat left top;
    background-size: 20px 20px;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XSS};
    padding-bottom: 8px;
  }

  .item-select {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: 14px;
  }
`;
