import { css } from 'styled-components';

export default css`
  .bread-crumb {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;
