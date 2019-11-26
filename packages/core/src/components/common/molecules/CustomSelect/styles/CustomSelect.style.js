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
      background: ${props => props.theme.colorPalette.gray['600']};
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
        background: ${props => props.theme.colorPalette.black};
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

  .dropdown-items:hover,
  .dropdown-items:focus {
    background: ${props => props.theme.colorPalette.blue[50]};
    border: 0;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default customSelectStyle;
