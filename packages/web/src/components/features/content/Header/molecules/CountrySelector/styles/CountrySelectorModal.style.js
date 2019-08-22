import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

const downArrowIcon = getIconPath('down_arrow_icon');
export const modalStyles = css`
  .TCPModal__InnerContent {
    text-align: center;
  }
  .Modal_Heading {
    font-size: ${props => props.theme.typography.fontSizes.fs28};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    border: none;
    display: block;
    margin: 16px 0 12px;
    padding: 0;

    @media ${props => props.theme.mediaQuery.medium} {
      font-size: ${props => props.theme.typography.fontSizes.fs36};
    }
  }
`;

const styles = css`
  .shipToModal__divider {
    background: ${props => props.theme.colorPalette.blue['500']};
    border: 0;
    height: 2px;
    width: 143px;
    margin: 27px auto 48px;
  }
  .shipToForm {
    width: 210px;
    margin: 0 auto;
  }
  form {
    border-bottom: 2px solid ${props => props.theme.colorPalette.gray['500']};
  }

  select {
    appearance: none;
    background: url(${downArrowIcon}) no-repeat right 0px bottom 6px;
    border: 0;
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray['600']};
    ${props =>
      props.meta && props.meta.touched && props.meta.error
        ? `border-bottom: 1px solid ${props.theme.colorPalette.gray['600']};`
        : ''};
    border-radius: 0;
    color: ${props => props.theme.colors.TEXTBOX.COLOR};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
    outline: 0;
    padding: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XS};
    width: 100%;

    :disabled {
      opacity: 0.6;
    }
  }

  label,
  select {
    display: block;
    text-align: left;
    width: 100%;
  }
  label {
    color: ${props => props.theme.colorPalette.gray['900']};
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    font-weight: ${props => props.theme.typography.fontWeights.black};

    span {
      display: block;
      padding-bottom: 5px;
    }
  }
  button,
  select {
    margin-bottom: 32px;
  }
  .shipToForm__note-clarification {
    margin: 32px;
  }
`;

export default styles;
