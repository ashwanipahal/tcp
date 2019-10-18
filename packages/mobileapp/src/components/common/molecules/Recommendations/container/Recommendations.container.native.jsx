import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import { fetchRecommendationsData } from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.actions';
import { isPlccUser } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { openQuickViewWithValues } from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.actions';
import { getProducts } from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.selector';
import { getIsPickupModalOpen } from '@tcp/core/src/components/common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import RecommendationsView from '../Recommendations.native';

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
    isPlcc: isPlccUser(state),
    isPickupModalOpen: getIsPickupModalOpen(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRecommendations: () => dispatch(fetchRecommendationsData()),
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsView);
