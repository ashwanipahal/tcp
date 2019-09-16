import { connect } from 'react-redux';
import { fetchRecommendationsData } from './Recommendations.actions';
import RecommendationsView from '../Recommendations';
import { getLabelValue } from '../../../../../utils';
import { openPickupModalWithValues } from '../../../organisms/PickupStoreModal/container/PickUpStoreModal.actions';
import {
  getProducts,
  getLoadedProductsCount,
  getLabelsProductListing,
} from './Recommendations.selector';

const mapStateToProps = state => {
  return {
    products: getProducts(state),
    headerLabel: getLabelValue(state.Labels, 'HEADER_LABEL', 'recommendations', 'global'),
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
