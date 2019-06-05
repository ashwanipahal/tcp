import { css } from 'styled-components';

const AnchorStyles = css`
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
    props.fullWidth
      ? `
      width: 100%;
    `
      : ''};
  ${props =>
    props.noUnderline
      ? `
      text-decoration: none;
    `
      : ''};

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default AnchorStyles;
