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
      font-size: ${props.theme.fonts.anchor.small};
    `
      : ''};
  ${props =>
    props.fontSizeVariation === 'medium'
      ? `
      color: ${props.theme.fonts.anchor.medium};
    `
      : ''};
  ${props =>
    props.fontSizeVariation === 'large'
      ? `
      color: ${props.theme.fonts.anchor.large};
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

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default AnchorStyles;
