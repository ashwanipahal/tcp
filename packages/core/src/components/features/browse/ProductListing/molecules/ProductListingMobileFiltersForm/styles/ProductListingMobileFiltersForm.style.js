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

  .item-common {
    margin-bottom: 18px;

    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 120px;

      .item-select {
        padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
      }
    }
  }

  .common-dropdown {
    width: 98%;
    position: relative;
    border: 0;
    padding-top: 6px;
    padding-bottom: 0;
    margin: 0 auto;

    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin: 8px auto 0;
    }

    .item-list-common {
      max-width: 98%;
      margin: 0 auto;
    }

    .item-common {
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        width: 120px;
      }
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 104px;
      }
    }

    .item-list-wrapper {
      max-height: 500px;
      text-align: left;
      width: 99%;
      margin: 0 auto;
    }

    .apply-button {
      display: none;

      @media ${props => props.theme.mediaQuery.large} {
        display: inline-block;
      }
    }

    .size-title,
    .color-name {
      font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
      vertical-align: top;
    }

    .size-title {
      @media ${props => props.theme.mediaQuery.smallOnly} {
        width: 104px;
      }
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

    .item-list-column {
      @media ${props => props.theme.mediaQuery.mediumMax} {
        flex-flow: row wrap;
      }
    }
  }
`;
