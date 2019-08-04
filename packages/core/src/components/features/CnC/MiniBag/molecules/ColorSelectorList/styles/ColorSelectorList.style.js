import { css } from 'styled-components';

const dropDownlist = css`
  position: absolute;
  width: 100%;
  z-index: 1;
  & img {
    height: 10px;
    width: 10px;
  }
  .dropdownUlBorder {
    border: 2px solid ${props => props.theme.colors.BLACK};
    background-color: ${props => props.theme.colors.WHITE};
  }

  .dropdownliBottomBorder {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
    &.lastElementClass {
      border-bottom: 0;
    }
  }

  .dropdownDivOverFlow {
    overflow-y: scroll;
    width: max-content;
  }

  .dropdownActiveClass {
    background-color: ${props => props.theme.colors.BLACK};
    position: relative;
    color: white !important;
    & span {
      color: white;
    }
  }

  .dropDownListwrapper {
    position: relative;
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    background-color: ${props => props.theme.colors.WHITE};
  }
`;

export default dropDownlist;
