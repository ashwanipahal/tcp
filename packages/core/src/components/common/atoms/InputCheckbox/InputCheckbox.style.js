import { css } from 'styled-components';

const styles = css`
  display: flex;
  align-items: center;
  height: 50px;

  & .CheckBox__input {
    position: relative;
    top: 0;
    appearance: none;
    outline: 0;
    border: 0;
    height: 25px;
    width: 25px;
    margin: 0;
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  & .CheckBox__input:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    box-shadow: inset 0 0 0 0.6px ${props => props.theme.colors.CHECKBOX.BORDER};
  }

  & .CheckBox__input:checked:before {
    background: ${props => props.theme.colors.CHECKBOX.CHECKED_BORDER};
    box-shadow: inset 0 0 0 0.6px ${props => props.theme.colors.CHECKBOX.CHECKED_BORDER};
  }

  & .CheckBox__input:checked:after {
    transform: rotate(225deg);
    content: '';
    border: 2px solid ${props => props.theme.colors.CHECKBOX.TICK_COLOR};
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy2}px;
    width: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    height: 10px;
    border-right: 0;
    border-bottom: 0;
    left: 10px;
    top: 5px;
    position: absolute;
  }
`;

export default styles;
