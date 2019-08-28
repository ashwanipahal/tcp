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
      padding-left: 0px;
      padding-bottom: 2px;
    }
    .customSelectTitle {
      padding-bottom: 2px;
      img {
        border: solid 0.4px #000000;
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
    color: ${props => props.theme.colors.BUTTON.BLUE.NORMAL};
  }

  .color-selector {
    cursor: pointer;
    .dropdownliBottomBorder {
      width: auto;
      border-bottom: none;
      div {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .dropdownActiveClass {
      background-color: ${props => props.theme.colors.PRIMARY.BLUE};
      div {
        color: ${props => props.theme.colors.WHITE};
      }
    }
    .dropdownUlBorder {
      border: none;
    }
    .dropdownDivOverFlow {
      display: block;
      overflow-y: visible;
      border: 2px solid ${props => props.theme.colors.PRIMARY.BLUE};
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
  text-transform: none;
  &:hover {
    background-color: transparent;
  }
`;

export default styles;
