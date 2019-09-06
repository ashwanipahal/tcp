import { css } from 'styled-components';

export default css`
  .active {
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }

  .group-nav {
    background-color: ${props => props.theme.colorPalette.primary.main};
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    height: 2px;
    width: 40px;
  }

  .sub-category-item {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }

  .sub-menu-wrapper {
    margin-bottom: 26px;
  }

  .sub-menu-category {
    padding-left: 0;
  }

  .navigation-level-three-item {
    padding-top: 4px;
  }

  .sub-menu-category-level-three {
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .sub-menu-outliers-group {
    a {
      font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    }
  }
`;
