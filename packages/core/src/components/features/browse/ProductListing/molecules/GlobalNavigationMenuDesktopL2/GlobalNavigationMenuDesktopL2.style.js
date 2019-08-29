import { css } from 'styled-components';

export default css`
  .group-heading {
    border-bottom: 2px solid ${props => props.theme.colorPalette.primary.main};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .sub-menu-category {
    padding-left: 0;
  }

  .sub-category-item {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;
