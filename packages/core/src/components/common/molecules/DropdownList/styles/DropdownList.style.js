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
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
  }

  .dropdownDivOverFlow {
    overflow-y: auto;
    max-height: 230px;
  }

  .dropdownActiveClass {
    position: relative;
  }

  .dropdownActiveIcon {
    background-image: url(${activeIcon});
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 18%;
  }

  .dropDownListwrapper {
    position: relative;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
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
    /* position: absolute;
    width: 93%;
    height: 42px;
    padding: 0:
    left: 0;
    bottom: 0; */
    border-bottom: none;
  }

  .dropDownItems {
    border-bottom: none;
  }

  .ulBorderWithLastRow li:last-child:hover {
    background: none;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};

  .dropdown--disabled {
    pointer-events: none;
  }
`;

export default dropDownlist;
