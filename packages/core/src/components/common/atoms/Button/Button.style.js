import { css } from 'styled-components';

const ButtonStyles = css`
  border: none;
  border-radius: 0;
  background: none;
  position: relative;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  text-transform: uppercase;
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
      min-height: 51px;
      min-width: 40px;
      background: ${props.theme.colors.BUTTON.NORMAL};
      color: ${props.theme.colors.BUTTON.TEXT};
      font-family: Nunito-SemiBold;
      font-size: ${props.theme.fonts.fontSize.button.size}px;
      font-weight: ${props.theme.fonts.fontWeight.semiBold};
      border: 1px solid ${props.theme.colors.BUTTON.BORDER};
      padding: 16px 20px;
      width: 100%;
    `
      : ''};
  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
      min-height: 45px;
      min-width: 64px;
      background: ${props.theme.colors.BUTTON.NORMAL};
      color: ${props.theme.colors.BUTTON.TEXT};
      font-family: ${props.theme.fonts.secondaryFontFamily};
      font-size: ${props.theme.fonts.fontSize.button.size}px;
      border: 1px solid ${props.theme.colors.BUTTON.BORDER};
      padding: 16px 20px;
    `
      : ''};
  ${props =>
    props.fullWidth
      ? `
      width: 100% ;
    `
      : ''};

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default ButtonStyles;
