import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const downArrowIcon = getIconPath('down_arrow_icon');
const upArrowIcon = getIconPath('up_arrow_icon');

const dropDownlist = css`
  .dropdownUlBorder {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
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
    background: url(${downArrowIcon}) no-repeat right center;
    position: absolute;
    right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    width: 100%;
    top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .customSelectTitleUpImg {
    background: url(${upArrowIcon}) no-repeat right center;
    position: absolute;
    right: ${props => props.theme.spacing.ELEM_SPACING.SM};
    height: ${props => props.theme.spacing.ELEM_SPACING.MED};
    width: 100%;
    top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .dropDownLists {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    cursor: pointer;
  }

  .dropDownSelect {
    position: absolute;
    left: 0;
    width: 99%;
    z-index: 1;
    overflow: auto;
  }

  .dropdownUpperDiv {
    position: relative;
    text-align: center;
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
