import { connect } from 'react-redux';
import { fetchRecommendationsData } from './Recommendations.actions';
import RecommendationsView from '../Recommendations';
import { getLabelValue } from '../../../../../utils';

const mapStateToProps = state => {
  return {
    products: state.Recommendations && state.Recommendations.products,
    youMayAlsoLikeLabel: getLabelValue(state.Labels, 'HEADER_LABEL', 'recommendations', 'global'),
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
