import { css } from 'styled-components';

const styles = css`
  display: block;
  position: relative;
  padding-left: 40px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default radio button */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 13px;
    left: 10px;
    height: 16px;
    width: 16px;
    background-color: ${props => props.theme.colors.WHITE};
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.GRAY};
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #000000;
  }

  /* Show the indicator (dot/circle) when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }
`;

export default styles;
