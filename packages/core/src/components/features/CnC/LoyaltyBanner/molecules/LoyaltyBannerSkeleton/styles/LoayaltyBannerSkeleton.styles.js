import { css } from 'styled-components';
import { PRODUCT_DETAIL_PAGE } from '../../../../../../../../../web/src/pages/App.constants';

const plccMpr = props =>
  props.isPlcc ? props.theme.colorPalette.userTheme.plcc : props.theme.colorPalette.userTheme.mpr;
export default css`
  border-bottom: 2px solid ${props => props.theme.colorPalette.gray[300]};
  background: ${props => props.theme.colors.WHITE};

  .loyalty-banner-header-footer {
    width: 200px;
    height: 20px;
    margin-bottom: 10px;
  }

  .loyalty-banner-content {
    width: 240px;
    height: 20px;

    margin-bottom: 10px;
  }

  .loyalty-banner-section-wrapper {
    border-top: 5px solid ${plccMpr};
    border-bottom: 5px solid ${plccMpr};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    padding-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  @media ${props => props.theme.mediaQuery.medium} {
    .loyalty-banner-section-wrapper {
      border-top: 3px solid ${plccMpr};
      border-bottom: 3px solid ${plccMpr};
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
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
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;
