import { connect } from 'react-redux';
import { fetchCandidData } from './GetCandid.actions';
import GetCandidView from '../views/GetCandid.native';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCandidData: () => dispatch(fetchCandidData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetCandidView);
