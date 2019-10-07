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
  .tile-border-desktop {
    @media ${props => props.theme.mediaQuery.large} {
      width: 1px;
      height: 135px;
      background-color: ${props => props.theme.colorPalette.gray[500]};
      position: absolute;
      right: 0;
      top: 64px;
    }
  }
  .morePointsWrapper {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.small} {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
      margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
    }
  }
  .extraEarningWrapper {
    border: 2px solid ${props => props.theme.colorPalette.orange[800]};
  }
  .earningExtra {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
    margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};

    @media ${props => props.theme.mediaQuery.medium} {
      margin-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .checkOffers {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
  .learnMore {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .borderAll {
    position: relative;
  }
  .tile-border {
    width: 1px;
    height: 135px;
    background-color: ${props => props.theme.colorPalette.gray[500]};
    position: absolute;
    right: 0;
    top: 64px;
  }
`;
