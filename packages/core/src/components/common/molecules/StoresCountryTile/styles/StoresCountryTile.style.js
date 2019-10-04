import { css } from 'styled-components';

export default css`
  .title-mobile {
    margin: 0;
    padding: 0;
    &:after {
      display: none;
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
`;
