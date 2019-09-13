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
    youMayAlsoLikeLabel: getLabelValue(state.Labels, 'HEADER_LABEL', 'recommendations', 'global'),
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
