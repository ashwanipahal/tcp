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
    background-position: 95% 18px;
    background-color: #eeeeee;
    font-size: ${props => props.theme.fonts.fontSize.body.large.secondary}px;

    &.open-filter-button-expanded {
      background: url('/static/images/carrot-small-down.png') no-repeat;
      background-position: 95% 18px;

      &:hover:not([disabled]) {
        background: url('/static/images/carrot-small-down.png') no-repeat;
        background-position: 95% 18px;
        background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
      }
    }

    &:hover:not([disabled]) {
      background: url(/static/images/carrot-small-up.png) no-repeat;
      background-position: 95% 18px;
      background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    }
  }

  .common-dropdown {
    width: 98%;
    position: relative;
    border: 0;

    .item-list-wrapper {
      max-height: 500px;

      .item-list-common {
        max-width: 100%;
      }
    }

    .apply-button {
      display: none;

      @media ${props => props.theme.mediaQuery.large} {
        display: inline-block;
      }
    }

    .size-title, .color-name {
      font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
      vertical-align: top;
    }

    .color-chip {
      border-radius: 10px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }

    .color-chip[data-colorname='white'] {
      border: 1px solid ${props => props.theme.colors.PRIMARY.DARK};
      width: 18px;
      height: 18px;
    }

    .item-list-common {
      @media ${props => props.theme.mediaQuery.medium} {
        column-count: 4;
      }

      @media ${props => props.theme.mediaQuery.smallOnly} {
        li {
          width: 120px;
          margin-right: 0;
        }
        .item-select {
          padding-left: 20px;
        }
      }
    }

    .item-list-column {
      @media ${props => props.theme.mediaQuery.mediumMax} {
        flex-flow: row wrap;
      }
    }
  }
`;
