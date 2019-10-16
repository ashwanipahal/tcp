import { css } from 'styled-components';

export default css`
  .title-mobile {
    margin: 0;
    padding: 0;
    &:after {
      display: none;
    }
    @media ${props => props.theme.mediaQuery.smallOnly} {
      text-transform: capitalize;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      text-transform: capitalize;
    }
  }
  .collapsible-icon {
    width: 10px;
    top: 30px;
    right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  [aria-expanded='true'] {
    .collapsible-icon {
      top: 35px;
    }
  }
  .tile-footer {
    display: none;
  }
  .store-country-item {
    @media ${props => props.theme.mediaQuery.large} {
      &:nth-child(6n) {
        margin: 0;
      }
    }
  }
  .address-tile {
    border: none;
  }
  .storemodule__lg {
    display: block;

    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: none;
    }
  }

  .storemodule__sm {
    display: none;

    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      display: block;
    }
  }
`;
