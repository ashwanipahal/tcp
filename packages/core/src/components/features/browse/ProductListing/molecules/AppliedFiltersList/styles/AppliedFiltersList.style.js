import { css } from 'styled-components';
import { getIconPath } from '../../../../../../../utils';

const crossIcon = getIconPath('cross-icon');

export default css`
  &.applied-filters-sorting-container {
    width: 100%;
    padding: 0 0 15px;
    left: auto;
    margin: 0;
    display: flex;
    position: relative;

    .filtering-title {
      width: 90px;
      margin-top: 7px;
      font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
      font-family: ${props => props.theme.typography.fonts.secondary};
      letter-spacing: 0;
      line-height: 1.42;
      display: inline-block;
      margin-right: 15px;
    }

    .applied-filter-list {
      display: inline;
      position: relative;
      width: calc(100% - 90px);
      padding: 0;
      border-bottom: 0;
    }

    .applied-filter-item {
      padding: 5px 10px;
      margin-bottom: 5px;
      margin-right: 10px;
      display: inline-block;
      vertical-align: middle;
    }

    .applied-filter-remove-button {
      background: url(${crossIcon}) no-repeat;
      background-position: center;
      background-size: 8px 8px;
      font-size: 0;
      position: relative;
      padding: 10px;
      border-radius: 50%;
      vertical-align: middle;
      overflow: hidden;
      border: 1px solid ${props => props.theme.colors.PRIMARY.DARK};
      cursor: pointer;
    }

    .applied-filter-title {
      display: inline-block;
      margin-left: 8px;
      font-style: normal;
      font-stretch: normal;
      text-decoration: none;
      font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
      letter-spacing: 0;
      line-height: 1.42;
      text-transform: none;
    }

    .applied-filter-clear-all {
      border: 0;
      vertical-align: middle;
      font-size: ${props => props.theme.fonts.fontSize.listmenu.large}px;
      line-height: 1.07;
      margin-bottom: 4px;
      background: none;

      .applied-filter-remove-button {
        display: inline-block;
        margin-right: 8px;
      }
    }
  }
`;
