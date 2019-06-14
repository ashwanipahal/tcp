import { css } from 'styled-components';

const accordionStyles = css`
  &.accordion {
    height: 34px;
    padding: 18px 15px 0;
    margin: 0;
    &.inactive {
      background: ${props => props.theme.colors.ACCORDION.INACTIVE_HEADER};
    }
    &.active {
      background: ${props => props.theme.colors.ACCORDION.ACTIVE_HEADER};
    }
  }
  &.active::after {
    content: '+';
    right: 15px;
    position: absolute;
    font-weight: bold;
    font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;
    color: ${props => props.theme.colors.ACCORDION.COLLAPSE_EXPAND_ICON};
  }

  &.inactive::after {
    content: '';
    right: 15px;
    position: absolute;
    background: ${props => props.theme.colors.ACCORDION.COLLAPSE_EXPAND_ICON};
    height: 2px;
    width: 10px;
    margin-top: 5px;
  }
`;

export default accordionStyles;
