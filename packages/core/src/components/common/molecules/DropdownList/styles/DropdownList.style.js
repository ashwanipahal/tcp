import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const activeIcon = getIconPath('active_icon');

const dropDownlist = css`
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
    width: 3%;
    right: 1%;
    top: 40%;
    height: 16%;
  }

  .dropDownListwrapper {
    position: relative;
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
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

  .ulBorderWithLastRow li:last-child {
    position: absolute;
    width: 96%;
    height: 36px;
    padding: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    left: 0;
    bottom: 0;
    border-bottom: none;
  }
  .ulBorderWithLastRow li:last-child:hover {
    background: none;
  }
  .ulBorderWithLastRow li:hover {
    background: ${props => props.theme.colors.PRIMARY.COLOR1};
  }
`;

export default dropDownlist;
