import { css } from 'styled-components';

const dropDownlist = css`
  .dropdownUlBorder {
    border-left: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    border-right: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    background-color: ${props => props.theme.colors.WHITE};
  }

  .customSelectTitle {
    border: 1px solid ${props => props.theme.colorPalette.gray['600']};
    background-color: ${props => props.theme.colorPalette.gray['500']};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    cursor: pointer;
    position: relative;
  }

  .customSelectArrow {
    position: absolute;
    top: 50%;
    width: 13px;
    height: 13px;
    display: inline-block;
    right: 15px;
    margin-top: -5px;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${props => props.theme.colorPalette.gray['800']};
      border-radius: 0.09rem;
      display: block;
    }

    &.up,
    &.down {
      height: 8px;
      &:before {
        left: 8px;
      }
      &:after {
        right: 8px;
      }
      &:before,
      &:after {
        top: -5%;
        height: 110%;
        width: 2px;
      }
    }

    &.up {
      &:before,
      &:after {
        transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(45deg);
      }
    }
    &.down {
      &:before,
      &:after {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  .dropDownLists {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    cursor: pointer;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray['600']};
  }

  .dropDownSelect {
    position: absolute;
    left: 0;
    width: calc(100% - 2px);
    z-index: 99;
    overflow: auto;
  }

  .dropdownUpperDiv {
    position: relative;
    text-align: center;
  }

  .dropdownAnchorColor {
    color: ${props => props.theme.colorPalette.gray['700']};
  }

  .dropdownActiveClass {
    background-color: ${props => props.theme.colors.BUTTON.WHITE.ALT_HOVER};
    position: relative;
  }

  li:hover {
    background: ${props => props.theme.colors.BUTTON.WHITE.ALT_HOVER};
  }
`;

export default dropDownlist;
