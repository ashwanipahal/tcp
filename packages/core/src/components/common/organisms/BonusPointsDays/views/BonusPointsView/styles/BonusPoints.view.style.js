import { css } from 'styled-components';

const styles = css`
  &.bonusPointsDaysWrapper {
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  &.bonusPointsDaysWrapperAccordian {
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.smallMax} {
      padding-top: 0px;
      padding-bottom: 0px;
      .collapsible-header {
        padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
      }
      .collapsible-icon {
        top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
      .item-opened {
        padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      }
    }
  }

  .bonus-details-modal .TCPModal__InnerContent {
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      max-width: 600px;
      min-height: 608px;
    }
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
