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
  .sort-item-list {
    width: 95%;
  }

  .item-selected {
    background: ${props => props.theme.colors.ACCORDION.INACTIVE_HEADER} url(${selectedIcon})
      no-repeat right;
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
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .sort-dropdown-wrapper {
      padding: 9px 0 0;
      width: auto;
      min-width: 162px;
      margin: 27px 0 0 20px;
    }
    .custom-sort-dropdown {
      border-bottom: 1px solid ${props => props.theme.colorPalette.gray[600]};
    }
    .sort-select-title {
      display: inline-block;
    }
    .sort-selected-item {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    .sort-filter-label {
      display: inline-block;
    }
    .sort-item-highlighted {
      .sort-title {
        font-size: ${props => props.theme.typography.fontSizes.fs13};
        font-weight: ${props => props.theme.typography.fontWeights.extrabold};
      }
    }
  }
`;
