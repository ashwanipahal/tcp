import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedIcon = getIconPath('selected-item');

export default css`
  .sort-select-title {
    display: inline-block;
    padding-right: 5px;
  }
  .sort-item-selected {
    display: inline-block;
    width: 88px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }
  .item-highlighted {
    background: url(${selectedIcon}) no-repeat left top;
    background-size: 20px 20px;

    .sort-title {
      font-size: 13px;
      font-weight: 800;
    }
  }
  .sort-list-wrapper {
    overflow-y: auto;
    margin-bottom: 0;
  }
  .sort-dropdown-wrapper {
    margin-left: 8px;
    padding: 9px 0 0;
    width: 162px;
  }
  .sort-select-button {
    display: inline-block;
  }
`;