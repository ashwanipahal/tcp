import { css } from 'styled-components';

const ButtonStyles = css`
  border: none;
  border-radius: 0;
  background: none;
  position: relative;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};
  opacity: ${props => (props.disabled ? props.theme.opacity.opacity.medium : '1')};
  text-transform: uppercase;
  min-height: 42px;
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
      min-width: 40px;
      background: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].NORMAL};
      color: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].TEXT};
      font-family: ${props.theme.fonts.secondaryFontSemilBoldFamily};
      font-size: ${props.theme.fonts.fontSize.button.size}px;
      font-weight: ${props.theme.fonts.fontWeight.semiBold};
      border: 1px solid ${props.theme.colors.BUTTON[props.fill || 'WHITE'].BORDER};
      padding: 12px 20px;
      width: 100%;
    `
      : ''};
  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
      min-width: 64px;
      background: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].NORMAL};
      color: ${props.theme.colors.BUTTON[props.fill || 'WHITE'].TEXT};
      font-family: ${props.theme.fonts.secondaryFontFamily};
      font-size: ${props.theme.fonts.fontSize.button.size}px;
      font-weight: ${props.theme.fonts.fontWeight.black};
      border: 1px solid ${props.theme.colors.BUTTON[props.fill || 'WHITE'].BORDER};
      padding: 12px 32px;
    `
      : ''};

  &:hover {
    background: ${props => props.theme.colors.BUTTON[props.fill || 'WHITE'].HOVER};
  }
  &:focus {
    background: ${props => props.theme.colors.BUTTON[props.fill || 'WHITE'].FOCUS};
  }

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
    props.ButtonColor === 'BLUE'
      ? ` background: ${props.theme.colors.BUTTON.BLUE.NORMAL};
            color:${props.theme.colors.BUTTON.BLUE.TEXT};
            &:hover {
    background: ${props.theme.colors.BUTTON.BLUE.ALT_HOVER};
  }
        `
      : ''};
  ${props =>
    props.customStyle === 'shadow-button'
      ? `
      background: ${props.theme.colors.PRIMARY.PALEGRAY};
      border-radius: 10px;
      padding: 4px 0;

      border: 2px solid ${props.theme.colors.PRIMARY.LIGHTGRAY};
      box-shadow: 4px 4px white inset, 6px 6px ${props.theme.colors.PRIMARY.PALEGRAY};
      width: calc(100% - 6px);
      &:hover, &:focus {
        background: ${props.theme.colors.PRIMARY.COLOR1};
        box-shadow: 4px 4px white inset, 6px 6px ${props.theme.colors.PRIMARY.COLOR1};
        border: 2px solid ${props.theme.colors.PRIMARY.GRAY};
      }
      @media ${props.theme.mediaQuery.large} {
        padding: 11px 0;
        box-shadow: 10px 10px white inset, 12px 12px ${props.theme.colors.PRIMARY.PALEGRAY};
        width: calc(100% - 12px);
        &:hover, &:focus {
          box-shadow: 10px 10px white inset, 12px 12px ${props.theme.colors.PRIMARY.COLOR1};
        }
      }
    `
      : ''};

  @media ${props => props.theme.mediaQuery.large} {
    ${props =>
      props.buttonVariation === 'fixed-width' ? 'min-height: 51px; padding: 16px 20px;' : ''};
    ${props =>
      props.buttonVariation === 'variable-width' ? 'min-height: 45px; padding: 16px 32px;' : ''};
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default ButtonStyles;
