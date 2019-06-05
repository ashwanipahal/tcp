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
    props.fullWidth
      ? `
      width: 100% ;
    `
      : ''};

  &:focus {
    outline: 1px dashed ${props => props.theme.colorOutline};
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default AnchorStyles;
