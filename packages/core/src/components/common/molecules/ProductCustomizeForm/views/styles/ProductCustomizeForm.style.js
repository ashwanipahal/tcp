import { css } from 'styled-components';

const styles = css`
  margin-top: 10px;
  .edit-form-css {
    display: flex;
    flex: 1;
    width: 100%;
    align-items: flex-start;
  }
  .select-value-wrapper {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    div {
      margin-right: 2px;
      height: auto;
    }
    .select__input {
      background-repeat: no-repeat;
      background-position: right center;
      height: auto;
      padding-bottom: 2px;
      padding-left: 0px;
    }
    .customSelectTitle {
      padding-bottom: 2px;
      img {
        border: solid 0.4px ${props => props.theme.colors.BLACK};
        margin-right: 5px;
        border-radius: 5px;
      }
    }
  }
  .button-wrapper {
    display: flex;
    flex-direction: column;
    height: inherit;
    justify-content: space-between;
    margin-left: -15px;
    button {
      text-align: right;
    }
    button[type='submit'] {
      font-size: 12px;
    }
    button:hover {
      background-color: transparent;
    }
  }

  .button-cancel {
    font-size: 10px;
    margin-top: 12px;
    color: ${props => props.theme.colors.BUTTON.RED.TEXT};
  }

  .color-selector {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    cursor: pointer;
    .dropdownDivOverFlow {
      display: inline-block;
      overflow-y: auto;
      max-height: 150px;
      border: 2px solid ${props => props.theme.colors.PRIMARY.DARK};
      .dropdownUlBorder {
        border: none;
      }
    }
  }

  .size-error {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    color: ${props => props.theme.colors.NOTIFICATION.ERROR};
    width: 69px;
  }

  .size-field {
    height: auto;
  }

  .size-field-error {
    height: auto;
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
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  text-transform: none;
  &:hover {
    background-color: transparent;
  }
`;

export default styles;
