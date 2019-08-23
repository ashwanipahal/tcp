import { css } from 'styled-components';

export default css`
  &.new-filter-and-sort-form-container {
    margin-top: 14px;

    .filter-row {
      margin-bottom: 7px;
    }
  }

  .open-filter-button {
    background: url('/static/images/carrot-small-up.png') no-repeat;
    background-position: 98% 18px;
    background-color: #eeeeee;
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy13}px;

    &.open-filter-button-expanded {
      background: url('/static/images/carrot-small-down.png') no-repeat;
      background-position: 98% 18px;

      &:hover:not([disabled]) {
        background: url('/static/images/carrot-small-down.png') no-repeat;
        background-position: 98% 18px;
        background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      }
    }

    &:hover:not([disabled]) {
      background: url(/static/images/carrot-small-up.png) no-repeat;
      background-position: 98% 18px;
      background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    }
  }

  .common-drop-down {
    position: relative;
    border: 0;

    .item-list-wrapper {
      max-height: 500px;
    }

    .apply-button {
      display: none;

      @media ${props => props.theme.mediaQuery.large} {
        display: inline-block;
      }
    }

    .size-title {
      font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
    }

    .item-list-common {
      @media ${props => props.theme.mediaQuery.medium} {
        column-count: 4;
      }
    }
  }
`;
