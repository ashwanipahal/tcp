import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import { fetchRecommendationsData } from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.actions';
import RecommendationsView from '../Recommendations.native';

const mapStateToProps = (state, ownProps) => {
  return {
    moduleOHeaderLabel:
      ownProps.headerLabel ||
      getLabelValue(state.Labels, 'MODULE_O_HEADER_LABEL', 'recommendations', 'global'),
    modulePHeaderLabel:
      ownProps.headerLabel ||
      getLabelValue(state.Labels, 'MODULE_P_HEADER_LABEL', 'recommendations', 'global'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRecommendations: () => dispatch(fetchRecommendationsData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsView);
