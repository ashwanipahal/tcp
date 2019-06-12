import { css } from 'styled-components';

const AnchorStyles = css`
  font-family: ${props => props.theme.fonts.secondaryFontFamily};
  ${props =>
    props.anchorVariation === 'primary'
      ? `
      color: ${props.theme.colors.ANCHOR.PRIMARY};
    `
      : ''};
  ${props =>
    props.anchorVariation === 'secondary'
      ? `
      color: ${props.theme.colors.ANCHOR.SECONDARY};
    `
      : ''};
  ${props =>
    props.anchorVariation === 'tertiary'
      ? `
      color: ${props.theme.colors.ANCHOR.TERTIARY};
    `
      : ''};
  ${props =>
    props.fontSizeVariation === 'small'
      ? `
      font-size: ${props.theme.fonts.fontSize.anchor.small}px;
    `
      : ''};
  ${props =>
    props.fontSizeVariation === 'medium'
      ? `
      font-size: ${props.theme.fonts.fontSize.anchor.medium}px;
    `
      : ''};
  ${props =>
    props.fontSizeVariation === 'large'
      ? `
      font-size: ${props.theme.fonts.fontSize.anchor.large}px;
    `
      : ''};
  ${props =>
    props.fullWidth
      ? `
      width: 100%;
    `
      : ''};
  ${props =>
    props.underline
      ? `
      text-decoration: underline;
    `
      : 'text-decoration: none;'};
  ${props =>
    props.withCaret
      ? `
      &:after {
        content: "›";
        margin-left: 5px;
      }
    `
      : ''};
  ${props =>
    props.centered
      ? `
      text-align: center;
    `
      : ''};
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default AnchorStyles;
