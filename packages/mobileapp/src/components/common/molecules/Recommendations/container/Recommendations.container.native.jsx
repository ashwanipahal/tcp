import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import { fetchRecommendationsData } from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.actions';
import { isPlccUser } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { openQuickViewWithValues } from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.actions';
import {
  getProducts,
  selectSingleSuggestedProduct,
} from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.selector';
import { getIsPickupModalOpen } from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import * as labelsSelectors from '@tcp/core/src/reduxStore/selectors/labels.selectors';
import RecommendationsView from '../Recommendations.native';

const mapStateToProps = (state, ownProps) => {
  const { page, portalValue } = ownProps;
  const reduxKey = `${page}_${portalValue || 'global'}_products`;
  return {
    products: ownProps.isSuggestedItem
      ? selectSingleSuggestedProduct(state)
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
    isPlcc: isPlccUser(state),
    isPickupModalOpen: getIsPickupModalOpen(state),
    labels: labelsSelectors.getPlpTilesLabels(state),
    reduxKey,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRecommendations: action => dispatch(fetchRecommendationsData(action)),
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsView);
