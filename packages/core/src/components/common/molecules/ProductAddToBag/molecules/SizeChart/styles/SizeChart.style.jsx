import { css } from 'styled-components';

const modalstyles = css`
  .Modal_Heading {
    border-bottom: 0px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    margin-top: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    text-align: center;
  }
  .Modal-Header {
    padding-top: 14px;
    z-index: ${props => props.theme.zindex.zLoader};
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;

export default modalstyles;
