import { css } from 'styled-components';

const BadgeStyles = css`
  line-height: 18px;
  padding: 0 4px;
  color: ${props => props.theme.colors.WHITE};
  background-color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  border: 1px solid ${props => props.theme.colors.TEXT.DARKERGRAY};
  border-radius: 10px 0 0 10px;
  margin-bottom: 6px;

  .checkmark {
    display: inline-block;
    width: 9px;
    height: 6px;
    position: relative;
    top: -1px;
    transform: rotate(-45deg);
    transform-origin: top;

    &:before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: #fff;
      left: 0;
      top: 0;
    }

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #fff;
      left: 0;
      bottom: 0;
    }
  }

  .content {
    margin-left: ${props => (props.showCheckmark ? '5px' : '3px')};
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default BadgeStyles;
