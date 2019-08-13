import { css } from 'styled-components';

const CHECKBOX_SIZE = '25px';

const styles = css`
  display: inline-flex;
  align-items: ${props => (props.alignCheckbox ? props.alignCheckbox : 'center')};

  & .CheckBox__input {
    flex: 0 0 auto;
    position: relative;
    top: 0;
    appearance: none;
    outline: 0;
    border: 0;
    height: ${CHECKBOX_SIZE};
    width: ${CHECKBOX_SIZE};
    margin: 0;
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  & .CheckBox__input:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    border: 1px solid ${props => props.theme.colors.CHECKBOX.BORDER};
  }

  & .CheckBox__input:checked:before {
    background: ${props => props.theme.colors.CHECKBOX.CHECKED_BORDER};
    border: 1px solid ${props => props.theme.colors.CHECKBOX.CHECKED_BORDER};
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

  & .CheckBox__text {
    width: calc(100% - 25px);
  }

  & .disabled {
    opacity: ${props => props.theme.opacity.opacity.medium};
  }
`;

export default styles;
