import { css } from 'styled-components';

const styles = css`
  .bonus-details-modal .TCPModal__InnerContent {
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      max-width: 600px;
      min-height: 608px;
    }
  }
  @media ${props => props.theme.mediaQuery.xlarge} {
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
`;

export const modalstyles = css`
  .Modal_Heading {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    margin-top: 0;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }
`;

export default styles;
