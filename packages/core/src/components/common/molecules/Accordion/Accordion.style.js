import { css } from 'styled-components';

const accordionStyles = css`
  &.accordion {
    height: 34px;
    padding: 18px 15px 0;
    margin: 0;
    &.inactive {
      background: #e5e5e5;
    }
    &.active {
      background: #f7f7f7;
    }
  }
  &.active::after {
    content: '+';
    float: right;
    font-weight: bold;
    font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;
  }

  &.inactive::after {
    content: '-';
    float: right;
    font-weight: bold;
    font-size: ${props => props.theme.fonts.fontSize.heading.large.h6}px;
  }
`;

export default accordionStyles;
