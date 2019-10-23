import { css } from 'styled-components';

export default css`
  .favorite-title {
    padding-bottom: 12px;
    border-bottom: 3px solid black;
  }

  .wish-list {
    text-align: center;
    padding: 10px 0;
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
    display: none;

    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      margin-top: 0;
    }
  }
`;
