import { css } from 'styled-components';

const styles = css`
  display: block
  height: 50px;

  .inputWrapper {
    display: flex;
    align-items: center;
  }

  input[type='checkbox'] {
    position: relative;
    top: 0;
    appearance: none;
    outline: 0;
    border: 0;
    display: inline-block;
    height: 23px;
    width: 23px;
  }

  input[type='checkbox']:before {
    content: '';
    font-size: 20px;
    position: absolute;
    height: 20px;
    width: 20px;
    left: 0;
    box-shadow: inset 0 0 0 0.6px #575757;
  }
  &.active input[type='checkbox']:after {
    transform: rotate(225deg);
    content: '';
    border: 2px inset #333;
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy2}px;
    width: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    height: 10px;
    border-right: 0;
    border-bottom: 0;
    left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    position: absolute;
  }
`;

export default styles;
