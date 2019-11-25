import { css } from 'styled-components';

export default css`
  .item-disabledOption {
    span {
      color: ${props => props.theme.colors.TEXT.LIGHTGRAY};
    }
  }
  .favorite-title {
    padding-bottom: 12px;
    border-bottom: 3px solid black;
  }
  .social-share-fav-list {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.regular};

    .customSelectTitle {
      font-size: ${props => props.theme.typography.fontSizes.fs13};
    }
  }
  .list-selection-row {
    margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
      ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .brand-filter-section {
    border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    margin: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .filters-only-container {
    span {
      &:first-child {
        font-size: ${props => props.theme.typography.fontSizes.fs14};
      }
    }
  }

  .sort-selector-wrapper {
    .sort-select-title {
      font-size: ${props => props.theme.typography.fontSizes.fs14};
    }
    .custom-select-common {
      margin: 0;
    }
  }

  .wish-list {
    text-align: center;
    padding: 10px 0;
  }

  .filter-and-sort-form-container {
    .desktop-dropdown {
      padding: 0 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
    }
  }

  .render-desktop-view {
    display: none;

    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }

  .render-mobile-view {
    width: auto;
    padding: 0;

    @media ${props => props.theme.mediaQuery.large} {
      display: none;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      .filter-row {
        width: auto;
      }
    }
  }

  .brand-options {
    display: inline-block;
    min-width: 152px;
    padding-right: 16px;

    &:nth-of-type(odd) {
      float: left;
    }

    &.is-label {
      min-width: auto;
      font-size: ${props => props.theme.typography.fontSizes.fs12};
    }
  }

  .brand-option-list {
    li {
      &:first-child {
        padding-top: 5px;
        padding-bottom: 10px;
        width: 100%;
      }
      p {
        padding-top: 5px;
      }
    }

    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      margin-top: 0;
    }
  }
  .no-favorite-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .no-favorite-container .no-favorite-text {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .brand-option-list {
      li.is-label {
        width: auto;
        padding-bottom: 0;
      }
    }
  }
`;
