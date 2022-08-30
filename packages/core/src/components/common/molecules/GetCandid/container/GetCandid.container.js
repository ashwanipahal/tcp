import { connect } from 'react-redux';
import { fetchCandidData } from './GetCandid.actions';
import GetCandidView from '../views/GetCandid.native';
import { getCandidData, getLabels } from './GetCandid.selectors';

const mapStateToProps = state => {
  return {
    candidData: getCandidData(state),
    labels: getLabels(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCandidData: apiConfig => dispatch(fetchCandidData(apiConfig)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetCandidView);
