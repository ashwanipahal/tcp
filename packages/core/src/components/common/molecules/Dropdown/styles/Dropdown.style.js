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
    border: 1px solid #9c9c9c;
    background-color: #eeeeee;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
    cursor:pointer;
    position: relative;
  }


  .customSelectTitleImg {
    background: url(${downArrowIcon}) no-repeat right center;
    position: absolute;
    right: 10px;
    height: 15px;
    width: 100%;
    top: 10px;
  }

  .customSelectTitleUpImg {
    background: url(${upArrowIcon}) no-repeat right center;
    position: absolute;
    right: 10px;
    height: 15px;
    width: 100%;
    top: 10px;
  }

  .text-align-center{
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
    cursor:pointer;
  }

  .dropDownSelect{
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 9;
    overflow: auto
  }

  .dropdownUpperDiv{
    position: relative;
    text-align:center;
  }


  .dropdownliBottomBorder {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .dropdownActiveClass {
    background-color: #eeeeee};
    position: relative;
  }

  li:hover {
    background: #eeeeee;
  }
`;

export default dropDownlist;
