import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedIcon = getIconPath('selected-item');

export default css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
  outline: none;

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
    padding-left: 32px;
    margin-bottom: 14px;
    padding-bottom: 1px;
  }

  .item-select {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XL};
    margin-bottom: 14px;
  }
`;
