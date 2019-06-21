import { css } from 'styled-components';

const ButtonStyles = css`
  border: none;
  border-radius: 0;
  background: none;
  position: relative;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  opacity: ${props => (props.disabled ? props.theme.opacity.medium : '1')};
  text-transform: uppercase;
  min-height: 42px;
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
      min-width: 40px;
      background: ${props.theme.colors.BUTTON.NORMAL};
      color: ${props.theme.colors.BUTTON.TEXT};
      font-family: ${props.theme.fonts.secondaryFontSemilBoldFamily};
      font-size: ${props.theme.fonts.fontSize.button.size}px;
      font-weight: ${props.theme.fonts.fontWeight.semiBold};
      border: 1px solid ${props.theme.colors.BUTTON.BORDER};
      padding: 12px 20px;
      width: 100%;
    `
      : ''};
  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
      min-width: 64px;
      background: ${props.theme.colors.BUTTON.NORMAL};
      color: ${props.theme.colors.BUTTON.TEXT};
      font-family: ${props.theme.fonts.secondaryFontFamily};
      font-size: ${props.theme.fonts.fontSize.button.size}px;
      font-weight: ${props.theme.fonts.fontWeight.black};
      border: 1px solid ${props.theme.colors.BUTTON.BORDER};
      padding: 12px 32px;
    `
      : ''};
  ${props =>
    props.fullWidth
      ? `
      width: 100% ;
    `
      : ''};

  &:hover {
    background: ${props => props.theme.colors.BUTTON.HOVER};
  }
  &:focus {
    background: ${props => props.theme.colors.BUTTON.FOCUS};
  }

  ${props =>
    props.customButton
      ? `
    background: #f3f3f3;
    color: #6a6a6a;
    border-radius: 10px;
    text-transform: uppercase;
    padding: 11px 0;
    border: 2px solid #d8d8d8;
    box-shadow: 10px 10px white inset, 12px 12px #f3f3f3;
    width: calc(100% - 14px);
    &:hover {
      background: #f2f9fe;
      box-shadow: 10px 10px white inset, 12px 12px #f2f9fe;
      border: 2px solid #9b9b9b;
    }
    `
      : ''}

  @media ${props => props.theme.mediaQuery.large} {
    ${props =>
      props.buttonVariation === 'fixed-width' ? 'min-height: 51px; padding: 16px 20px;' : ''};
    ${props =>
      props.buttonVariation === 'variable-width' ? 'min-height: 45px; padding: 16px 32px;' : ''};
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default ButtonStyles;
