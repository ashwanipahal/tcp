import { css } from 'styled-components';

const styles = css`
  margin-top: 10px;
  .edit-form-css {
    display: flex;
    flex: 1;
    height: 45px;
  }
  .select-value-wrapper {
    display: flex;
    flex: 1;
    div {
      margin-right: 3px;
    }
  }
  .button-wrapper {
    display: flex;
    flex-direction: column;
    height: inherit;
    justify-content: space-between;
  }
`;

export const buttonCustomStyles = css`
  min-height: unset;
  text-transform: none;
  &:hover {
    background-color: transparent;
  }
`;

export default styles;
