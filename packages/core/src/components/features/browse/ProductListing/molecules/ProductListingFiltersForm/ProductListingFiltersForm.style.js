import { css } from 'styled-components';

export default css`
  width: 100%;
  padding: 20px 0px ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: 0px;

  .custom-select-common {
    display: flex;
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};

    @media ${props => props.theme.mediaQuery.large} {
      border-bottom: 1px solid ${props => props.theme.colorPalette.gray['600']};
      display: inline-block;
    }
  }
  .item-common.color-filter-chip {
    margin-bottom: 8px;
    padding-bottom: 0;
    border: 0;
    max-width: 31%;
    min-width: 90px;

    .item-select,
    .selected-items {
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.MED};

      @media ${props => props.theme.mediaQuery.medium} {
        padding-left: 22px;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      max-width: 150px;
      min-width: 150px;
    }

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      max-width: 22%;
      min-width: 110px;
    }

    .selected-items {
      @media ${props => props.theme.mediaQuery.mediumOnly} {
        text-align: left;
      }
    }
  }
  .color-filter-chip {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      margin-right: 0;
      white-space: nowrap;
      margin-left: 0;
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
  .size-title,
  .color-name {
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 124px;
    text-align: left;
    display: inline-block;
    cursor: pointer;

    @media ${props => props.theme.mediaQuery.large} {
      white-space: nowrap;
    }
  }
  .color-name {
    vertical-align: top;
    width: 86px;

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      width: 60px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .filters-only-container {
    display: inline-block;
  }
  &.desktop-dropdown {
    display: flex;
    justify-content: space-between;
  }
  .sort-selector-wrapper {
    position: relative;
    display: inline-block;
    .custom-select-common {
      display: flex;
      border-bottom: none;
    }
  }
  .modal-spacing {
    margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
    margin-top: 22px;

    button {
      max-width: 164px;
      height: 42px;
    }

    .close-button {
      text-align: right;
    }
  }
`;
