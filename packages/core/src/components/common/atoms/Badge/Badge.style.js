import { css } from 'styled-components';

const BadgeStyles = css`
  align-items: baseline;
  background-color: ${props => props.theme.colors.TEXT.DARKERGRAY};
  border: 1px solid ${props => props.theme.colors.TEXT.DARKERGRAY};
  color: ${props => props.theme.colors.WHITE};
  border-radius: 10px 0 0 10px;
  display: flex;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXXS}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};

  .badge__checkmark {
    width: 9px;
    height: 5px;
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
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
    margin-left: ${props =>
      props.showCheckmark
        ? props.theme.spacing.ELEM_SPACING.XXXS
        : props.theme.spacing.ELEM_SPACING.XXS};
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default BadgeStyles;
