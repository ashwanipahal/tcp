import { css } from 'styled-components';

export default css`
  &.available-filters-sorting-container {
    padding: 0;
    border: 1px solid ${props => props.theme.colorPalette.gray[900]};
    position: absolute;
    z-index: ${props => props.theme.zindex.zPLPFilterDropDown};
    width: 99.5%;
    top: 62px;

    &.show-sort {
      width: 47%;
      left: 52.7%;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      max-width: 73.8%;
      left: 13%;
      top: 65px;

      &.show-sort {
        width: 34.8%;
        left: 52%;
      }

      .container-accordion {
        padding: 0;
      }
    }
  }

  &.hide-filter,
  &.hide-sort {
    display: none;
  }

  &.show-filter,
  &.show-sort {
    display: block;
  }

  &.show-filter {
    background: ${props => props.theme.colorPalette.white};

    .applied-filters-list-container {
      padding: 0 15px;
      margin-top: -13px;

      @media ${props => props.theme.mediaQuery.medium} {
        display: none;
      }
    }

    .applied-filters-sorting-container {
      display: grid;
      padding-bottom: 5px;
    }

    .applied-filter-list {
      width: 100%;
    }

    .filtering-title {
      margin-bottom: 15px;
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      color: ${props => props.theme.colorPalette.gray[800]};
      font-weight: normal;
    }

    .applied-filter-title {
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      font-weight: normal;
      color: ${props => props.theme.colorPalette.gray[900]};
    }

    .applied-filter-remove-button {
      padding: 9px;
    }

    .applied-filter-item {
      padding: 5px 0;
    }

    .applied-filter-clear-all {
      padding: 0;
      font-size: ${props => props.theme.typography.fontSizes.fs12};
      font-weight: normal;
      text-decoration: underline;
      color: ${props => props.theme.colorPalette.gray[900]};

      .applied-filter-remove-button {
        display: none;
      }
    }

    .inactive + .applied-filters-list-container {
      display: none;
    }

    .active + .applied-filters-list-container {
      display: block;

      @media ${props => props.theme.mediaQuery.medium} {
        display: none;
      }
    }

    .filter-count {
      display: none;

      @media ${props => props.theme.mediaQuery.mediumOnly} {
        display: inline-block;
        margin-left: 3px;
      }
    }
  }

  &.filtered-by-section {
    display: none;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: flex;
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  *:focus {
    outline: 0;
  }
  .list-item {
    background: white;
    border-top: 1px solid ${props => props.theme.colorPalette.gray[500]};
    &:first-child {
      border-top: 0;
    }
    &:last-child {
      border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
    }
    .accordion {
      background: white;
      &.inactive {
        font-weight: bold;
      }
    }
    p {
      width: 91%;
    }
  }

  .common-dropdown {
    width: 98%;
    position: relative;
    border: 0;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    padding-bottom: 0;
    margin: auto;

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

    .color-chip {
      border-radius: 10px;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      height: 19px;
      width: 19px;
    }

    .white-color-class {
      height: 18px;
      width: 18px;
    }

    .color-chip[data-colorname='white'] {
      border: 1px solid ${props => props.theme.colors.PRIMARY.DARK};
      width: 18px;
      height: 18px;
    }

    .item-list-column,
    .item-list-common {
      @media ${props => props.theme.mediaQuery.mediumMax} {
        flex-flow: row wrap;
      }
    }
  }

  li.item-common {
    height: 23px;
    min-width: 140px;
    width: 47%;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-right: auto;
    border-radius: 6px;
    border: 1px solid ${props => props.theme.colorPalette.gray[900]};
    display: inline-table;

    .sort-item-list,
    .size-title {
      text-align: center;
    }

    .size-title {
      width: 100%;
      line-height: 22px;
      font-size: ${props => props.theme.typography.fontSizes.fs10};
    }

    .selected-items {
      margin-bottom: 0;
      padding-left: 0;
      margin-right: 0;
      width: 100%;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 31%;
    }
  }

  li.item-common.color-filter-chip {
    margin-right: 10px;
  }

  li.item-common.color-filter-chip:nth-child(3n) {
    margin-right: 0;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-right: 10px;
    }
  }

  li.item-common.size-detail-chips:nth-child(2n) {
    margin-right: 0;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-right: inherit;
    }
  }

  @media ${props => props.theme.mediaQuery.mediumOnly} {
    li.item-common.size-detail-chips:nth-child(3n) {
      margin-right: 0;
    }
  }

  &.mobile-sort-container {
    padding: 0;

    .common-dropdown {
      margin-top: 0;
      width: 100%;
      padding: 0 15px;
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      .custom-select-common {
        width: 100%;
        margin: 0;
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

  &.show-sort {
    .mobile-sort-container .common-dropdown {
      padding: 0;
      min-width: 122px;
    }

    .custom-select-common {
      padding-bottom: 0;
    }

    li.item-common {
      border: 0;
      padding: 0 0 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
      background-color: ${props => props.theme.colorPalette.white};
      background-position: left;
      min-width: 100%;
      max-width: 100%;
    }

    .item-common .sort-item-list {
      text-align: left;
    }

    li.item-common .selected-items {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }

  li.size-detail-chips.item-common.item-select {
    background: none;
    background-color: ${props => props.theme.colorPalette.gray[900]};

    .item-select {
      padding-left: 0;
      padding-bottom: 0;
    }

    span {
      color: ${props => props.theme.colorPalette.white};
    }
  }

  &.new-filter-and-sort-form-container.mobile-sort-container {
    margin-top: 0;
  }

  &.new-filter-and-sort-form-container {
    margin-top: 14px;
    .filter-row {
      margin: 7px;
      padding-bottom: 0;
    }

    .disable-clear-all-button {
      pointer-events: none;
      opacity: 0.5;
    }

    @media ${props => props.theme.mediaQuery.mediumMax} {
      margin-top: 0;
      padding: 0;
    }

    @media ${props => props.theme.mediaQuery.smallMax} {
      margin: 0;
      width: auto;
      padding: 0;

      .container-accordion {
        padding: 0;
      }
    }
  }

  .accordion-class {
    width: 100%;
  }

  .open-filter-button {
    background: url('/static/images/carrot-small-up.png') no-repeat;
    background-position: 95% 18px;
    background-color: #eeeeee;
    font-size: ${props => props.theme.typography.fontSizes.fs16};

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
