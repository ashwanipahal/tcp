import { css } from 'styled-components';

export default css`
  .elem-margin-right {
    @media ${props => props.theme.mediaQuery.large} {
      margin-right: 0;
    }
  }
  /** Need to replace  19 px with col constant
   */

  .extraPointsTileCol {
    @media ${props => props.theme.mediaQuery.small} {
      margin-right: 19px;
    }
  }

  .morePointsWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.small} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    }
  }
`;
