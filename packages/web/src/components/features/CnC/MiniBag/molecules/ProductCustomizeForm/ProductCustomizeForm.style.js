import { css } from 'styled-components';

const styles = css`
  margin-top: 10px;
  .edit-form-css {
    display: flex;
    flex: 1;
    height: 45px;
    width: 100%;
  }
  .select-value-wrapper {
    display: flex;
    flex: 1;
    div {
      margin-right: 2px;
    }
  }
  .button-wrapper {
    display: flex;
    flex-direction: column;
    height: inherit;
    justify-content: space-between;
  }

  .size-error {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    color: ${props => props.theme.colors.NOTIFICATION.ERROR};
    width: 69px;
  }

  .size-field {
    height: 35px;
  }

  .size-field-error {
    height: 33px;
    .select__input {
      border-bottom: 2px solid ${props => props.theme.colors.NOTIFICATION.ERROR};
    }
  }

  .error-image {
    height: 12px;
    padding-right: 2px;
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
