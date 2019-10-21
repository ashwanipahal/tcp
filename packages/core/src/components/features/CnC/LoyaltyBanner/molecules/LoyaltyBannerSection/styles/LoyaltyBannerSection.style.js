import { css } from 'styled-components';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  .loyalty-banner-wrapper {
    padding-top: 12px;
    padding-bottom: 0;
    padding-left: 14px;
    padding-right: 14px;
  }

  .loyalty-banner-section-wrapper {
    border-top: 5px solid ${plccMpr};
    border-bottom: 5px solid ${plccMpr};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .loyalty-banner-wrapper {
      padding: 12px 6px 0;
    }
    .loyalty-banner-section-wrapper {
      border-top: 3px solid ${plccMpr};
      border-bottom: 3px solid ${plccMpr};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .loyalty-banner-wrapper {
      padding: 12px 12px 0;
    }
    .loyalty-banner-section-wrapper {
      border-top: 4px solid ${plccMpr};
      border-bottom: 4px solid ${plccMpr};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default Styles;
