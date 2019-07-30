import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const activeIcon = getIconPath('active_icon');

const dropDownlist = css`
  position: absolute;
  width: 100%;
  z-index: 1;

  .dropdownUlBorder {
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    background-color: ${props => props.theme.colors.WHITE};
  }

  .dropdownliBottomBorder {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .dropdownDivOverFlow {
    overflow-y: scroll;
    max-height: 230px;
  }

  .dropdownActiveClass {
    background-color: ${props => props.theme.colors.PRIMARY.COLOR1};
    position: relative;
  }

  .dropdownActiveIcon {
    background-image: url(${activeIcon});
    background-repeat: no-repeat;
    position: absolute;
    width: 30px;
    right: 5px;
    top: 40%;
    height: 30px;
  }

  .dropDownListwrapper {
    position: relative;
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    background-color: ${props => props.theme.colors.WHITE};
  }

  .dropdownClassBtn {
    color: ${props => props.theme.colors.WHITE};
    background-color: ${props => props.theme.colors.PRIMARY.DARK};
  }

  .ulBorderWithLastRow {
    border-bottom: ${props => props.theme.colors.BORDER.NORMAL};
    width: 100%;
  }

  .ulBorderWithLastRow li:hover {
    background: ${props => props.theme.colors.PRIMARY.COLOR1};
  }

  .ulBorderWithLastRow li:last-child {
    position: absolute;
    width: 96%;
    height: 42px;
    padding: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    left: 0;
    bottom: 0;
    border-bottom: none;
  }

  .ulBorderWithLastRow li:last-child:hover {
    background: none;
  }
`;

export default dropDownlist;
