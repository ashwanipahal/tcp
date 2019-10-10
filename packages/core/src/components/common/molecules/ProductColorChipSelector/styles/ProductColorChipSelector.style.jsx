import { css } from 'styled-components';

const styles = css`
  .color-chips-selector-container {
    .inline-error-message {
      white-space: normal;
    }
  }

  .color-chips-selector-items-list {
    position: relative;
    width: 100%;
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    cursor: auto;
  }

  .color-chips-selector-item {
    width: 30px;
    height: 30px;
    padding: 0px;
    display: inline-block;
    vertical-align: middle;
    margin: 5px 16px 5px 0;
    border-radius: 50%;
    line-height: 25px;
    position: relative;

    .input-radio-title {
      line-height: 0px;
      position: absolute;
      top: 0;
    }

    /* First color's chip */
    &:first-of-type {
      margin-left: 0px;
    }

    .input-radio-icon-unchecked,
    .input-radio-icon-checked {
      top: auto;
      width: 30px;
      height: 30px;
      vertical-align: middle;

      input[type='radio'] {
        left: 0px;
        z-index: 1;
        width: 100%;
        height: 100%;
        cursor: pointer;
        -webkit-appearance: none;
      }

      input[type='radio']:focus {
        border-radius: 15px;
        box-shadow: 0 0 0 2pt ${props => props.theme.colorPalette.blue.A100};
        margin-top: -3px;
        margin-left: -3px;
        width: 30px;
        height: 30px;
        outline: 0;
      }

      &:before,
      &:after {
        display: none;
      }

      @media ${props => props.theme.mediaQuery.large} {
        width: 23px;
        height: 23px;
      }
    }

    /* Container of title name and image */
    .color-title-container {
      display: inline-block;
    }

    /* Color name */
    .color-name {
      font-size: 0;
    }

    /* Image color of item */
    .color-image {
      border-radius: 50%;
      position: relative;
      width: 30px;
      height: 30px;
      cursor: pointer;

      @media ${props => props.theme.mediaQuery.large} {
        width: 23px;
        height: 23px;
      }
    }

    /* When the input is checked, the image color has black border (selected) */
    .input-radio-icon-checked + .input-radio-title .color-image {
      border: 2px solid ${props => props.theme.colors.BLACK};
      width: 26px;
      height: 26px;

      @media ${props => props.theme.mediaQuery.large} {
        width: 19px;
        height: 19px;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      width: 23px;
      height: 23px;
    }
  }
`;

export default styles;
