import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

export default css`
  &.dropdown-button-wrapper {
    text-align: center;
  }
  .dropdown-button-container {
    position: relative;
  }
  .dropdown-icon {
    background: url(${getIconPath('plus-icon')}) round;
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-left: 10px;
  }
  .dropdown-icon.is-open {
    height: 2px;
    margin-bottom: 3px;
    background: url(${getIconPath('minus-icon')});
  }
  .button-panel {
    position: absolute;
    z-index: ${props => props.theme.zindex.zOverlay};
    display: none;
  }
  .button-panel.is-open {
    display: block;
  }
  .dropdown-button {
    background: ${props => props.theme.colorPalette.gray[300]};
    color: ${props => props.theme.colorPalette.gray[800]};
    font-weight: ${props => props.theme.typography.fontWeights.black};

    &.is-open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
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
    border-color: ${props => props.theme.colorPalette.blue[700]};
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .dropdown-button-container {
      display: inline-block;
      button,
      .dropdown-items {
        min-width: 162px;
        height: 42px;
      }
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .dropdown-button-container {
      button,
      .dropdown-items {
        min-width: 210px;
        height: 51px;
      }
    }
  }
`;
