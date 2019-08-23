import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedIcon = getIconPath('selected-item');

export default css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  width: 166px;

  .dropdownActiveIcon {
    background-image: url(${selectedIcon});
    background-repeat: no-repeat;
    position: absolute;
    width: 30px;
    right: 5px;
    top: 40%;
    height: 30px;
  }
  .selected-item {
    background: url(${selectedIcon}) no-repeat left top;
    background-size: 20px 20px;
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XSS};
    padding-bottom: 1px;
  }
`;
