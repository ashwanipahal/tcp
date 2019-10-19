import { css } from 'styled-components';

export default css`
  .outfit-title {
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0
      ${props => props.theme.spacing.ELEM_SPACING.XS};
    border-bottom: 2px solid ${props => props.theme.colorPalette.gray[1500]};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
      margin-bottom: 48px;
    }
  }
  .outfit-section-wrapper {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
`;
