import { css } from 'styled-components';

export default css`
  .item-common {
    margin-bottom: 8px;
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 120px;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 95px;
      .item-select {
        padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
    }
  }
  &.new-filter-and-sort-form-container.mobile-sort-container {
    margin-top: 0;
  }
  &.mobile-sort-container {
    padding: 0;
    @media ${props => props.theme.mediaQuery.mediumMax} {
      .custom-select-common {
        width: 100%;
        margin: 0;
      }
      .item-list-wrapper {
        max-width: 600px;
      }
      .common-dropdown,
      .common-dropdown .item-list-wrapper {
        width: 100%;
        padding-top: 0;
      }
      .common-dropdown .item-list-common {
        max-width: 100%;
      }
    }

    .common-dropdown .item-common {
      @media ${props => props.theme.mediaQuery.mediumMax} {
        width: 100%;
      }
    }
  }
  &.new-filter-and-sort-form-container {
    margin-top: 14px;
    .filter-row {
      margin-bottom: 7px;
    }

    @media ${props => props.theme.mediaQuery.smallMax} {
      margin: 14px 14px 0;
      width: auto;
      padding: 0;

      .container-accordion {
        padding: 0;
      }
    }

    .accordion {
      width: auto;
    }
  }

  .accordion-class {
    width: 100%;
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
    padding-top: 6px;
    padding-bottom: 0;
    margin: auto;

    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin: 8px auto 0;
    }

    .item-list-common {
      max-width: 98%;
      margin: 0 auto;

      @media ${props => props.theme.mediaQuery.smallOnly} {
        max-width: 99%;
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
        width: 95px;
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

export const customModalCss = css`
  div.TCPModal__InnerContent {
    background: none;
    z-index: ${props => props.theme.zindex.zOverlay};
  }
  button.close-modal {
    display: none;
  }
`;
