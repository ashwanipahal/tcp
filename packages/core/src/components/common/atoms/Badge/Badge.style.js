import { css } from 'styled-components';

const BadgeStyles = css`
  align-items: baseline;
  background-color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  border: 1px solid ${props => props.theme.colors.TEXT.DARKERGRAY};
  color: ${props => props.theme.colors.WHITE};
  border-radius: 10px 0 0 10px;
  display: flex;
  margin-bottom: 8px;
  padding: 0 4px;

  .badge__checkmark {
    width: 9px;
    height: 5px;
    margin-left: 2px;
    position: relative;
    transform: rotate(-45deg);
    transform-origin: left;

    &:before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: ${props => props.theme.colors.WHITE};
    }

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: ${props => props.theme.colors.WHITE};
      bottom: 0;
    }
  }

  .badge__content {
    margin-left: ${props => (props.showCheckmark ? '2px' : '4px')};
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default BadgeStyles;
