import { css } from 'styled-components';
import { getIconPath } from '../../../../utils';

const downArrowIcon = getIconPath('down_arrow_icon');

const styleBottomSpacing = '26px';
const selectStyles = css`
  position: relative;
  display: block;
  height: 70px;

  .title {
    font-size: ${props => props.theme.typography.fontSizes.fs13};
  }

  .input {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }

  .select__input {
    appearance: none;
    background: url(${downArrowIcon}) no-repeat right 0px bottom
      ${props => props.theme.spacing.ELEM_SPACING.SM};
    border: 0;
    border-bottom: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
    ${props =>
      props.meta && props.meta.touched && props.meta.error
        ? `border-bottom: 1px solid ${props.theme.colors.TEXTBOX.ERROR_BORDER};`
        : ''};
    border-radius: 0;
    color: ${props =>
      props.disabled ? props.theme.colorPalette.gray[600] : props.theme.colors.TEXTBOX.COLOR};
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    outline: 0;
    padding: ${styleBottomSpacing} 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
    width: 100%;

    ${props =>
      props.disabled
        ? `
      background-color: ${props.theme.fieldBackgroundDisabledColor};
      border-color: ${props.theme.fieldBorderDisabledColor};
    `
        : ''};
  }

  .select__label {
    font-size: ${props => props.theme.fonts.fontSize.body.small.primary}px;
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
    padding: 0;
    position: absolute;
    top: 0;
  }

  .SelectBox__error {
    display: flex;
    flex-direction: row;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .warning-icon {
    background: transparent url('/static/images/circle-alert-fill.svg') no-repeat 0 0;
    background-size: contain;
    border: none;
    height: 14px;
    width: 16px;
    margin-right: 7px;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default selectStyles;
