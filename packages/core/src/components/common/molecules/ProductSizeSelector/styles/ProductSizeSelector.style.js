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
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    width: calc(100% + 10px);
    position: relative;
    left: -5px;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    display: flex;
    flex-flow: wrap;
  }

  /* Radio Button for size */
  .size-and-fit-detail-item {
    padding: 0px;
    margin: 5px;
    cursor: pointer;

    .input-radio-title {
      padding: 4px ${props => props.theme.spacing.ELEM_SPACING.SM};
      border: 1px solid ${props => props.theme.colorPalette.gray[900]};
      display: inline-block;
      text-transform: capitalize;
      font-size: ${props => props.theme.fonts.fontSize.anchor.small}px;
      color: ${props => props.theme.colorPalette.gray[900]};
      border-radius: 6px;
      text-align: center;
      width: auto;
      @media ${props => props.theme.mediaQuery.medium} {
        padding: 3.5px ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
      @media ${props => props.theme.mediaQuery.large} {
        padding: 4px ${props => props.theme.spacing.ELEM_SPACING.SM};
      }
    }

    &.item-disabled-option .input-radio-title {
      color: #e3e3e3;
      cursor: initial;
      border: solid 1px #e3e3e3;
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
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
    }
  }
`;

export default styles;
