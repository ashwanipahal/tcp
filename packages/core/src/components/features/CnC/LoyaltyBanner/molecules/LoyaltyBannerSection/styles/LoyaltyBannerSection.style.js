import { css } from 'styled-components';
import { PRODUCT_DETAIL_PAGE } from '../../../../../../../../../web/src/pages/App.constants';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;

const Styles = css`
  .loyalty-banner-wrapper {
    padding: 12px 14px;
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
      padding: 12px 6px;
    }
    .loyalty-banner-section-wrapper {
      border-top: 3px solid ${plccMpr};
      border-bottom: 3px solid ${plccMpr};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .loyalty-banner-wrapper {
      padding: 12px 12px;
    }
    .loyalty-banner-section-wrapper {
      border-top: 4px solid ${plccMpr};
      border-bottom: 4px solid ${plccMpr};
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }

    ${props =>
      props.pageCategory === PRODUCT_DETAIL_PAGE
        ? `
    .loyalty-banner-section-wrapper {
      padding-bottom: ${props.theme.spacing.ELEM_SPACING.SM};
    }`
        : ``};
  }

  ${props =>
    props.pageCategory && props.pageCategory === 'isProductDetailView'
      ? `
      .loyalty-banner-wrapper {
        padding: 0 0 14px;
      }
      .loyalty-banner-section-wrapper {
        padding-left: 0;
        padding-right: 0;
      }

      @media ${props.theme.mediaQuery.medium} {
        .loyalty-banner-wrapper {
          padding: 0 0  ${props.theme.spacing.ELEM_SPACING.SM};
        }`
      : ``};

  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default Styles;
