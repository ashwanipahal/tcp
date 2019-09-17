import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import { openPickupModalWithValues } from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.actions';
import { fetchRecommendationsData } from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.actions';
import {
  getProducts,
  getLoadedProductsCount,
  getLabelsProductListing,
} from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.selector';
import RecommendationsView from '../Recommendations';

const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(state),
    moduleOHeaderLabel:
      ownProps.headerLabel ||
      getLabelValue(state.Labels, 'MODULE_O_HEADER_LABEL', 'recommendations', 'global'),
    modulePHeaderLabel:
      ownProps.headerLabel ||
      getLabelValue(state.Labels, 'MODULE_P_HEADER_LABEL', 'recommendations', 'global'),
    ctaText: getLabelValue(state.Labels, 'CTA_TEXT', 'recommendations', 'global'),
    ctaTitle: getLabelValue(state.Labels, 'CTA_TITLE', 'recommendations', 'global'),
    ctaUrl: getLabelValue(state.Labels, 'CTA_URL', 'recommendations', 'global'),
    loadedProductCount: getLoadedProductsCount(state),
    labels: getLabelsProductListing(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRecommendations: () => dispatch(fetchRecommendationsData()),
    onPickUpOpenClick: payload => {
      dispatch(openPickupModalWithValues(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsView);
