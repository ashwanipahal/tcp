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

  .customSelectTitleImg {
    position: absolute;
    top: 50%;
    content: '';
    display: inline-block;
    border-radius: 0.1em;
    width: 6px;
    height: 6px;
    border-right: 2px solid ${props => props.theme.colorPalette.gray['800']};
    border-top: 2px solid ${props => props.theme.colorPalette.gray['800']};
    transform: rotate(135deg);
    margin-top: -7px;
    right: 15px;
  }

  .customSelectTitleUpImg {
    position: absolute;
    top: 50%;
    content: '';
    display: inline-block;
    border-radius: 0.1em;
    width: 6px;
    height: 6px;
    border-right: 2px solid ${props => props.theme.colorPalette.gray['800']};
    border-top: 2px solid ${props => props.theme.colorPalette.gray['800']};
    transform: rotate(315deg);
    margin-top: -3px;
    right: 15px;
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
