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
    background-color: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.orange[50]
        : props.theme.colorPalette.blue[50]};
    position: relative;
  }

  .dropdownActiveIcon {
    background-image: url(${activeIcon});
    background-repeat: no-repeat;
    position: absolute;
    top: 18%;
    right: ${props => props.theme.spacing.ELEM_SPACING.SM};
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
    background: ${props =>
      !props.theme.isGymboree
        ? props.theme.colorPalette.blue[50]
        : props.theme.colorPalette.orange[50]};
  }

  .ulBorderWithLastRow li:last-child div {
    position: absolute;
    bottom: 0;
    width: 94%;
    border-bottom: none;
    @media ${props => props.theme.mediaQuery.smallOnly} {
      width: 93%;
    }
  }

  .no-border {
    border-bottom: none;
  }

  .ulBorderWithLastRow li:last-child:hover {
    background: none;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};

  .dropdown--disabled {
    pointer-events: none;
  }
  .dropDownTop {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    position: absolute;
    width: 100%;
    height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    z-index: 1;
  }
  .dropDownBottom {
    background-image: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    position: absolute;
    width: 100%;
    height: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    bottom: 57px;
    z-index: 1;
    margin-bottom: 6px;
  }
`;

export default dropDownlist;
