import { css } from 'styled-components';

export default css`
  .nav-link-wrapper:not(:first-child) {
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0 0;
  }
  .navLink {
    color: ${props => props.theme.colorPalette.gray[600]};
    &__Selected {
      color: ${props => props.theme.colorPalette.gray[900]};
    }
  }
`;
