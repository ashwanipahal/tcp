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
  ${props =>
    props.buttonVariation === 'category-links-light'
      ? `
      min-height: auto;
      color: ${props.theme.colorPalette.text.primary};
      font-family: ${props.theme.typography.fonts.secondary};
      font-size: ${props.theme.typography.fontSizes.fs14};
      font-weight: ${props.theme.typography.fontWeights.regular};
      border-bottom: 2px solid ${props.theme.colorPalette.primary.main};
      margin-right: 16px;
      padding-bottom: 3px;

      @media ${props.theme.mediaQuery.large} {
      font-size: ${props.theme.typography.fontSizes.fs20};
      }
    `
      : ''};

  ${props =>
    props.buttonVariation === 'category-links-dark'
      ? `
      min-height: auto;
      color: ${props.theme.colorPalette.white};
      font-family: ${props.theme.typography.fonts.secondary};
      font-size: ${props.theme.typography.fontSizes.fs14};
      font-weight: ${props.theme.typography.fontWeights.regular};
      border-bottom: 2px solid ${props.theme.colorPalette.text.hint};
      margin: 0 8px;
      padding-bottom: 3px;

      @media ${props.theme.mediaQuery.large} {
      font-size: ${props.theme.typography.fontSizes.fs20};
      }
    `
      : ''};

  &:focus {
    background: ${props => props.theme.colors.BUTTON[props.fill || 'WHITE'].FOCUS};
  }
  &:hover:not([disabled]) {
    background: ${props => props.theme.colors.BUTTON[props.fill || 'WHITE'].HOVER};
  }

  ${props =>
    props.buttonVariation === 'category-links-light'
      ? `
      &:hover:not([disabled]){
        background: none;
        font-weight: ${props.theme.typography.fontWeights.black};
        border-color: ${props.theme.colorPalette.orange[800]};
      }

      &:hover {
        background: none;
        font-weight: ${props.theme.typography.fontWeights.black};
        border-color: ${props.theme.colorPalette.orange[800]};
      }
    `
      : ''};

  ${props =>
    props.buttonVariation === 'category-links-dark'
      ? `
      &:hover:not([disabled]), &:focus {
        background: none;
        font-weight: ${props.theme.typography.fontWeights.black};
        border-color: ${props.theme.colorPalette.orange[800]};
      }
      &:hover, &:focus {
        background: none;
        font-weight: ${props.theme.typography.fontWeights.black};
        border-color: ${props.theme.colorPalette.orange[800]};
      }
    `
      : ''};

  ${props =>
    props.fullWidth
      ? `
      width: 100% ;
    `
      : ''};

  ${props =>
    props.customStyle === 'shadow-button'
      ? `
      background: ${props.theme.colors.PRIMARY.PALEGRAY};
      border-radius: 10px;
      padding: 4px 0;

      border: 2px solid ${props.theme.colors.PRIMARY.LIGHTGRAY};
      box-shadow: 4px 4px white inset, 6px 6px ${props.theme.colors.PRIMARY.PALEBLUE};
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
