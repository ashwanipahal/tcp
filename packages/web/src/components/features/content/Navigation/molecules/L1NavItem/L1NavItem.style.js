import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

const darkArrow = getIconPath('icon-carrot-black-small');

export default css`
  padding: 0 14px;
  color: ${props => props.theme.colorPalette.text.primary};
  border-bottom: 3px solid ${props => props.theme.colorPalette.white};

  &.is-open {
    background: ${props => props.theme.colorPalette.gray[300]};
  }

  span {
    display: inline-block;
  }
  .nav-bar-l1-content {
    display: flex;
    padding: 18px 0 17px 0;
    outline: 0;
  }
  .icon-arrow {
    background: url(${darkArrow}) no-repeat;
    width: 10px;
    height: 10px;
  }
  .nav-bar-item-label {
    width: 45%;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    .nav-bar-item-content,
    &.show-on-mobile {
      display: none;
    }
    .nav-bar-l1-content {
      display: block;
      cursor: pointer;
      position: relative;
      padding: 38px 20px 12px 20px;
    }
    .nav-bar-item-label {
      width: 100%;
      display: inline-block;
    }
    &.l1-overlay.is-open {
      background: ${props => props.theme.colorPalette.gray[900]};
      position: absolute;
      top: 75px;
      z-index: 1;
      opacity: 0.6;
      width: 200%;
      left: -50%;
      height: 200vh;
    }
    &.is-open {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.99),
        ${props => props.theme.colors.NAVIGATION.L1_BACKGROUND}
      );
      color: ${props => props.theme.colorPalette.text.primary};
      border-bottom-color: ${props => props.theme.colorPalette.primary.main};
      .nav-bar-l2 {
        display: block;
      }
      .nav-bar-item-sizes-range {
        cursor: default;
        position: absolute;
        display: block;
        top: 88px;
        left: 0;
        width: 100%;
        color: ${props => props.theme.colorPalette.gray[900]};
        text-align: center;
        font-weight: 600;
        z-index: 11;
        white-space: nowrap;
      }
    }
  }
`;
