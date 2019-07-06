import { css } from 'styled-components/native';

const style = css`
  ${props =>
    props.buttonVariation === 'fixed-width'
      ? `
    width: 40px;
    height: 100px;
    color: ${props.theme.colorPalette.white};
    font-size: ${props.theme.typography.fontSizes.fs16};
    font-family: ${props.theme.typography.mobileFonts.primary};
    font-weight: ${props.theme.typography.fontWeights.semibold};
    border: 1px solid ${props.theme.colorPalette.black};
    padding: 12px 20px;
    width: 100%;
    margin : 40px
  `
      : ''};

  ${props =>
    props.buttonVariation === 'variable-width'
      ? `
  width: ${props.width};
  height: ${props.width};
  min-width: 64px;
  background: ${props.theme.colorPalette.white};
  color: ${props.theme.colorPalette.black};
  font-family: ${props.theme.typography.mobileFonts.primary};
  font-size: ${props.theme.typography.fontSizes.fs14};
  font-weight: ${props.theme.typography.fontWeights.black};
  border: 1px solid ${props.theme.colorPalette.black};
  padding: 12px 32px;
  `
      : ''};

  ${props => (props.fullWidth ? ` width: 100% ; ` : '')};

  ${props =>
    props.customStyle === 'shadow-button'
      ? `
      background: ${props.theme.colorPalette.PALEGRAY};
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
`;

export default style;
