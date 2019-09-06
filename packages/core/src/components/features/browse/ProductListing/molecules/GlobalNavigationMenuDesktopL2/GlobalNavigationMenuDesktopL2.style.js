import { css } from 'styled-components';

export default css`
  .group-nav {
    background-color: ${props => props.theme.colorPalette.primary.main};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    height: 2px;
    width: 40px;
  }

  .sub-menu-category {
    padding-left: 0;
  }

  .sub-category-item {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;
