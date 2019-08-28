import { css } from 'styled-components';
import { getIconPath } from '../../../../../../utils';

const selectedIcon = getIconPath('selected-item');

export default css`
  .sort-select-title {
    display: none;
    padding-right: 5px;
  }
  .sort-filter-label {
    display: none;
  }
  .sort-item-selected {
    display: inline-block;
    width: 88px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }

  .item-select {
    padding: 18px 0 17px 16px;
  }
  .sort-item-list {
    width: 95%;
  }

  .item-selected {
    background: ${props => props.theme.colors.ACCORDION.INACTIVE_HEADER} url(${selectedIcon}) no-repeat right;
    background-size: 20px 20px;
    .sort-title {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
      font-weight: ${props => props.theme.fonts.fontWeight.extrabold};
    }
  }

  .item-highlighted {
    background: url(${selectedIcon}) no-repeat left;
    background-size: 20px 20px;

    .sort-title {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
      font-weight: ${props => props.theme.fonts.fontWeight.extrabold};
    }
  }
  .sort-list-wrapper {
    overflow-y: auto;
    margin-bottom: 0;
  }
  .sort-dropdown-wrapper {
    margin-left: 8px;
    padding: 9px 0 0;
    width: 100%;
  }
  .sort-select-button {
    display: inline-block;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .sort-item-list {
      width: 100%;
      margin-right: 0;
      padding-left: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .sort-dropdown-wrapper {
      margin-left: 8px;
      padding: 9px 0 0;
      min-width: 162px;
    }
    .sort-select-title {
      display: inline-block;
    }
    .sort-filter-label {
      display: inline-block;
    }
  }
`;
