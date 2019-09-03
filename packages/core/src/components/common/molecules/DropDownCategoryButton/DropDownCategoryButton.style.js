import { css } from 'styled-components';

export default css`
  &.dropdown-category-button-wrapper {
    text-align: center;
  }
  .dropdown-category-button {
    position: relative;
  }
  .dropdown-icon {
    background: url('/static/images/plus.svg');
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-left: 10px;
  }
  .dropdown-icon.is-open {
    height: 2px;
    margin-bottom: 3px;
    background: url('/static/images/minus.svg');
  }
  .button-panel {
    position: absolute;
    z-index: 1;
    display: none;
  }
  .button-panel.is-open {
    display: block;
  }
  .dropdown-button {
    background: ${props => props.theme.colorPalette.gray[300]};
  }
  .dropdown-button:hover,
  .dropdown-button:focus {
    background: ${props => props.theme.colorPalette.gray[500]};
  }
  .dropdown-items {
    text-align: center;
  }
  .dropdown-items:hover,
  .dropdown-items:focus {
    background: ${props => props.theme.colorPalette.blue[50]};
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .dropdown-category-button {
      display: inline-block;
      button {
        width: 188px;
        height: 42px;
      }
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .dropdown-category-button {
      button {
        width: 210px;
        height: 51px;
      }
    }
  }
`;
