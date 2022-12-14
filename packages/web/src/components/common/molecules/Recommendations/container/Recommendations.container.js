import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import { openPickupModalWithValues } from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.actions';
import { fetchRecommendationsData } from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.actions';
import {
  getProducts,
  getLoadedProductsCount,
  getLabelsProductListing,
  getFirstSuggestedProduct,
} from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.selector';
import {
  getCurrentCurrency,
  getCurrencyAttributes,
} from '@tcp/core/src/components/features/browse/ProductDetail/container/ProductDetail.selectors';
import { openQuickViewWithValues } from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.actions';
import RecommendationsView from '../Recommendations';

const mapStateToProps = (state, ownProps) => {
  const { page, portalValue } = ownProps;
  const reduxKey = `${page}_${portalValue || 'global'}_products`;

  return {
    products: ownProps.isSuggestedItem
      ? getFirstSuggestedProduct(state)
      : getProducts(state, reduxKey),
    moduleOHeaderLabel:
      ownProps.headerLabel ||
      getLabelValue(state.Labels, 'MODULE_O_HEADER_LABEL', 'recommendations', 'global'),
    modulePHeaderLabel:
      ownProps.headerLabel ||
      getLabelValue(state.Labels, 'MODULE_P_HEADER_LABEL', 'recommendations', 'global'),
    ctaText: getLabelValue(state.Labels, 'CTA_TEXT', 'recommendations', 'global'),
    ctaTitle: getLabelValue(state.Labels, 'CTA_TITLE', 'recommendations', 'global'),
    ctaUrl: getLabelValue(state.Labels, 'CTA_URL', 'recommendations', 'global'),
    ariaPrevious: getLabelValue(state.Labels, 'previousButton', 'accessibility', 'global'),
    ariaNext: getLabelValue(state.Labels, 'nextIconButton', 'accessibility', 'global'),
    loadedProductCount: getLoadedProductsCount(state),
    labels: getLabelsProductListing(state),
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    reduxKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRecommendations: action => {
      dispatch(fetchRecommendationsData(action));
    },
    onPickUpOpenClick: payload => {
      dispatch(openPickupModalWithValues(payload));
    },
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsView);
