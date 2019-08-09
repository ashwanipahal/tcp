import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

const darkArrow = getIconPath('icon-carrot-black-small');

export default css`
  padding: 0 14px;
  color: ${props => props.theme.colorPalette.text.primary};
  border-bottom: 3px solid ${props => props.theme.colorPalette.white};

  &:hover,
  &:focus {
    background: #f3f3f3;
  }

  span {
    display: inline-block;
  }
  .nav-bar-l1-content {
    padding: 18px 0 17px 0;
  }
  .icon-arrow {
    background: url(${darkArrow}) no-repeat;
    width: 10px;
    height: 10px;
  }
  .nav-bar-item-label {
    width: 45%;
    cursor: pointer;
    &.highlighted {
      color: ${props => props.theme.colorPalette.secondary.main};
    }
    &.full-width {
      width: 96%;
    }
  }
  .nav-bar-item-content {
    width: 51%;
    color: ${props => props.theme.colorPalette.primary.main};
  }

  @media ${props => props.theme.mediaQuery.large} {
    padding: 0;
    color: ${props => props.theme.colorPalette.text.hint};
    span {
      display: inline;
    }
    .nav-bar-item-content {
      display: none;
    }
    .nav-bar-l1-content {
      cursor: pointer;
      position: relative;
      padding: 38px 20px 12px 20px;
    }
    .nav-bar-item-label {
      width: 100%;
    }
    &:hover {
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.99), #f6f6f6);
      color: ${props => props.theme.colorPalette.text.primary};
      border-bottom-color: ${props => props.theme.colorPalette.primary.main};
      .nav-bar-l2 {
        display: block;
      }
      .nav-bar-item-sizes-range {
        cursor: default;
        position: absolute;
        display: block;
        top: 80px;
        left: 0;
        width: 100%;
        color: #1a1a1a;
        text-align: center;
        font-weight: 600;
        z-index: 11;
        white-space: nowrap;
      }
    }
  }
`;
