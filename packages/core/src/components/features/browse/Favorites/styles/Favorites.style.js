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
    min-width: 150px;

    &:nth-of-type(odd) {
      float: left;
    }
  }

  .brand-option-list {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};

    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-top: 0;
    }
  }
`;
