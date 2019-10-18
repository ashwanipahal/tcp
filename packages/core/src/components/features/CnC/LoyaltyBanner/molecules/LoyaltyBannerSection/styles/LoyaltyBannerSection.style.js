import { css } from 'styled-components';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  .alignCenter {
    text-align: center;
  }
  .backgroundWhite {
    background: ${props => props.theme.colors.WHITE};
  }
  .mpr-plcc-theme {
    color: ${plccMpr};
  }
  .spaceBetween {
    display: flex;
    place-content: space-between;
  }
  .loyaltyBannerSectionWrapper {
    border-top: 5px solid ${plccMpr};
    border-bottom: 5px solid ${plccMpr};
  }
  .subtotalPointsSection {
    border-top: 1px solid ${props => props.theme.colorPalette.gray[300]};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[300]};
  }
  .currentSubtotalText,
  .estimatedSubtotalText {
    color: ${props => props.theme.colorPalette.gray[800]};
  }
  .currentSubtotalValCol,
  .estimatedSubtotalValCol {
    text-align: right;
  }

  ${props =>
    props.isProductDetailView
      ? `
    .footer {
      padding: 6px 0 ${props.theme.spacing.ELEM_SPACING.SM};
    }
    .loyalty-banner-wrapper {
      padding-left: 0;
      padding-right: 0;
    }
    `
      : `
      .footer {
        padding-top: ${props.theme.spacing.ELEM_SPACING.MED};
        padding-bottom: ${props.theme.spacing.ELEM_SPACING.MED};
      }

      .loyalty-banner-wrapper {
        padding-left: ${props.theme.spacing.ELEM_SPACING.MED};
        padding-right: ${props.theme.spacing.ELEM_SPACING.MED};
      }
      `};
`;

export default Styles;
