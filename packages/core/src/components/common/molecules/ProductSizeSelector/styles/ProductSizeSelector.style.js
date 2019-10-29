import { css } from 'styled-components';

const styles = css`
  .size-and-fit-detail-container {
    .size-and-fit-detail-title-msg {
      font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
      font-weight: ${props => props.theme.fonts.fontWeight.medium};
      margin-left: 25px;
      vertical-align: middle;
      font-family: ${props => props.theme.fonts.secondaryFontFamily};
    }
  }

  .size-and-fit-detail-items-list {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    width: calc(100% + 10px);
    position: relative;
    left: -5px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
  }

  /* Radio Button for size */
  .size-and-fit-detail-item {
    padding: 0px;
    margin: 5px;
    cursor: pointer;

    .input-radio-title {
      padding: 5px ${props => props.theme.spacing.ELEM_SPACING.LRG};
      border: solid 1px #e3e3e3;
      display: inline-block;
      text-transform: capitalize;
      font-size: ${props => props.theme.fonts.fontSize.anchor.small}px;
      border-radius: 6px;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    }

    &.item-disabled-option .input-radio-title {
      color: #e3e3e3;
      cursor: initial;
    }

    .input-radio-icon-unchecked,
    .input-radio-icon-checked {
      width: auto;
      height: auto;
      top: auto;
      position: absolute;
      vertical-align: middle;

      input {
        -webkit-appearance: none;
        display: none;
      }

      &:before,
      &:after {
        display: none;
      }
    }

    .input-radio-icon-checked + .input-radio-title {
      background: ${props => props.theme.colors.PRIMARY.DARK};
      color: ${props => props.theme.colors.WHITE};
      border: solid 1px ${props => props.theme.colors.PRIMARY.DARK};
    }
  }
`;

export default styles;
