import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const downArrowIcon = getIconPath('down_arrow_icon');

const customSelectStyle = css`
  position: relative;
  .customSelectTitle {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding: ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XS}
      ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
    background: url(${downArrowIcon}) no-repeat right center;
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};

  @media ${props => props.theme.mediaQuery.smallMax} {
    .TCPModal__Content_Modal .custom-select-dropDownList {
      position: relative;
    }
    .TCPModal__Content_Modal .dropdownDivOverFlow {
      max-height: none;
    }
    .TCPModal__Content_Modal .dropDownListwrapper {
      border: 0px;
    }
    .TCPModal__Content_Modal .dropdownliBottomBorder {
      border: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
      margin: 20px 10px;
    }
    .TCPModal__Content_Modal .ulBorderWithLastRow li:last-child {
      border: none;
      padding: 0px;
      width: 95%;
    }
  }
`;

export default customSelectStyle;
